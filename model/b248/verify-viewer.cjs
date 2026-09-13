// Viewer startup/control smoke test with real geometry and a stub renderer.
// This does not emulate CSS layout or verify WebGL pixels.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../b248-3d.html','utf8');
function run(layout,fail=false){
 const nodes=new Map(),buttons=[],observers=[],frames=[],errors=[];let sizes=0,renders=0;
 function element(){return {style:{},value:'',textContent:'',innerHTML:'',clientWidth:1000,clientHeight:600,disabled:false,events:{},addEventListener(name,fn){this.events[name]=fn;},setAttribute(){},prepend(){},remove(){this.removed=true;}};}
 for(const [,id] of html.matchAll(/\bid="([^"]+)"/g))nodes.set(id,element());
 for(const [,view] of html.matchAll(/data-view="([^"]+)"/g)){const b=element();b.dataset={view};buttons.push(b);}
 const context={console:{error:(...a)=>errors.push(a)},URLSearchParams,devicePixelRatio:2,ResizeObserver:class{constructor(fn){observers.push(fn);}observe(){}},requestAnimationFrame:fn=>frames.push(fn),document:{getElementById:id=>nodes.get(id),querySelectorAll:()=>buttons}};
 context.window=context;context.location={search:'?layout='+layout};vm.createContext(context);
 for(const name of ['../drivetrain/three.min.js','config.js','geometry.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+name,'utf8'),context,{filename:name});
 context.THREE.WebGLRenderer=class{constructor(){if(fail)throw Error('Simulated unavailable WebGL');this.domElement=element();}setPixelRatio(){}setClearColor(){}setSize(){sizes++;}render(){renders++;}};
 vm.runInContext(fs.readFileSync(__dirname+'/viewer.js','utf8'),context,{filename:'viewer.js'});
 assert.equal(nodes.get('layout').value,layout);
 assert.match(nodes.get('capacity').innerHTML,/815/);
 assert.match(nodes.get('plan').innerHTML,/SIX-POD PLAN/);
 if(fail){assert.equal(nodes.get('plan').style.display,'block');assert.match(nodes.get('error').textContent,/3D could not render/);assert.equal(nodes.get('savePng').disabled,true);return;}
 assert.equal(errors.length,0);assert.ok(context.b248Model.group.children.length>0);assert.equal(renders,1);
 observers[0]();observers[0]();assert.equal(sizes,1,'Unchanged viewport must not reset the drawing buffer');
 nodes.get('viewport').clientWidth=800;observers[0]();assert.equal(sizes,2);
 for(const button of buttons){button.onclick();assert.equal(nodes.get('plan').style.display,button.dataset.view==='plan'?'block':'none');}
 nodes.get('layout').events.input({target:{value:layout==='stock'?'transplant':'stock'}});assert.notEqual(context.b248Options.layout,layout);
 nodes.get('profile').events.input({target:{value:'target'}});assert.match(nodes.get('capacity').innerHTML,/400/);
 frames[0]();assert.equal(renders,2);
}
for(const layout of ['stock','transplant']){run(layout);run(layout,true);}
console.log('PASS: both layouts initialize, all view controls work, resize guard works, unavailable-WebGL fallback works (stub renderer).');
