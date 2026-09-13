(function(){'use strict';
const $=id=>document.getElementById(id),B=window.B248,T=window.THREE,c=B.cfg;let model,renderer,scene,camera,view='assembly',az=.82,el=.47,dist=340,drag=null;
const o={...B.defaults,roof:true,riders:true,ghost:false,cg:false};const stage=$('viewport');
const requestedLayout=new URLSearchParams(window.location.search).get('layout');
if(['stock','transplant'].includes(requestedLayout))o.layout=requestedLayout;
$('layout').value=o.layout;
const fmt=(x,n=0)=>x.toLocaleString(undefined,{maximumFractionDigits:n,minimumFractionDigits:n});
function readouts(){const q=B.loads(o),tr=B.transport(o),sw=B.sweep(o),dim=B.dimensions(o);$('architectureNote').textContent=o.layout==='transplant'?'Reuses complete axle / motor / brake assemblies on a proposed 72 in wheelbase. Base mass stays at the conservative placeholder until the retained parts are weighed. Factory payload rating is a comparison only, not a rating of this frame.':'Stock body dimensions are catalog references. Actual axle locations need measurement.';$('capacity').innerHTML=`<p class="note">${fmt(q.occupantLoad)} lb occupants + ${fmt(q.added)} lb added equipment</p><div class="stat ${q.headroom<0?'bad':''}">${fmt(Math.abs(q.headroom))} lb ${q.headroom<0?'over':'remaining'}</div><div class="status">${q.headroom<0?'This scenario exceeds the selected payload limit.':'Within this mass allowance only. Axle, frame, brake and stability limits remain unresolved.'}</div>`;
 $('massTable').innerHTML='<tr><th>Added item</th><th>lb</th></tr>'+B.massRows(o).map(([name,lb])=>`<tr><td>${name}</td><td>${fmt(lb)}</td></tr>`).join('');
 function dl(id,rows){$(id).innerHTML=rows.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('');}
 dl('axles',[['Gross mass',fmt(q.gross)+' lb'],['Front / rear reactions',fmt(q.front)+' / '+fmt(q.rear)+' lb'],['Longitudinal / lateral CG',fmt(q.cg.x,1)+' / '+fmt(q.cg.z,1)+' in'],['CG to nearest side contact line',fmt(q.lateralEdgeMargin,1)+' in']]);
 $('sweep').textContent=`Front reaction ${fmt(sw.minFront.front)}–${fmt(sw.maxFront.front)} lb; rear ${fmt(sw.minRear.rear)}–${fmt(sw.maxRear.rear)} lb. Smallest lateral contact-line margin ${fmt(sw.minLateralMargin.lateralEdgeMargin,1)} in. ${sw.minFront.front<0||sw.minRear.rear<0?'A negative reaction predicts axle lift under these assumptions. ':''}Static point-mass screen only: excludes suspension roll, tire compliance, slopes, braking, boarding motion and wind. These are axle totals, not individual tire loads.`;
 dl('transport',[['Base envelope',dim.length+' × '+c.carrierWidth+' in'],['Ramp width clearance',fmt(tr.widthMargin/2,1)+' in / side'],['Rolling mass, no operator',fmt(tr.rolling)+' lb*'],['1,810 lb ramp margin',fmt(tr.rampMargin)+' lb*'],['Dry car + packing allowance',fmt(tr.cargo)+' lb*'],['3,710 lb cargo margin',fmt(tr.cargoMargin)+' lb*'],['Trailer + estimated cargo',fmt(tr.towed)+' lb*']]);
 $('occupantsOut').textContent=fmt(o.occupants)+' lb';$('axleMidOut').textContent=fmt(o.axleMid)+' in';$('emptyFrontShareOut').textContent=fmt(o.emptyFrontShare*100)+'%';
}
function plan(){const dim=B.dimensions(o),S=4,ox=495,oy=342,X=x=>ox+x*S,Y=z=>oy-z*S,ps=B.pods(),q=B.loads(o),parts=[];
 const text=(x,y,s,size=12,color='#263e3b')=>parts.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${s}</text>`);
 const rect=(x,z,l,w,fill,stroke='#477d78',dash='')=>parts.push(`<rect x="${X(x-l/2)}" y="${Y(z+w/2)}" width="${l*S}" height="${w*S}" fill="${fill}" stroke="${stroke}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`);
 const line=(x1,y1,x2,y2,color='#71827a',dash='')=>parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`);
 text(490,38,'B-248 / SIX-POD PLAN',18);text(490,60,'Inches · +X forward (right) · donor wheel positions are provisional',12,'#697873');
 rect(0,0,dim.length,52,'#e6d6b5','#b07932');if(o.layout==='stock')rect(0,0,121,45,'#d8e2d9','#477d78','5 4');
 for(const x of [q.frontX,q.rearX]){line(X(x),Y(24),X(x),Y(-24),'#477d78','4 3');for(const s of [-1,1])rect(x,s*o.track/2,18,5.7,'#33433e');}
 for(const p of ps){parts.push(`<polygon points="${B.outline(p).map(([x,z])=>X(x)+','+Y(z)).join(' ')}" fill="#e5cdc0" stroke="#965f50" stroke-width="2"/>`);const v=B.point(p,12);text(X(v.x),Y(v.z)-3,p.name,11);text(X(v.x),Y(v.z)+13,(B.active(o.caseName,p)?o.occupants:0)+' lb',11,'#8b5044');}
 rect(0,0,18,52,'#eef0e9','#b07932');for(const [x,l] of [[-31,37],[25,26]])rect(x,0,l,12,'#beaa88','#965f50');
 for(const x of c.roofPostXs)for(const z of [-18,18])parts.push(`<circle cx="${X(x)}" cy="${Y(z)}" r="4" fill="#263e3b"/>`);
 const all=ps.flatMap(B.outline),xmin=Math.min(...all.map(p=>p[0])),xmax=Math.max(...all.map(p=>p[0]));
 line(X(xmin),610,X(xmax),610);for(const x of [xmin,xmax])line(X(x),599,X(x),621);text((X(xmin)+X(xmax))/2,634,fmt(xmax-xmin,1)+' in pod envelope');
 line(X(-60.5),558,X(60.5),558);for(const x of [-60.5,60.5])line(X(x),549,X(x),567);text(495,581,dim.length+' in base · 52 in carrier · '+dim.wheelbase+' in wheelbase');
 line(906,Y(58),906,Y(-58));for(const z of [-58,58])line(897,Y(z),915,Y(z));text(940,344,'116 in',12);text(490,670,'18 in stair slots · 12 in ottoman · eight paired roof posts · no casters',12,'#697873');
 if(o.cg)parts.push(`<circle cx="${X(q.cg.x)}" cy="${Y(q.cg.z)}" r="7" fill="#c87b5b" stroke="white"/>`);
 $('plan').innerHTML=parts.join('');
}
function place(){if(!camera)return;const target=new T.Vector3(0,43,0);camera.position.set(dist*Math.cos(el)*Math.sin(az),43+dist*Math.sin(el),dist*Math.cos(el)*Math.cos(az));camera.lookAt(target);}
function draw(){readouts();plan();$('savePng').disabled=!renderer||view==='plan';if(!renderer)return;if(model){scene.remove(model.group);const mats=new Set();model.group.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material)mats.add(m.material)});mats.forEach(m=>m.dispose());}
 model=B248Geometry.build({...o,pods:view!=='donor',roof:o.roof,transport:view==='transport'});scene.add(model.group);window.b248Model=model;
}
function setView(v){view=v;for(const b of document.querySelectorAll('[data-view]'))b.setAttribute('aria-pressed',String(b.dataset.view===v));const isPlan=v==='plan';$('plan').style.display=isPlan?'block':'none';if(renderer)renderer.domElement.style.display=isPlan?'none':'block';$('sceneTitle').style.display=isPlan?'none':'block';
 const titles={assembly:'Balanced pod layout; driver controls relocate forward.',donor:'Retain the matched axles, motor, brakes and leaf springs.',side:'30 in proposed pod floor; no air-suspension kneel.',transport:'Rolling base only; width, cargo and ramp loads are separate checks.'};$('sceneTitle').textContent=titles[v]||'';
 if(v==='side'){az=0;el=.04;dist=345;}else if(v==='donor'||v==='transport'){az=.85;el=.6;dist=270;}else{az=.82;el=.47;dist=340;}place();draw();
}
for(const id of ['layout','profile','rating','caseName','occupants','curb','axleMid','emptyFrontShare','track'])$(id).addEventListener('input',e=>{const raw=e.target.value;if(['layout','profile','caseName'].includes(id))o[id]=raw;else{const n=Number(raw);if(!Number.isFinite(n)||!e.target.checkValidity()||raw==='')return;o[id]=n;}draw();});
for(const id of ['roof','riders','ghost','cg'])$(id).addEventListener('change',e=>{o[id]=e.target.checked;draw();});for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>setView(b.dataset.view);
function save(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('savePlan').onclick=()=>save(new Blob(['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 700">'+$('plan').innerHTML+'</svg>'],{type:'image/svg+xml'}),'b248-plan.svg');
$('savePng').onclick=()=>{if(!renderer||view==='plan')return;renderer.render(scene,camera);renderer.domElement.toBlob(b=>{if(b)save(b,'b248-'+view+'.png')});};
function fail3D(error){console.error('B-248 3D view:',error);if(renderer){renderer.domElement.remove();renderer=null;}setView('plan');$('error').textContent='3D could not render. The dimensioned plan and load controls are still available. Reload to retry 3D.';}
try{renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xeef0e9);renderer.outputEncoding=T.sRGBEncoding;stage.prepend(renderer.domElement);scene=new T.Scene();camera=new T.PerspectiveCamera(37,1,.1,2000);scene.add(new T.HemisphereLight(0xffffff,0xa0aa93,1));const sun=new T.DirectionalLight(0xfff7e8,.9);sun.position.set(60,200,80);scene.add(sun);const grid=new T.GridHelper(240,20,0xc4cec0,0xd9dfd4);grid.position.y=-.2;scene.add(grid);
 const canvas=renderer.domElement;canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail3D(new Error('WebGL context lost'));});canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;az-=(e.clientX-drag.x)*.007;el=Math.max(.02,Math.min(1.55,el+(e.clientY-drag.y)*.007));drag={x:e.clientX,y:e.clientY};place();});canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);canvas.addEventListener('wheel',e=>{e.preventDefault();dist=Math.max(140,Math.min(600,dist*Math.exp(e.deltaY*.001)));place();},{passive:false});
 let lastWidth=0,lastHeight=0;const resize=()=>{if(!renderer)return;const width=Math.max(1,Math.floor(stage.clientWidth)),height=Math.max(1,Math.floor(stage.clientHeight));if(width===lastWidth&&height===lastHeight)return;lastWidth=width;lastHeight=height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(stage);resize();place();draw();(function loop(){if(!renderer)return;try{renderer.render(scene,camera);}catch(e){fail3D(e);return;}requestAnimationFrame(loop)})();
}catch(e){fail3D(e);}
window.b248Options=o;
})();
