// Deterministic orthographic projections of the same Three.js meshes as the viewer.
// Uses render.py for depth-buffered rasterization; these are not manufacturing drawings.
const fs=require('node:fs'),path=require('node:path'),T=require('../drivetrain/three.min.js'),G=require('./geometry.js'),B=require('./config.js');
const profiles=[['assembly',{roof:true,riders:true},.82,.42],['uncovered',{roof:false,riders:true},.82,.5],['running-gear',{layout:'transplant',pods:false,roof:false},.82,.5],['side',{roof:true,riders:false},0,0]];
for(const [name,opts,az,el] of profiles){
 const m=G.build(opts);m.group.updateMatrixWorld(true);const look=new T.Vector3(Math.cos(el)*Math.sin(az),Math.sin(el),Math.cos(el)*Math.cos(az));const right=new T.Vector3().crossVectors(new T.Vector3(0,1,0),look).normalize(),up=new T.Vector3().crossVectors(look,right).normalize(),tri=[];
 m.group.traverse(o=>{if(!o.isMesh)return;let p=o;while(p){if(!p.visible)return;p=p.parent;}const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry,attr=g.getAttribute('position');for(let i=0;i<attr.count;i+=3){const v=[0,1,2].map(k=>new T.Vector3().fromBufferAttribute(attr,i+k).applyMatrix4(o.matrixWorld));const normal=new T.Vector3().crossVectors(v[1].clone().sub(v[0]),v[2].clone().sub(v[0])).normalize();if(normal.dot(look)<-.001)continue;const col=o.material.color.clone().multiplyScalar(.68+.32*Math.max(0,normal.dot(new T.Vector3(.4,.8,.5).normalize())));tri.push({xy:v.map(a=>[a.dot(right),-a.dot(up)]),depth:v.reduce((s,a)=>s+a.dot(look),0)/3,depths:v.map(a=>a.dot(look)),color:'#'+col.getHexString()});}});
 const points=tri.flatMap(t=>t.xy),xmin=Math.min(...points.map(p=>p[0])),xmax=Math.max(...points.map(p=>p[0])),ymin=Math.min(...points.map(p=>p[1])),ymax=Math.max(...points.map(p=>p[1])),scale=Math.min(1060/(xmax-xmin),610/(ymax-ymin)),X=x=>70+(1060-(xmax-xmin)*scale)/2+(x-xmin)*scale,Y=y=>120+(610-(ymax-ymin)*scale)/2+(y-ymin)*scale;
 const title={assembly:'B-248 · six-pod assembly',uncovered:'B-248 · roof removed', 'running-gear':'B-248 axles · proposed 72 in wheelbase',side:'B-248 · side elevation'}[name];
 const payload={title,triangles:tri.map(t=>({xy:t.xy.map(([x,y])=>[X(x),Y(y)]),z:t.depths,color:t.color}))};
 const cp=require('node:child_process'),python=process.env.CODEX_PRIMARY_RUNTIME_PYTHON||'python3';
 cp.execFileSync(python,[path.join(__dirname,'render.py'),path.join(__dirname,name+'.png')],{input:JSON.stringify(payload),maxBuffer:1024*1024});
}
// Reproducible pod plan with datum and transport envelope.
const c=B.cfg,ps=B.pods(),S=4,ox=500,oy=370,X=x=>ox+x*S,Y=z=>oy-z*S;
let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 760"><rect width="1000" height="760" fill="#f4f3ed"/><g font-family="Arial,sans-serif" fill="#263e3b"><text x="50" y="45" font-size="26">B-248 / balanced six-pod plan</text><text x="50" y="72" font-size="13">Inches · forward is right · wheel positions and track require measurement</text>';
svg+=`<rect x="${X(-60.5)}" y="${Y(26)}" width="484" height="208" fill="#e6d6b5" stroke="#b07932"/><rect x="${X(-60.5)}" y="${Y(22.5)}" width="484" height="180" fill="none" stroke="#477d78" stroke-dasharray="5 4"/>`;
for(const x of [-27.5,27.5])for(const z of [-19,19])svg+=`<rect x="${X(x-9)}" y="${Y(z+2.85)}" width="72" height="22.8" fill="#33433e"/>`;
for(const p of ps){const q=B.point(p,12);svg+=`<polygon points="${[...B.outline(p),B.outline(p)[0]].map(([x,z])=>X(x)+','+Y(z)).join(' ')}" fill="#e5cdc0" stroke="#965f50" stroke-width="2"/><text x="${X(q.x)}" y="${Y(q.z)}" text-anchor="middle" font-size="13">${p.name}</text>`;}
for(const x of c.roofPostXs)for(const z of [-18,18])svg+=`<circle cx="${X(x)}" cy="${Y(z)}" r="4" fill="#263e3b"/>`;
for(const [x,l] of [[-31,37],[25,26]])svg+=`<rect x="${X(x-l/2)}" y="${Y(6)}" width="${l*4}" height="48" fill="#beaa88"/>`;
const poly=ps.flatMap(B.outline),min=Math.min(...poly.map(p=>p[0])),max=Math.max(...poly.map(p=>p[0]));
svg+=`<path d="M${X(min)},654H${X(max)}M${X(min)},646v16M${X(max)},646v16" stroke="#697873" fill="none"/><text x="500" y="678" text-anchor="middle" font-size="14">${(max-min).toFixed(1)} in pod length · 116 in pod width</text><text x="500" y="707" text-anchor="middle" font-size="13">121 × 52 in base · 18 in stair slots · 12 in ottoman · eight symmetric roof posts</text><text x="500" y="734" text-anchor="middle" font-size="12">Stock wheelbase: 55 in / transplant proposal: 72 in within a 120 × 52 in frame</text></g></svg>`;
fs.writeFileSync(path.join(__dirname,'plan.svg'),svg);console.log('Wrote four depth-buffered PNGs and a plan SVG from the model source.');
