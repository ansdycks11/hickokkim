/* ===================== JOURNEY: Paper in Ink ===================== */
(function(){
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var journey=document.getElementById('journey'),stage=document.getElementById('stage'),canvas=document.getElementById('scene');
  function bail(){document.documentElement.classList.add('no-journey');}
  if(reduced||!window.THREE||!journey){bail();return;}
  var renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:false});}catch(e){bail();return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setClearColor(0x0e131b,1);

  var scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x0e131b,0.078);
  var camera=new THREE.PerspectiveCamera(42,1,0.1,60);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x33455c,0.5));
  var key=new THREE.DirectionalLight(0xC9A86A,1.3);key.position.set(4,7,5);scene.add(key);
  var fill=new THREE.DirectionalLight(0x6e84a3,0.45);fill.position.set(-5,2,-3);scene.add(fill);

  /* ---------- procedural textures ---------- */
  function paperTexture(spec){
    var W=896,H=1216,c=document.createElement('canvas');c.width=W;c.height=H;var g=c.getContext('2d');
    g.fillStyle='#F3EDE1';g.fillRect(0,0,W,H);
    var img=g.getImageData(0,0,W,H),d=img.data;
    for(var i=0;i<d.length;i+=4){var n=(Math.random()-0.5)*9;d[i]+=n;d[i+1]+=n;d[i+2]+=n-1;}
    g.putImageData(img,0,0);
    var serif="'Libre Caslon Text',Georgia,serif",sans="'Inter',Helvetica,Arial,sans-serif";
    var m=88; // margin
    // letterhead
    g.fillStyle='#1b2330';g.textAlign='center';g.font='400 30px '+serif;
    g.fillText(spec.head,W/2,m+22);
    g.font='400 13px '+sans;g.fillStyle='#5A6B82';
    g.fillText(spec.sub,W/2,m+50);
    g.fillStyle='#A6803E';g.fillRect(W/2-60,m+66,120,1.5);
    // title block
    g.fillStyle='#1b2330';g.font='700 34px '+serif;
    wrapText(g,spec.title,W/2,m+130,W-2*m-40,42);
    g.textAlign='left';
    // meta line (right)
    g.font='400 12px "IBM Plex Mono",monospace';g.fillStyle='#5A6B82';g.textAlign='right';
    g.fillText(spec.meta,W-m,m+200);g.textAlign='left';
    // body: headings + text-lines
    var y=m+250,rng=mulberry(spec.seed||7);
    for(var s=0;s<spec.sections.length;s++){
      g.font='400 17px '+serif;g.fillStyle='#1b2330';g.fillText(spec.sections[s],m,y);y+=22;
      var lines=3+Math.floor(rng()*3);
      for(var l=0;l<lines;l++){
        var x=m+(l===0?28:0),endX=W-m-(l===lines-1?rng()*260:rng()*40);
        while(x<endX){var w=18+rng()*62;if(x+w>endX)w=endX-x;if(w<8)break;
          g.fillStyle='rgba(50,54,60,'+(0.42+rng()*0.22)+')';roundRect(g,x,y-8,w,7,2);x+=w+9;}
        y+=17;
      }
      y+=16; if(y>H-260)break;
    }
    // signature block
    var sy=H-170;g.fillStyle='#1b2330';g.fillRect(m,sy,300,1);
    g.font='400 12px '+sans;g.fillStyle='#5A6B82';g.fillText(spec.sig,m,sy+20);
    g.font='400 11px '+sans;g.fillText('Hickok & Kim, Inc.  ·  Los Angeles, California',m,sy+38);
    // seal
    if(spec.seal){var sx=W-m-70,syy=H-150;
      g.strokeStyle='rgba(166,128,62,.85)';g.lineWidth=3;g.beginPath();g.arc(sx,syy,52,0,Math.PI*2);g.stroke();
      g.lineWidth=1.2;g.beginPath();g.arc(sx,syy,40,0,Math.PI*2);g.stroke();
      g.fillStyle='rgba(166,128,62,.9)';g.textAlign='center';g.font='400 11px '+sans;
      g.fillText(spec.seal,sx,syy-4);g.font='400 9px '+sans;g.fillText('CALIFORNIA',sx,syy+10);g.textAlign='left';}
    // stamp
    if(spec.stamp){g.save();g.translate(W-m-60,m+20);g.rotate(-0.18);g.strokeStyle='rgba(120,38,38,.55)';g.lineWidth=2;g.strokeRect(-90,-22,180,44);
      g.fillStyle='rgba(120,38,38,.6)';g.font='700 18px '+sans;g.textAlign='center';g.fillText(spec.stamp,0,7);g.restore();}
    // soft vignette
    var v=g.createRadialGradient(W/2,H/2,H*0.35,W/2,H/2,H*0.85);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(40,30,10,.16)');
    g.fillStyle=v;g.fillRect(0,0,W,H);
    var t=new THREE.CanvasTexture(c);t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;
  }
  function wrapText(g,text,x,y,maxW,lh){var words=text.split(' '),line='';for(var i=0;i<words.length;i++){var test=line+words[i]+' ';if(g.measureText(test).width>maxW&&i>0){g.fillText(line.trim(),x,y);line=words[i]+' ';y+=lh;}else line=test;}g.fillText(line.trim(),x,y);}
  function roundRect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath();g.fill();}
  function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  function noiseTexture(){
    var s=256,c=document.createElement('canvas');c.width=c.height=s;var g=c.getContext('2d');
    function oct(n,alpha){var sc=document.createElement('canvas');sc.width=sc.height=n;var sg=sc.getContext('2d'),id=sg.createImageData(n,n);
      for(var i=0;i<id.data.length;i+=4){var v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255;}
      sg.putImageData(id,0,0);g.globalAlpha=alpha;g.imageSmoothingEnabled=true;g.drawImage(sc,0,0,s,s);}
    g.fillStyle='#808080';g.fillRect(0,0,s,s);oct(8,0.6);oct(24,0.35);oct(64,0.2);g.globalAlpha=1;
    var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
  }
  function gradientTexture(){var c=document.createElement('canvas');c.width=64;c.height=256;var g=c.getContext('2d');
    var gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(201,168,106,0)');gr.addColorStop(0.35,'rgba(201,168,106,.45)');gr.addColorStop(1,'rgba(201,168,106,0)');
    g.fillStyle=gr;g.fillRect(0,0,64,256);var t=new THREE.CanvasTexture(c);return t;}
  function shadowTexture(){var c=document.createElement('canvas');c.width=c.height=256;var g=c.getContext('2d');
    var gr=g.createRadialGradient(128,128,40,128,128,128);gr.addColorStop(0,'rgba(0,0,0,.6)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,256,256);return new THREE.CanvasTexture(c);}

  /* ---------- ink reveal shader ---------- */
  var noiseTex=noiseTexture();
  var vert=[
    'varying vec2 vUv;','#include <fog_pars_vertex>',
    'void main(){vUv=uv;vec4 mvPosition=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mvPosition;','#include <fog_vertex>','}'].join('\n');
  var frag=[
    'uniform sampler2D map;uniform sampler2D noiseMap;uniform float progress;','varying vec2 vUv;','#include <fog_pars_fragment>',
    'void main(){',
    ' vec4 paper=texture2D(map,vUv);',
    ' float n=texture2D(noiseMap,vUv*1.4).r*0.72+texture2D(noiseMap,vUv*4.7+0.31).r*0.28;',
    ' float p=progress*1.3-0.12;float e=0.055;',
    ' float a=1.0-smoothstep(p-e,p+e,n);',
    ' if(a<0.02) discard;',
    ' float ring=smoothstep(p-e*3.5,p,n)*(1.0-smoothstep(p,p+e,n));',
    ' vec3 ink=vec3(0.08,0.10,0.13);',
    ' vec3 col=mix(paper.rgb,ink,ring*0.6);',
    ' col*=mix(0.8,1.0,vUv.y);',
    ' gl_FragColor=vec4(col,a);',
    '#include <fog_fragment>',
    '}'].join('\n');
  function sheetMaterial(tex){
    var u=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{map:{value:null},noiseMap:{value:null},progress:{value:0}}]);
    u.map.value=tex;u.noiseMap.value=noiseTex;
    return new THREE.ShaderMaterial({uniforms:u,vertexShader:vert,fragmentShader:frag,fog:true,transparent:true,side:THREE.DoubleSide});
  }

  /* ---------- documents ---------- */
  var shadowTex=shadowTexture();
  function makeSheet(spec,pos,ry,scale){
    var g=new THREE.Group();g.position.copy(pos);g.rotation.y=ry;
    var mat=sheetMaterial(paperTexture(spec));
    var mesh=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2.18),mat);g.add(mesh);
    var sh=new THREE.Mesh(new THREE.PlaneGeometry(2.4,3.0),new THREE.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false,opacity:0}));
    sh.position.set(0.05,-0.08,-0.08);g.add(sh);
    g.userData={mat:mat,shadow:sh,base:scale||1,spec:spec};
    scene.add(g);return g;
  }
  var specA={head:'HICKOK & KIM, INC.',sub:'ATTORNEYS AT LAW',title:'COMPLAINT FOR DAMAGES',meta:'Superior Court of California, County of Los Angeles',sections:['PARTIES','JURISDICTION AND VENUE','GENERAL ALLEGATIONS','FIRST CAUSE OF ACTION — NEGLIGENCE','PRAYER FOR RELIEF'],sig:'Attorney for Plaintiff',stamp:'FILED',seed:3};
  var specB={head:'HICKOK & KIM, INC.',sub:'ATTORNEYS AT LAW',title:'ARTICLES OF INCORPORATION',meta:'State of California — Secretary of State',sections:['ARTICLE I — NAME','ARTICLE II — PURPOSE','ARTICLE III — AGENT FOR SERVICE OF PROCESS','ARTICLE IV — SHARES','ARTICLE V — DIRECTORS'],sig:'Incorporator',seal:'FILED',seed:11};
  var specB2={head:'CERTIFICATE OF REGISTRATION',sub:'PRINCIPAL REGISTER',title:'TRADEMARK',meta:'Registration No. ●●●●●●●',sections:['MARK','OWNER','CLASS 034 — GOODS AND SERVICES','FIRST USE IN COMMERCE'],sig:'Registered',seal:'REGISTERED',seed:19};
  var specC={head:'HICKOK & KIM, INC.',sub:'ATTORNEYS AT LAW',title:'REVOCABLE LIVING TRUST',meta:'Declaration of Trust',sections:['ARTICLE ONE — TRUST ESTATE','ARTICLE TWO — TRUSTEES','ARTICLE THREE — BENEFICIARIES','ARTICLE FOUR — DISTRIBUTION','ARTICLE FIVE — AMENDMENT AND REVOCATION'],sig:'Settlor and Trustee',seal:'NOTARY',seed:5};

  var sheetA=makeSheet(specA,new THREE.Vector3(-1.5,0.35,0),0.22,1);
  var sheetB=makeSheet(specB,new THREE.Vector3(2.5,0.2,-5.2),-0.28,1);
  var sheetB2=makeSheet(specB2,new THREE.Vector3(3.55,0.85,-6.6),-0.55,0.72);
  var sheetC=makeSheet(specC,new THREE.Vector3(-2.2,0.85,-11),0.32,1);
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){
    [sheetA,sheetB,sheetB2,sheetC].forEach(function(sh){var old=sh.userData.mat.uniforms.map.value;sh.userData.mat.uniforms.map.value=paperTexture(sh.userData.spec);if(old)old.dispose();});
  });}

  /* ---------- light shaft + dust ---------- */
  var shaft=new THREE.Mesh(new THREE.PlaneGeometry(3.6,14),new THREE.MeshBasicMaterial({map:gradientTexture(),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0.35}));
  shaft.position.set(-0.6,2.5,-1.6);shaft.rotation.z=0.22;scene.add(shaft);
  var N=240,pos=new Float32Array(N*3);
  for(var i=0;i<N;i++){pos[i*3]=(Math.random()-0.5)*14;pos[i*3+1]=(Math.random()-0.5)*7;pos[i*3+2]=-Math.random()*26+7;}
  var pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var dust=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0xC9A86A,size:0.03,transparent:true,opacity:0.5,depthWrite:false}));scene.add(dust);

  /* ---------- brass scales (close) ---------- */
  var pmrem=new THREE.PMREMGenerator(renderer);var envScene=new THREE.Scene();envScene.background=new THREE.Color(0x0b0f16);
  function softbox(w,h,c,i,x,y,z,ry,rx){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.rotation.y=ry||0;m.rotation.x=rx||0;envScene.add(m);}
  softbox(8,4,0xfff2d8,3.0,-4,3.5,-2,Math.PI/3,0);softbox(6,3,0xcfe0ff,1.5,5,2,3,-Math.PI/2.5,0);softbox(5,2,0xffffff,2.2,0,5,4,0,-Math.PI/3);softbox(10,10,0x1a2230,1.0,0,-4,0,0,Math.PI/2);
  scene.environment=pmrem.fromScene(envScene,0.04).texture;pmrem.dispose();
  var brass=new THREE.MeshStandardMaterial({color:0xA6803E,metalness:0.9,roughness:0.26,envMapIntensity:1.15});
  var brassL=new THREE.MeshStandardMaterial({color:0xC9A86A,metalness:0.9,roughness:0.22,envMapIntensity:1.2});
  var scales=new THREE.Group();
  var column=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.1,4.4,32),brass);column.position.y=-0.6;scales.add(column);
  var base=new THREE.Mesh(new THREE.CylinderGeometry(1.05,1.25,0.18,48),brass);base.position.y=-2.85;scales.add(base);
  var finial=new THREE.Mesh(new THREE.SphereGeometry(0.16,24,24),brassL);finial.position.y=1.72;scales.add(finial);
  var pivot=new THREE.Group();pivot.position.y=1.6;scales.add(pivot);
  var beam=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,5.2,24),brassL);beam.rotation.z=Math.PI/2;pivot.add(beam);
  function makePan(x){var hang=new THREE.Group();hang.position.set(x,0,0);pivot.add(hang);var pan=new THREE.Group();pan.position.y=-1.7;hang.add(pan);
    pan.add(new THREE.Mesh(new THREE.CylinderGeometry(0.72,0.62,0.09,48),brass));var top=new THREE.Vector3(0,1.7,0);
    for(var i=0;i<3;i++){var a=i*Math.PI*2/3,edge=new THREE.Vector3(Math.cos(a)*0.6,0.04,Math.sin(a)*0.6),dir=new THREE.Vector3().subVectors(top,edge),len=dir.length();
      var ch=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,len,8),brassL);ch.position.copy(edge).add(top).multiplyScalar(0.5);ch.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());pan.add(ch);}
    var ring=new THREE.Mesh(new THREE.TorusGeometry(0.07,0.016,12,24),brassL);ring.position.copy(top);pan.add(ring);return {hang:hang};}
  var pL=makePan(-2.6),pR=makePan(2.6);
  var glow=new THREE.PointLight(0xA6803E,0.7,8);glow.position.set(0,-2.4,1.2);scales.add(glow);
  scales.position.set(0.9,-0.2,-17.5);scales.rotation.y=-0.35;scene.add(scales);

  /* ---------- camera path (built from the chapter script) ---------- */
  function front(sheet,dist){var d=new THREE.Vector3(Math.sin(sheet.rotation.y),0,Math.cos(sheet.rotation.y));return sheet.position.clone().add(d.multiplyScalar(dist));}
  var lookPts=[new THREE.Vector3(0,0.6,-1),sheetA.position.clone(),sheetB.position.clone().add(new THREE.Vector3(0.35,0.15,0)),sheetC.position.clone(),scales.position.clone().add(new THREE.Vector3(0,0.2,0))];
  var camPts=[new THREE.Vector3(0.4,2.6,8.5),front(sheetA,3.3).add(new THREE.Vector3(0,0.15,0)),front(sheetB,3.4).add(new THREE.Vector3(-0.3,0.2,0)),front(sheetC,3.3).add(new THREE.Vector3(0,0.15,0)),scales.position.clone().add(new THREE.Vector3(-0.2,0.9,7.2))];
  var camCurve=new THREE.CatmullRomCurve3(camPts,false,'catmullrom',0.4);
  var lookCurve=new THREE.CatmullRomCurve3(lookPts,false,'catmullrom',0.4);

  /* ---------- layout / frustum fit ---------- */
  var w=1,h=1,fit=1;
  function layout(){
    w=stage.clientWidth;h=stage.clientHeight;
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<760?50:42;camera.updateProjectionMatrix();
    var visH=2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*3.3,visW=visH*camera.aspect;
    fit=Math.min(1,(visW*0.78)/1.7,(visH*0.8)/2.3);
    [sheetA,sheetB,sheetB2,sheetC].forEach(function(s){s.scale.setScalar(fit*s.userData.base);});
    scales.scale.setScalar(0.95*Math.min(1,(visW*2.2*0.9)/7.2));
    journey.style.height=Math.round(h*4.8)+'px';
  }
  layout();window.addEventListener('resize',layout);

  /* ---------- scroll → progress ---------- */
  var sRaw=0,t=0,mx=0,my=0;
  function readScroll(){var r=journey.getBoundingClientRect();var total=journey.offsetHeight-h;sRaw=Math.min(1,Math.max(0,-r.top/Math.max(1,total)));}
  window.addEventListener('scroll',readScroll,{passive:true});readScroll();
  window.addEventListener('pointermove',function(e){mx=e.clientX/window.innerWidth-0.5;my=e.clientY/window.innerHeight-0.5;},{passive:true});
  function ease(x){return x*x*(3-2*x);}
  function mapT(s){var seg=Math.min(3,Math.floor(s*4));var f=s*4-seg;return (seg+ease(f))/4;}
  function clamp01(x){return Math.min(1,Math.max(0,x));}

  /* ---------- overlays ---------- */
  var ovOpen=document.getElementById('ovOpen'),ovClose=document.getElementById('ovClose'),jBar=document.getElementById('jBar'),jLabel=document.getElementById('jLabel');
  var caps=[{el:document.getElementById('capA'),sheet:sheetA,c:0.25,label:'When something goes wrong'},
            {el:document.getElementById('capB'),sheet:sheetB,c:0.5,label:'When you\'re building something'},
            {el:document.getElementById('capC'),sheet:sheetC,c:0.75,label:'When you\'re planning ahead'}];
  var tmp=new THREE.Vector3();
  function placeCaption(cp){
    var op=clamp01(1-Math.abs(t-cp.c)/0.105);cp.el.style.opacity=op;cp.el.style.pointerEvents=op>0.5?'auto':'none';
    if(w<760){cp.el.style.left='';cp.el.style.top='';return;}
    tmp.copy(cp.sheet.position).project(camera);
    var x=(tmp.x*0.5+0.5)*w,y=(-tmp.y*0.5+0.5)*h;
    var left=x<w/2;var px=left?x+w*0.17:x-w*0.17;
    cp.el.style.left=px+'px';cp.el.style.top=y+'px';cp.el.style.transform=left?'translate(0,-50%)':'translate(-100%,-50%)';
  }

  /* ---------- frame ---------- */
  var clock=new THREE.Clock(),running=true;
  function frame(){
    if(!running)return;
    var e=clock.getElapsedTime();
    t+=(mapT(sRaw)-t)*0.085;
    var p=camCurve.getPoint(t),l=lookCurve.getPoint(t);
    camera.position.set(p.x+mx*0.25,p.y-my*0.15,p.z);camera.lookAt(l);
    // ink reveals
    sheetA.userData.mat.uniforms.progress.value=clamp01((t-0.13)/0.11);
    sheetB.userData.mat.uniforms.progress.value=clamp01((t-0.38)/0.11);
    sheetB2.userData.mat.uniforms.progress.value=clamp01((t-0.43)/0.1);
    sheetC.userData.mat.uniforms.progress.value=clamp01((t-0.63)/0.11);
    [sheetA,sheetB,sheetB2,sheetC].forEach(function(s){s.userData.shadow.material.opacity=s.userData.mat.uniforms.progress.value*0.9;
      s.rotation.z=Math.sin(e*0.4+s.position.x)*0.008;});
    // scales settle
    var settle=ease(clamp01((t-0.8)/0.16));
    var tilt=0.07*(1-settle)+0.02*Math.sin(e*0.9)*settle;
    pivot.rotation.z=tilt;pL.hang.rotation.z=-tilt;pR.hang.rotation.z=-tilt;
    // overlays
    ovOpen.style.opacity=1-clamp01(t/0.085);ovOpen.style.pointerEvents=t<0.05?'auto':'none';
    caps.forEach(placeCaption);
    ovClose.style.opacity=clamp01((t-0.9)/0.08);
    jBar.style.width=(t*100)+'%';
    var lbl=t<0.12?'Intro':t<0.37?caps[0].label:t<0.62?caps[1].label:t<0.87?caps[2].label:'Balance';
    if(jLabel.textContent!==lbl)jLabel.textContent=lbl;
    dust.rotation.y=e*0.015;
    renderer.render(scene,camera);
    requestAnimationFrame(frame);
  }
  frame();
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){var vis=en[0].isIntersecting;
      if(vis&&!running){running=true;clock.getDelta();frame();}else if(!vis){running=false;}
      document.documentElement.classList.toggle('in-journey',vis);
    },{threshold:0}).observe(journey);
  }
  document.getElementById('skipBtn').addEventListener('click',function(){document.getElementById('main').scrollIntoView({behavior:'auto'});});
})();

/* ===================== PAGE BEHAVIOUR ===================== */
(function(){
  var btn=document.getElementById('menuBtn'),nav=document.getElementById('mobileNav');
  if(!btn||!nav)return;
  function close(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰';btn.setAttribute('aria-label','Open menu');}
  btn.addEventListener('click',function(){var open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.textContent=open?'✕':'☰';btn.setAttribute('aria-label',open?'Close menu':'Open menu');});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&!btn.contains(e.target))close();});
})();
(function(){
  var form=document.querySelector('form[name="consultation"]');if(!form)return;
  function check(f){var input=f.querySelector('input,textarea');if(!input||!input.required)return true;var ok=input.value.trim()!=='';
    if(ok&&input.type==='email')ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());f.classList.toggle('err',!ok);return ok;}
  form.querySelectorAll('.field').forEach(function(f){var input=f.querySelector('input,textarea');if(!input)return;
    input.addEventListener('blur',function(){check(f);});input.addEventListener('input',function(){if(f.classList.contains('err'))check(f);});});
  form.addEventListener('submit',function(e){var ok=true;form.querySelectorAll('.field').forEach(function(f){if(!check(f))ok=false;});
    if(!ok){e.preventDefault();var first=form.querySelector('.field.err input,.field.err textarea');if(first)first.focus();}});
})();
(function(){
  var bar=document.getElementById('stickyCta'),journey=document.getElementById('journey'),contact=document.getElementById('contact');
  if(!bar)return;var lastY=window.scrollY,contactVis=false,timer=null;
  var anchor=journey&&journey.offsetParent!==null?journey:document.getElementById('static-hero');
  if('IntersectionObserver' in window&&contact){new IntersectionObserver(function(en){contactVis=en[0].isIntersecting;update(true);},{threshold:0.05}).observe(contact);}
  function update(stopped){var y=window.scrollY;var past=y>(anchor?anchor.offsetTop+anchor.offsetHeight-120:400);var up=y<lastY-2;
    bar.classList.toggle('show',!!(past&&!contactVis&&(up||stopped)));lastY=y;}
  window.addEventListener('scroll',function(){update(false);clearTimeout(timer);timer=setTimeout(function(){update(true);},350);},{passive:true});
})();
(function(){
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var faqs=Array.prototype.slice.call(document.querySelectorAll('.faq details'));var sums=faqs.map(function(d){return d.querySelector('summary');});
  faqs.forEach(function(d,i){var s=sums[i],p=d.querySelector('.answer');if(!s||!p)return;
    s.addEventListener('click',function(e){if(reduced)return;e.preventDefault();
      if(d.open){p.style.maxHeight=p.scrollHeight+'px';requestAnimationFrame(function(){p.style.maxHeight='0px';});setTimeout(function(){d.open=false;p.style.maxHeight='';},250);}
      else{d.open=true;p.style.maxHeight='0px';requestAnimationFrame(function(){p.style.maxHeight=p.scrollHeight+'px';});setTimeout(function(){p.style.maxHeight='';},260);}});
    s.addEventListener('keydown',function(e){var idx=sums.indexOf(s);
      if(e.key==='ArrowDown'){e.preventDefault();(sums[idx+1]||sums[0]).focus();}else if(e.key==='ArrowUp'){e.preventDefault();(sums[idx-1]||sums[sums.length-1]).focus();}
      else if(e.key==='Home'){e.preventDefault();sums[0].focus();}else if(e.key==='End'){e.preventDefault();sums[sums.length-1].focus();}});
  });
})();
