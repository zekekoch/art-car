// Pure geometry/statics checks. No browser required. Does not validate a real vehicle.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const B=require('./config.js'),G=require('./geometry.js');
const close=(a,b)=>assert(Math.abs(a-b)<1e-7,`${a} != ${b}`);
assert.equal(B.pods().length,6);assert.equal(B.pods().filter(p=>p.driver).length,1);
assert.equal(B.loads({}).added,1465);assert.equal(B.loads({}).headroom,-815);
assert.equal(B.loads({profile:'target'}).added,1050);assert.equal(B.loads({profile:'target'}).headroom,-400);
assert.equal(B.loads({profile:'target',rating:3000}).headroom,150);
assert.equal(B.loads({caseName:'empty'}).occupantLoad,0);
close(B.gearing(18,30).torqueFactor,5/3);close(B.gearing(18,30).speedFactor,.6);
assert.equal(B.transport({}).widthMargin,5);assert.equal(B.transport({}).rampMargin,100);
assert.equal(B.transport({layout:'transplant'}).lengthMargin,23);
const cases=[];
for(const layout of ['stock','transplant'])for(const profile of ['existing','target']){
 const o={layout,profile},s=B.sweep(o);assert.equal(s.count,64);
 for(let mask=0;mask<64;mask++){
  const q=B.loads(o,mask),wb=B.dimensions(o).wheelbase;
  close(q.front+q.rear,q.gross);close(q.front*wb,q.items.reduce((n,v)=>n+v.lb*(v.x-q.rearX),0));
  close(q.gross,1550+q.added+300*mask.toString(2).split('1').length-300);
 }
 close(B.loads({...o,caseName:'full'}).cg.z,0);
 const brief=q=>Object.fromEntries(['mask','gross','cg','front','rear','added','occupantLoad','payload','headroom','lateralEdgeMargin'].filter(k=>q[k]!==undefined).map(k=>[k,q[k]]));
 cases.push({layout,profile,full:brief(B.loads(o)),sweep:Object.fromEntries(Object.entries(s).map(([k,v])=>[k,typeof v==='object'?brief(v):v])),transport:B.transport(o)});
}
const panels=B.roofLeaves().flatMap(p=>[-1,1].map(s=>({x:p.x,z:p.z+s*10.75})));
assert.equal(panels.length,12);
assert(Math.hypot(20.5,21.25)<B.cfg.roofRadius,'Both panel rectangles must fit each circular leaf');
for(let i=0;i<panels.length;i++)for(let j=i+1;j<panels.length;j++)assert(Math.abs(panels[i].x-panels[j].x)>=41||Math.abs(panels[i].z-panels[j].z)>=21,'Solar panels must not overlap');
let meshes=0,posts=0;
for(const layout of ['stock','transplant']){
 const model=G.build({layout});model.group.updateMatrixWorld(true);let localPosts=0;
 model.group.traverse(m=>{if(!m.isMesh)return;meshes++;if(m.name==='Roof_post'){posts++;localPosts++;}const a=m.geometry.getAttribute('position');for(let i=0;i<a.array.length;i++)assert(Number.isFinite(a.array[i]),m.name);});
 assert.equal(localPosts,8);
}
assert(B.loads({axleMid:15,emptyFrontShare:.2,curb:500,caseName:'rear'}).front<0,'Adverse loading must expose axle lift');
const report={date:'2026-09-13',checks:['six pods and one driver','complete mass accounting','all 64 occupancy combinations in both architectures and mass profiles','force and moment balance','symmetric full-load lateral CG','adverse axle-lift detection','eight roof posts per architecture','finite mesh coordinates','twelve panels fit leaves without rectangle overlap','separate trailer and ramp limits','gear-ratio arithmetic'],meshes,cases};
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({result:'PASS',checks:report.checks.length,loadCases:256,meshes,roofPostsPerArchitecture:8}));
