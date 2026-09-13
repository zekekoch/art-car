/* B-248 concept, inches / pounds. Not fabrication dimensions or a vehicle rating.
   Sources, configuration differences, and measurement gates: ../b248-review.md. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.B248=factory();})(this,function(){
  'use strict';
  const cfg={length:121,width:45,carrierWidth:52,wheelbase:55,deck:25,floor:30,
    track:38,tireD:18,tireW:5.7,axleMid:0,curb:1550,emptyFrontShare:.5,
    sideX:33,sideZ:34,radius:24,driverRadius:26,leg:8,driverLeg:16,
    roofTop:108,roofRadius:32,roofPostXs:[-48,-10,10,48],roofPostZ:18,
    trailerLength:143,trailerWidth:72,rampWidth:57,rampRating:1810,cargoRating:3710,trailerEmpty:2290};
  const defaults={layout:'stock',profile:'existing',rating:2450,occupants:300,caseName:'full',curb:cfg.curb,axleMid:0,emptyFrontShare:.5,track:38};
  const profiles={
    existing:{title:'Existing pod allowances',passenger:128,driver:200,roof:250,carrier:160,stairs:70,ottoman:30,electrical:40,reserve:75},
    target:{title:'Lighter build targets — unproven',passenger:90,driver:110,roof:160,carrier:150,stairs:45,ottoman:25,electrical:35,reserve:75}
  };
  function pods(){return [
    {id:'rear',name:'Rear',x:-cfg.sideX-Math.sqrt((2*cfg.radius)**2-cfg.sideZ**2),z:0,dir:Math.PI,r:24,leg:8},
    {id:'rear-right',name:'Rear right',x:-cfg.sideX,z:-cfg.sideZ,dir:-Math.PI/2,r:24,leg:8},
    {id:'rear-left',name:'Rear left',x:-cfg.sideX,z:cfg.sideZ,dir:Math.PI/2,r:24,leg:8},
    {id:'front-right',name:'Front right',x:cfg.sideX,z:-cfg.sideZ,dir:-Math.PI/2,r:24,leg:8},
    {id:'front-left',name:'Front left',x:cfg.sideX,z:cfg.sideZ,dir:Math.PI/2,r:24,leg:8},
    {id:'driver',name:'Driver',x:cfg.sideX+Math.sqrt((cfg.radius+cfg.driverRadius)**2-cfg.sideZ**2),z:0,dir:Math.PI,r:26,leg:16,driver:true}
  ];}
  function roofLeaves(){return pods().map(p=>({x:p.z?p.x:(p.driver?76:-76),z:p.z*.7}));}
  function point(p,radial,tangent=0){return {x:p.x+Math.cos(p.dir)*radial-Math.sin(p.dir)*tangent,z:p.z+Math.sin(p.dir)*radial+Math.cos(p.dir)*tangent};}
  function outline(p){const out=[];for(let i=0;i<=48;i++){const a=p.dir-Math.PI/2+i*Math.PI/48;out.push([p.x+p.r*Math.cos(a),p.z+p.r*Math.sin(a)]);}for(const t of [p.r,-p.r]){const v=point(p,-p.leg,t);out.push([v.x,v.z]);}return out;}
  function active(caseName,p){return caseName==='full'||caseName==='left'&&p.z>0||caseName==='rear'&&(p.x<0)||caseName==='driver'&&p.driver||caseName==='tail'&&p.id==='rear';}
  function options(o){return Object.assign({},defaults,o);}
  function dimensions(o){o=options(o);return {length:o.layout==='transplant'?120:121,wheelbase:o.layout==='transplant'?72:55};}
  function massRows(o){o=options(o);const p=profiles[o.profile];return [
    ['Five passenger pods',5*p.passenger],['Driver pod and controls',p.driver],['Roof, posts, shade and 12 panels',p.roof],['Carrier and receivers',p.carrier],['Stairs and handholds',p.stairs],['Ottoman',p.ottoman],['Lighting power and wiring',p.electrical],['Unallocated hardware / mass reserve',p.reserve]
  ];}
  function loads(o,mask){o=options(o);const p=profiles[o.profile],ps=pods(),wb=dimensions(o).wheelbase,rear=o.axleMid-wb/2,front=o.axleMid+wb/2;
    const items=[{name:'donor',lb:o.curb,x:rear+o.emptyFrontShare*wb,z:0,y:15}];
    for(const pd of ps){items.push({name:pd.id+' shell',lb:pd.driver?p.driver:p.passenger,...point(pd,8),y:cfg.floor+15});
      const occupied=mask===undefined?active(o.caseName,pd):Boolean(mask&(1<<ps.indexOf(pd)));
      if(occupied)items.push({name:pd.id+' occupants',lb:o.occupants,...point(pd,15),y:cfg.floor+29});}
    for(const [key,y] of [['roof',103],['carrier',27.5],['stairs',15],['ottoman',36],['electrical',22],['reserve',28]])items.push({name:key,lb:p[key],x:0,z:0,y});
    const gross=items.reduce((s,v)=>s+v.lb,0),cg={};for(const k of ['x','z','y'])cg[k]=items.reduce((s,v)=>s+v.lb*v[k],0)/gross;
    const frontLoad=gross*(cg.x-rear)/wb,rearLoad=gross-frontLoad,added=massRows(o).reduce((s,v)=>s+v[1],0);
    const occupantLoad=gross-o.curb-added;
    return {gross,cg,front:frontLoad,rear:rearLoad,added,occupantLoad,payload:added+occupantLoad,headroom:o.rating-added-occupantLoad,
      lateralEdgeMargin:o.track/2-Math.abs(cg.z),items,rearX:rear,frontX:front};
  }
  function sweep(o){const cases=Array.from({length:64},(_,mask)=>({mask,...loads(o,mask)}));
    function extreme(key,sign){return cases.reduce((a,b)=>sign*b[key]>sign*a[key]?b:a);}
    return {count:64,minFront:extreme('front',-1),maxFront:extreme('front',1),minRear:extreme('rear',-1),maxRear:extreme('rear',1),minLateralMargin:extreme('lateralEdgeMargin',-1)};
  }
  function transport(o){o=options(o);const p=profiles[o.profile],added=massRows(o).reduce((s,v)=>s+v[1],0),dry=o.curb+added;
    return {dry,rolling:o.curb+p.carrier,cargo:dry+75,towed:cfg.trailerEmpty+dry+75,
      widthMargin:cfg.rampWidth-cfg.carrierWidth,lengthMargin:cfg.trailerLength-dimensions(o).length,
      cargoMargin:cfg.cargoRating-dry-75,rampMargin:cfg.rampRating-o.curb-p.carrier};
  }
  function wheelRPM(mph,diameter){return mph*1056/(Math.PI*diameter);}
  function gearing(from,to){return {torqueFactor:to/from,speedFactor:from/to};}
  return {cfg,defaults,profiles,pods,roofLeaves,point,outline,active,options,dimensions,massRows,loads,sweep,transport,wheelRPM,gearing};
});
