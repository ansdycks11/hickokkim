/**
 * Homepage experience — "Paper in Ink" (docs/website-architecture.md §13, §8.3).
 * Loaded dynamically after first paint by src/pages/index.astro. Never blocks LCP.
 *
 * Scroll scrubs a camera along a Catmull-Rom path past three hanging documents
 * (ink-reveal shader), ending on brass scales that settle into near-equilibrium.
 */
import { AdditiveBlending, AmbientLight, Box3, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Clock, Color, CylinderGeometry, DataTexture, DirectionalLight, DoubleSide, FogExp2, Group, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PMREMGenerator, PerspectiveCamera, PlaneGeometry, PointLight, Points, PointsMaterial, Raycaster, RepeatWrapping, SRGBColorSpace, Scene, ShaderMaterial, SphereGeometry, TextureLoader, TorusGeometry, UniformsLib, UniformsUtils, Vector2, Vector3, WebGLRenderer } from 'three';

export interface JourneyOptions {
  journey: HTMLElement; // tall scroll container
  stage: HTMLElement; // sticky 100vh stage
  canvas: HTMLCanvasElement;
  textures: { complaint: string; articles: string; trademark: string; trust: string };
  overlays: {
    open: HTMLElement;
    close: HTMLElement;
    caps: HTMLElement[]; // three chapter cards, in order
    bar: HTMLElement;
    label: HTMLElement;
  };
  onFail: () => void;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => x * x * (3 - 2 * x);

export function initJourney(o: JourneyOptions) {
  const { journey, stage, canvas } = o;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch {
    o.onFail();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x0e131b, 1);
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  scene.fog = new FogExp2(0x0e131b, 0.078);
  const camera = new PerspectiveCamera(42, 1, 0.1, 60);
  const isSmall = () => stage.clientWidth < 760;

  /* ---------- lights (§8.3: warm key upper-right, cool fill left) ---------- */
  scene.add(new AmbientLight(0x33455c, 0.55));
  const key = new DirectionalLight(0xc9a86a, 1.4);
  key.position.set(4, 7, 5);
  scene.add(key);
  const fill = new DirectionalLight(0x6e84a3, 0.5);
  fill.position.set(-5, 2, -3);
  scene.add(fill);

  /* ---------- small procedural textures ---------- */
  function noiseTexture() {
    const s = 256;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d')!;
    const oct = (n: number, alpha: number) => {
      const sc = document.createElement('canvas');
      sc.width = sc.height = n;
      const sg = sc.getContext('2d')!;
      const id = sg.createImageData(n, n);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = Math.random() * 255;
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
        id.data[i + 3] = 255;
      }
      sg.putImageData(id, 0, 0);
      g.globalAlpha = alpha;
      g.imageSmoothingEnabled = true;
      g.drawImage(sc, 0, 0, s, s);
    };
    g.fillStyle = '#808080';
    g.fillRect(0, 0, s, s);
    oct(8, 0.6);
    oct(24, 0.35);
    oct(64, 0.2);
    g.globalAlpha = 1;
    const t = new CanvasTexture(c);
    t.wrapS = t.wrapT = RepeatWrapping;
    return t;
  }
  function gradientTexture() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 256;
    const g = c.getContext('2d')!;
    const gr = g.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, 'rgba(201,168,106,0)');
    gr.addColorStop(0.35, 'rgba(201,168,106,.45)');
    gr.addColorStop(1, 'rgba(201,168,106,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 256);
    return new CanvasTexture(c);
  }
  function shadowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d')!;
    const gr = g.createRadialGradient(128, 128, 40, 128, 128, 128);
    gr.addColorStop(0, 'rgba(0,0,0,.6)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 256, 256);
    return new CanvasTexture(c);
  }

  /* ---------- ink reveal shader ---------- */
  const noiseTex = noiseTexture();
  const vert = `
    varying vec2 vUv;
    #include <fog_pars_vertex>
    void main(){
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      #include <fog_vertex>
    }`;
  const frag = `
    uniform sampler2D map; uniform sampler2D noiseMap; uniform float progress;
    varying vec2 vUv;
    #include <fog_pars_fragment>
    void main(){
      vec4 paper = texture2D(map, vUv);
      float n = texture2D(noiseMap, vUv * 1.4).r * 0.72 + texture2D(noiseMap, vUv * 4.7 + 0.31).r * 0.28;
      float p = progress * 1.3 - 0.12; float e = 0.055;
      float a = 1.0 - smoothstep(p - e, p + e, n);
      if (a < 0.02) discard;
      float ring = smoothstep(p - e * 3.5, p, n) * (1.0 - smoothstep(p, p + e, n));
      vec3 ink = vec3(0.08, 0.10, 0.13);
      vec3 col = mix(paper.rgb, ink, ring * 0.6);
      col *= mix(0.8, 1.0, vUv.y);
      gl_FragColor = vec4(col, a);
      #include <fog_fragment>
      #include <colorspace_fragment>
    }`;
  // 1x1 paper-coloured placeholder so a sheet is never black before its texture arrives
  const placeholder = new DataTexture(new Uint8Array([243, 237, 225, 255]), 1, 1);
  placeholder.colorSpace = SRGBColorSpace;
  placeholder.needsUpdate = true;
  const loader = new TextureLoader();
  function sheetMaterial(url: string) {
    const u = UniformsUtils.merge([UniformsLib.fog, { map: { value: null }, noiseMap: { value: null }, progress: { value: 0 } }]);
    u.map.value = placeholder;
    u.noiseMap.value = noiseTex;
    const mat = new ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag, fog: true, transparent: true, side: DoubleSide });
    loader.load(url, (tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      mat.uniforms.map.value = tex;
    });
    return mat;
  }

  /* ---------- documents ---------- */
  const shadowTex = shadowTexture();
  interface Sheet { group: Group; mesh: Mesh; mat: ShaderMaterial; shadow: Mesh; base: number; lift: number; act: number }
  const sheets: Sheet[] = [];
  function makeSheet(url: string, pos: Vector3, ry: number, base: number, act: number): Sheet {
    const group = new Group();
    group.position.copy(pos);
    group.rotation.y = ry;
    const mat = sheetMaterial(url);
    const mesh = new Mesh(new PlaneGeometry(1.6, 2.18), mat);
    group.add(mesh);
    const shadow = new Mesh(new PlaneGeometry(2.4, 3.0), new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0 }));
    shadow.position.set(0.05, -0.08, -0.08);
    group.add(shadow);
    scene.add(group);
    const s: Sheet = { group, mesh, mat, shadow, base, lift: 0, act };
    sheets.push(s);
    return s;
  }
  const sheetA = makeSheet(o.textures.complaint, new Vector3(-1.5, 0.35, 0), 0.22, 1, 0);
  const sheetB = makeSheet(o.textures.articles, new Vector3(2.5, 0.2, -5.2), -0.28, 1, 1);
  const sheetB2 = makeSheet(o.textures.trademark, new Vector3(3.55, 0.85, -6.6), -0.55, 0.72, 1);
  const sheetC = makeSheet(o.textures.trust, new Vector3(-2.2, 0.85, -11), 0.32, 1, 2);

  /* ---------- light shaft + dust ---------- */
  const shaft = new Mesh(
    new PlaneGeometry(3.6, 14),
    new MeshBasicMaterial({ map: gradientTexture(), transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: 0.35 })
  );
  shaft.position.set(-0.6, 2.5, -1.6);
  shaft.rotation.z = 0.22;
  scene.add(shaft);
  const N = isSmall() ? 140 : 220;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
    pos[i * 3 + 2] = -Math.random() * 26 + 7;
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(pos, 3));
  const dust = new Points(pGeo, new PointsMaterial({ color: 0xc9a86a, size: 0.03, transparent: true, opacity: 0.5, depthWrite: false }));
  scene.add(dust);

  /* ---------- brass scales (§8.3 tuning) ---------- */
  // Environment map from a small softbox studio so highlights travel across the metal.
  const pmrem = new PMREMGenerator(renderer);
  const envScene = new Scene();
  envScene.background = new Color(0x0b0f16);
  const softbox = (w: number, h: number, c: number, i: number, x: number, y: number, z: number, ry = 0, rx = 0) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(c).multiplyScalar(i), side: DoubleSide }));
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.rotation.x = rx;
    envScene.add(m);
  };
  softbox(8, 4, 0xfff2d8, 3.4, -4, 3.5, -2, Math.PI / 3); // warm key
  softbox(6, 3, 0xcfe0ff, 1.6, 5, 2, 3, -Math.PI / 2.5); // cool fill
  softbox(5, 2, 0xffffff, 2.6, 0, 5, 4, 0, -Math.PI / 3); // top rim
  softbox(3, 6, 0xffe9c4, 2.0, 6, 1, -1, -Math.PI / 2); // right edge highlight
  softbox(10, 10, 0x1a2230, 1.0, 0, -4, 0, 0, Math.PI / 2); // floor
  scene.environment = pmrem.fromScene(envScene, 0.04).texture;
  pmrem.dispose();

  const brass = new MeshStandardMaterial({ color: 0xa6803e, metalness: 0.9, roughness: 0.26, envMapIntensity: 1.25 });
  const brassL = new MeshStandardMaterial({ color: 0xc9a86a, metalness: 0.9, roughness: 0.22, envMapIntensity: 1.35 });
  const scales = new Group();
  const column = new Mesh(new CylinderGeometry(0.07, 0.1, 4.4, 32), brass);
  column.position.y = -0.6;
  scales.add(column);
  const base = new Mesh(new CylinderGeometry(1.05, 1.25, 0.18, 48), brass);
  base.position.y = -2.85;
  scales.add(base);
  const finial = new Mesh(new SphereGeometry(0.16, 24, 24), brassL);
  finial.position.y = 1.72;
  scales.add(finial);
  const pivot = new Group();
  pivot.position.y = 1.6;
  scales.add(pivot);
  const beam = new Mesh(new CylinderGeometry(0.05, 0.05, 5.2, 24), brassL);
  beam.rotation.z = Math.PI / 2;
  pivot.add(beam);
  const makePan = (x: number) => {
    const hang = new Group();
    hang.position.set(x, 0, 0);
    pivot.add(hang);
    const pan = new Group();
    pan.position.y = -1.7;
    hang.add(pan);
    pan.add(new Mesh(new CylinderGeometry(0.72, 0.62, 0.09, 48), brass));
    const top = new Vector3(0, 1.7, 0);
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3;
      const edge = new Vector3(Math.cos(a) * 0.6, 0.04, Math.sin(a) * 0.6);
      const dir = new Vector3().subVectors(top, edge);
      const len = dir.length();
      const ch = new Mesh(new CylinderGeometry(0.012, 0.012, len, 8), brassL);
      ch.position.copy(edge).add(top).multiplyScalar(0.5);
      ch.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), dir.normalize());
      pan.add(ch);
    }
    const ring = new Mesh(new TorusGeometry(0.07, 0.016, 12, 24), brassL);
    ring.position.copy(top);
    pan.add(ring);
    return hang;
  };
  const hangL = makePan(-2.6);
  const hangR = makePan(2.6);
  const glow = new PointLight(0xa6803e, 6, 8, 2); // faint brass glow beneath the base
  glow.position.set(0, -2.4, 1.2);
  scales.add(glow);
  scales.position.set(0.9, -0.2, -17.5);
  scales.rotation.y = -0.35;
  scene.add(scales);

  /* ---------- camera path from the chapter script ---------- */
  const front = (s: Sheet, dist: number) => {
    const d = new Vector3(Math.sin(s.group.rotation.y), 0, Math.cos(s.group.rotation.y));
    return s.group.position.clone().add(d.multiplyScalar(dist));
  };
  const SHEET_DIST = 3.3;
  const SCALES_DIST = 7.2;
  const lookPts = [
    new Vector3(0, 0.6, -1),
    sheetA.group.position.clone(),
    sheetB.group.position.clone().add(new Vector3(0.35, 0.15, 0)),
    sheetC.group.position.clone(),
    scales.position.clone().add(new Vector3(0, -0.15, 0)),
  ];
  const camPts = [
    new Vector3(0.4, 2.6, 8.5),
    front(sheetA, SHEET_DIST).add(new Vector3(0, 0.15, 0)),
    front(sheetB, SHEET_DIST + 0.1).add(new Vector3(-0.3, 0.2, 0)),
    front(sheetC, SHEET_DIST).add(new Vector3(0, 0.15, 0)),
    scales.position.clone().add(new Vector3(-0.2, 0.9, SCALES_DIST)),
  ];
  const camCurve = new CatmullRomCurve3(camPts, false, 'catmullrom', 0.4);
  const lookCurve = new CatmullRomCurve3(lookPts, false, 'catmullrom', 0.4);

  /* ---------- layout / frustum-math sizing (§8.3) ---------- */
  let w = 1, h = 1;
  function visibleAt(dist: number) {
    const visH = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * dist;
    return { visW: visH * camera.aspect, visH };
  }
  function layout() {
    w = stage.clientWidth;
    h = stage.clientHeight;
    if (w === 0 || h === 0) return; // hidden tab / not laid out yet; ResizeObserver re-runs this
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = isSmall() ? 50 : 42;
    camera.updateProjectionMatrix();
    // Sheets: fit within 78% of visible width / 80% of height at their focus distance.
    const s = visibleAt(SHEET_DIST);
    const fit = Math.min(1, (s.visW * 0.78) / 1.7, (s.visH * 0.8) / 2.3);
    sheets.forEach((sh) => sh.group.scale.setScalar(fit * sh.base));
    // Scales: beam span 5.2 + pan radius; sway margin 0.9 so it never clips 320–3440px.
    const c = visibleAt(SCALES_DIST);
    const scaleFit = Math.min(1, (c.visW * 0.9) / 7.4, (c.visH * 0.8) / 6.0);
    scales.scale.setScalar(0.95 * scaleFit);
    journey.style.height = Math.round(h * 4.2) + 'px';
  }
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(stage);

  /* ---------- scroll → progress ---------- */
  let sRaw = 0, t = 0, mx = 0, my = 0;
  let scrollLocked = false; // QA hook: drive progress without scrolling
  function readScroll() {
    if (scrollLocked) return;
    const r = journey.getBoundingClientRect();
    const total = journey.offsetHeight - h;
    sRaw = clamp01(-r.top / Math.max(1, total));
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    window.addEventListener('pointermove', (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });
  }
  const mapT = (s: number) => { const seg = Math.min(3, Math.floor(s * 4)); const f = s * 4 - seg; return (seg + ease(f)) / 4; };

  /* ---------- hover / tap on sheets ---------- */
  const ray = new Raycaster();
  const ndc = new Vector2();
  let hovered: Sheet | null = null;
  let tapped: Sheet | null = null;
  function pick(clientX: number, clientY: number): Sheet | null {
    const r = canvas.getBoundingClientRect();
    ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(sheets.map((s) => s.mesh), false);
    if (!hits.length) return null;
    const s = sheets.find((sh) => sh.mesh === hits[0].object)!;
    return s.mat.uniforms.progress.value > 0.5 ? s : null;
  }
  if (fine) {
    canvas.addEventListener('pointermove', (e) => { hovered = pick(e.clientX, e.clientY); canvas.style.cursor = hovered ? 'pointer' : ''; }, { passive: true });
    canvas.addEventListener('pointerleave', () => { hovered = null; });
  }
  canvas.addEventListener('click', (e) => { const s = pick(e.clientX, e.clientY); tapped = s && tapped === s ? null : s; });

  /* ---------- overlays ---------- */
  const { open: ovOpen, close: ovClose, caps, bar, label } = o.overlays;
  const chapters = [
    { el: caps[0], sheet: sheetA, c: 0.25, name: caps[0].dataset.label || '' },
    { el: caps[1], sheet: sheetB, c: 0.5, name: caps[1].dataset.label || '' },
    { el: caps[2], sheet: sheetC, c: 0.75, name: caps[2].dataset.label || '' },
  ];
  const tmp = new Vector3();
  function placeCaption(cp: (typeof chapters)[number]) {
    const forced = (hovered && hovered.act === cp.sheet.act) || (tapped && tapped.act === cp.sheet.act);
    const op = forced ? 1 : clamp01(1 - Math.abs(t - cp.c) / 0.105);
    cp.el.style.opacity = String(op);
    cp.el.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
    if (isSmall()) { cp.el.style.left = ''; cp.el.style.top = ''; cp.el.style.transform = ''; return; }
    tmp.copy(cp.sheet.group.position).project(camera);
    const x = (tmp.x * 0.5 + 0.5) * w;
    const y = (-tmp.y * 0.5 + 0.5) * h;
    const left = x < w / 2;
    const px = left ? x + w * 0.17 : x - w * 0.17;
    cp.el.style.left = px + 'px';
    cp.el.style.top = y + 'px';
    cp.el.style.transform = left ? 'translate(0,-50%)' : 'translate(-100%,-50%)';
  }

  /* ---------- frame ---------- */
  const clock = new Clock();
  let running = true;
  let closeStart = -1; // time the close chapter began (small settling gesture, never beyond 2°)
  const SWAY_AMP = 0.02; // rad ≈ 1.15°
  const BUMP_AMP = 0.014; // rad ≈ 0.8°; sway + bump ≤ 0.034 rad ≈ 1.95° (§8.3 ceiling is 2°)
  const SWAY_PERIOD = 7; // seconds
  const camDir = new Vector3();
  /** Beam tilt (radians) at elapsed time e. Pure, so the QA hook can sample it. */
  function tiltFor(e: number, closeAt: number) {
    const settle = ease(clamp01(e / 2.5));
    const sway = SWAY_AMP * Math.sin((2 * Math.PI * e) / SWAY_PERIOD);
    const bx = closeAt < 0 ? 0 : clamp01((e - closeAt) / 2.5);
    const bump = BUMP_AMP * Math.sin(Math.PI * bx);
    return 0.07 * (1 - settle) + sway * settle + bump;
  }
  function update() {
    const dt = Math.min(0.1, clock.getDelta());
    const e = clock.getElapsedTime();
    // frame-rate-independent smoothing (≈ 0.085/frame at 60fps)
    t += (mapT(sRaw) - t) * (1 - Math.exp(-dt * 5.3));
    const p = camCurve.getPoint(t);
    const l = lookCurve.getPoint(t);
    camera.position.set(p.x + mx * 0.25, p.y - my * 0.15, p.z);
    camera.lookAt(l);
    // ink reveals, driven by camera proximity along the path
    sheetA.mat.uniforms.progress.value = clamp01((t - 0.13) / 0.11);
    sheetB.mat.uniforms.progress.value = clamp01((t - 0.38) / 0.11);
    sheetB2.mat.uniforms.progress.value = clamp01((t - 0.43) / 0.1);
    sheetC.mat.uniforms.progress.value = clamp01((t - 0.63) / 0.11);
    for (const s of sheets) {
      (s.shadow.material as MeshBasicMaterial).opacity = s.mat.uniforms.progress.value * 0.9;
      s.group.rotation.z = Math.sin(e * 0.4 + s.group.position.x) * 0.008;
      // hover/tap: lift 2–3% toward the camera
      const want = hovered === s || tapped === s ? 1 : 0;
      s.lift += (want - s.lift) * 0.12;
      camDir.subVectors(camera.position, s.group.position).normalize().multiplyScalar(0.09 * s.lift);
      s.mesh.position.copy(camDir);
      s.mesh.scale.setScalar(1 + 0.025 * s.lift);
    }
    // scales (§8.3): settle from ~4° into equilibrium over the first 2.5s after load, then sway ≤1.15°.
    // At the close chapter (§13.2) a soft bump of ≤0.8° rises and decays over 2.5s so the scales read
    // as "settling into balance" without ever tipping past 2°.
    if (t > 0.8 && closeStart < 0) closeStart = e;
    const tilt = tiltFor(e, closeStart);
    pivot.rotation.z = tilt;
    hangL.rotation.z = -tilt; // pans counter-rotate to stay level
    hangR.rotation.z = -tilt;
    // overlays
    ovOpen.style.opacity = String(1 - clamp01(t / 0.085));
    ovOpen.style.pointerEvents = t < 0.05 ? 'auto' : 'none';
    chapters.forEach(placeCaption);
    ovClose.style.opacity = String(clamp01((t - 0.9) / 0.08));
    bar.style.width = t * 100 + '%';
    const lbl = t < 0.12 ? 'Intro' : t < 0.37 ? chapters[0].name : t < 0.62 ? chapters[1].name : t < 0.87 ? chapters[2].name : 'Balance';
    if (label.textContent !== lbl) label.textContent = lbl;
    dust.rotation.y = e * 0.015;
    renderer.render(scene, camera);
  }
  function frame() {
    if (!running) return;
    update();
    requestAnimationFrame(frame);
  }
  // Compile shaders off the critical path (KHR_parallel_shader_compile where available), then run.
  renderer.compileAsync(scene, camera).catch(() => undefined).then(() => frame());

  // Pause rendering when the experience leaves the viewport or the tab is hidden.
  const io = new IntersectionObserver(
    (en) => {
      const vis = en[0].isIntersecting;
      if (vis && !running) { running = true; clock.getDelta(); frame(); } else if (!vis) running = false;
      document.documentElement.classList.toggle('in-journey', vis);
    },
    { threshold: 0 }
  );
  io.observe(journey);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else if (!running) { running = true; frame(); }
  });

  document.documentElement.classList.add('journey-on');

  // QA / acceptance hook (docs/website-architecture.md §11 Phase 2): drive progress and read the beam tilt.
  (window as unknown as { __journey: unknown }).__journey = {
    setProgress(v: number) { scrollLocked = true; sRaw = clamp01(v); },
    jump(v: number) { scrollLocked = true; sRaw = clamp01(v); t = mapT(sRaw); update(); },
    renderOnce: update,
    release() { scrollLocked = false; readScroll(); },
    get t() { return t; },
    get tiltDeg() { return MathUtils.radToDeg(pivot.rotation.z); },
    tiltDegAt(e: number, closeAt: number) { return MathUtils.radToDeg(tiltFor(e, closeAt)); },
    get elapsed() { return clock.getElapsedTime(); },
    get scalesScreenBox() {
      const box = new Box3().setFromObject(scales);
      const pts = [
        new Vector3(box.min.x, box.min.y, box.min.z), new Vector3(box.max.x, box.min.y, box.min.z),
        new Vector3(box.min.x, box.max.y, box.min.z), new Vector3(box.max.x, box.max.y, box.min.z),
        new Vector3(box.min.x, box.min.y, box.max.z), new Vector3(box.max.x, box.min.y, box.max.z),
        new Vector3(box.min.x, box.max.y, box.max.z), new Vector3(box.max.x, box.max.y, box.max.z),
      ].map((p) => p.project(camera));
      const xs = pts.map((p) => (p.x * 0.5 + 0.5) * w), ys = pts.map((p) => (-p.y * 0.5 + 0.5) * h);
      return { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys), w, h };
    },
  };
}
