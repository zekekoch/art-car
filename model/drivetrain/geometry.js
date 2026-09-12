/* Drivetrain packaging study. Source dimensions and limitations: ../drivetrain-review.md.
   Coordinates: inches, +X front, Y up, +Z vehicle left. OBJ export converts to meters. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./three.min.js'));else root.DriveModel=factory(root.THREE)})(this,function(T){
'use strict';
const rad=Math.PI/180, mm=x=>x/25.4;
const cfg={length:120,width:54,track:43,wheelbase:66,deck:24,arm:16,kingpinZ:11.5,pivotX:49,receiverGap:26,
 tireD:mm(571.2),tireW:mm(259.3),rimD:12,rimW:8.5,motorD:mm(222),barrel:mm(68),motorOverall:mm(221.5),pcd:mm(100),centerBore:mm(60),
 packL:50,packW:21,packH:10.5,packBottom:8.5,bagH:6.5,bagMin:2.8,bagMax:10.5,bagD:7,motionRatio:10/16};
const colors={buy:0x278b89,fab:0xb17b39,machine:0xa161a3,tire:0x303a3e,steel:0x647077,bright:0xc9d2d0,copper:0xc88c53,red:0xc95645,blue:0x437baf,black:0x202e35};
const parts={
 frame:{title:'Welded ladder frame',kind:'Fabricate',text:'2 × 4 in side rails at ±14 in; crossmembers and bolted corner mounting plates. Sleeve and motor loads need a complete frame calculation.',source:'../drivetrain-review.md'},
 receivers:{title:'Receiver sleeves',kind:'Fabricate',text:'2½ in sleeves, 26 in center spacing. Larger 12 in wheel package leaves only ~0.51 in fore/aft clearance per side at ride height. Pods omitted.'},
 arms:{title:'Suspension arms & hangers',kind:'Fabricate + machine',text:'16 in pivot-to-kingpin arms. Wide, coaxial pivots carry the offset-wheel moment. Front trailing / rear leading arms are mirrored; this motion changes front caster.'},
 pivots:{title:'Pivot shafts & bushings',kind:'Machine / buy bearings',text:'Shaft, inner sleeves, bushings and thrust washers drawn separately. Diameters are proposals; use selected load-rated bearings and machine/ream coaxial seats after welding.'},
 knuckle:{title:'Steering knuckle & torque block',kind:'Machine',text:'Kingpin bearing seats, thrust faces and clamped antirotation interface to the stationary motor shaft. This is the main custom precision assembly. The current 10 in scrub radius remains a major problem.'},
 motor:{title:'QS205 car motor · 50H V3',kind:'Buy · exact variant pending',text:'3 kW catalog candidate; single stationary shaft, separate rotating wheel flange. PCD 4×100 mm, CB60, M24×1.5 from listing. Housing envelope uses a conflicting legacy drawing: confirm all dimensions and wheel-end load capacity.',source:'https://www.qsmotor.com/product/3000w-205-car-motor/'},
 wheel:{title:'12 in rim & turf tire',kind:'Buy · rim matching pending',text:'Carlstar Multi-Trac C/S 574353: nominal 23×10.50-12, mounted 22.49 × 10.21 in on an 8.5 in rim. Correct load rating, center bore, bolt circle, offset and barrel/caliper clearance must all match.',source:'https://www.carlstar.com/our-products/product-detail/multi-trac/'},
 spring:{title:'Air Lift D2500 · 58343',kind:'Buy',text:'7 in maximum diameter; 2.8–10.5 in height, 5.5–7.5 in design height. Drawn at 6.5 in with 0.625 motion ratio: spring force is ~1.6× sprung wheel load. Lower plate tilts; permissible angle is unverified.',source:'https://www.airliftperformance.com/product/58343'},
 damper:{title:'Dampers, stops & straps',kind:'Buy + fabricated mounts',text:'Four separate dampers, bump stops and droop straps. Air springs do not replace dampers. These are reserved envelopes; choose lengths/stroke after travel and load are established.'},
 steering:{title:'Rack, tie rods & column',kind:'Buy + custom geometry',text:'Proposed rack behind front axle. Fixed-length tie rods solve independent wheel angles; there is no catalog rack selected yet. Knuckle motion may make this linkage impossible at large kneel. Column uses supported shafts and U-joints.'},
 brakes:{title:'Friction service brakes',kind:'Buy matched system',text:'Four rotor and hydraulic-caliper envelopes, hard lines, flexible hoses and tandem master cylinder. Rotor diameter, thickness, offset, caliper, pedal leverage and balance are unselected; this is not a compatible brake kit.'},
 park:{title:'Mechanical parking brakes',kind:'Buy + adapt mounts',text:'Separate cable calipers on rear wheels, equalizer and held lever. A separate parking mechanism is needed even with regen. Wilwood 120-1360 illustrates the type, not proven capacity or fit.',source:'https://www.wilwood.com/Calipers/CaliperProd?itemno=120-1360'},
 battery:{title:'Two 16S battery strings',kind:'Buy cells + build enclosure',text:'32 LF280K cells shown at 72×173.7×207.5 mm; 28.672 kWh nominal. Reserved enclosure 50×21×10½ in. Separate pack protection and precharge, insulation and mechanical retention require detailed design.',source:'https://www.evebatteryusa.com/_files/ugd/abe55e_7ba2e98dd2884f8d978b861be2b471e2.pdf'},
 controller:{title:'Four FOC controllers',kind:'Buy · candidate',text:'Kelly KLS4830S candidate, 30–62 V operating. Body and connector clearances are placeholders. Phase current, continuous motor temperature and full-pack regen behavior must be verified.',source:'https://kellycontroller.com/shop/kls-s/'},
 air:{title:'Air supply & four circuits',kind:'Buy',text:'Compressor, ~2 gal reservoir, independent fill/exhaust circuits and height sensors. Lines are schematic routes. Do not cross-connect left and right bags; pressure alone is not calibrated corner load.'},
 controls:{title:'Driver controls',kind:'Buy + mount',text:'Steering wheel, supported column, separate brake and accelerator pedals, F/N/R, enable/E-stop and parking lever. Shown on a temporary mounting cradle, with the driver pod omitted.'},
 services:{title:'Power, signal & brake routing',kind:'Build harness / plumbing',text:'Orange: motor power; blue: hydraulic brakes; teal: air. Flexible loops accommodate steering/suspension conceptually. Bend radius, strain relief and interference need validation.'}
};
const V=a=>new T.Vector3(...a);
function steeringPoint(s,theta,k){const a=-Math.asin(k/cfg.arm);return V([-6,2,-s*1.05]).applyAxisAngle(new T.Vector3(0,1,0),theta).add(V([-16,0,0])).applyAxisAngle(new T.Vector3(0,0,1),a).add(V([49,cfg.tireD/2-k,s*cfg.kingpinZ]));}
const rackPoint=(s,travel,k)=>V([25,cfg.tireD/2+2-k,s*5+travel]);
const rodLength=s=>steeringPoint(s,0,0).distanceTo(rackPoint(s,0,0));
function solveAngle(s,travel,k){const f=t=>steeringPoint(s,t,k).distanceTo(rackPoint(s,travel,k))-rodLength(s);let roots=[],best={theta:0,error:Infinity};let lo=-55*rad,fl=f(lo);
 for(let i=1;i<=440;i++){let hi=(-55+i*.25)*rad,fh=f(hi);if(Math.abs(fh)<best.error)best={theta:hi,error:Math.abs(fh)};if(fl*fh<=0){let a=lo,b=hi,fa=fl;for(let j=0;j<36;j++){let m=(a+b)/2,fm=f(m);if(fa*fm<=0)b=m;else{a=m;fa=fm}}roots.push((a+b)/2)}lo=hi;fl=fh}
 const expected=travel/6;roots.sort((a,b)=>Math.abs(a-expected)-Math.abs(b-expected));return roots.length?{theta:roots[0],error:Math.abs(f(roots[0])),valid:true}:{...best,valid:false};}
function state(input={}){const k=input.kneel||0,travel=input.rack||0;const solutions=[-1,1].map(s=>({s,...solveAngle(s,travel,k)}));const R=cfg.tireD/2;
 const rpm=5*.44704/(Math.PI*cfg.tireD*.0254)*60;const torque=(input.mass||2000)*9.80665*(input.crr||.06)*(R*.0254)/4;
 return{k,travel,explode:input.explode||0,solutions,rpm,torque,bagH:cfg.bagH-k*cfg.motionRatio,clearance:cfg.packBottom-k,rodLengths:[rodLength(-1),rodLength(1)]};}
function build(input={}){
 const q=state(input),g=new T.Group();g.name='ART_CAR_DRIVETRAIN_INCHES';const anchors={},collisionBoxes=[],wheels=[];let seq=0;
 function mat(color,extra={}){return new T.MeshStandardMaterial({color:new T.Color(color).convertSRGBToLinear(),metalness:.25,roughness:.55,...extra})}const mats={};for(const key in colors)mats[key]=mat(colors[key]);mats.tire.metalness=0;mats.tire.roughness=.95;
 function mesh(parent,geo,key,cat,name){const m=new T.Mesh(geo,mats[key]);m.name=(name||cat)+'_'+(++seq);m.userData={part:cat,process:key};m.castShadow=m.receiveShadow=true;parent.add(m);return m}
 function box(parent,p,size,key,cat,name){const m=mesh(parent,new T.BoxGeometry(...size),key,cat,name);m.position.set(...p);return m}
 function cyl(parent,p,r,h,axis,key,cat,name,n=32){const m=mesh(parent,new T.CylinderGeometry(r,r,h,n),key,cat,name);m.position.set(...p);if(axis==='z')m.rotation.x=Math.PI/2;if(axis==='x')m.rotation.z=Math.PI/2;return m}
 function bar(parent,a,b,r,key,cat,name){const va=V(a),vb=V(b),d=vb.clone().sub(va);const m=mesh(parent,new T.CylinderGeometry(r,r,d.length(),12),key,cat,name);m.position.copy(va.add(vb).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m}
 function tube(parent,a,b,w,h,key,cat,name){const va=V(a),vb=V(b),d=vb.clone().sub(va);const m=mesh(parent,new T.BoxGeometry(w,h,d.length()),key,cat,name);m.position.copy(va.add(vb).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),d.normalize());return m}
 function path(parent,points,r,key,cat,name){const curve=new T.CatmullRomCurve3(points.map(V));return mesh(parent,new T.TubeGeometry(curve,32,r,6,false),key,cat,name)}
 function ring(parent,p,r,w,axis,key,cat,name){const m=mesh(parent,new T.TorusGeometry(r,w,8,48),key,cat,name);m.position.set(...p);if(axis==='y')m.rotation.x=Math.PI/2;if(axis==='x')m.rotation.y=Math.PI/2;return m}
 function washer(parent,p,ro,ri,h,axis,key,cat,name){const shape=new T.Shape();shape.absarc(0,0,ro,0,2*Math.PI,false);const hole=new T.Path();hole.absarc(0,0,ri,0,2*Math.PI,true);shape.holes.push(hole);const m=mesh(parent,new T.ExtrudeGeometry(shape,{depth:h,bevelEnabled:false,curveSegments:32}),key,cat,name);m.position.set(...p);m.position[axis]-=h/2;if(axis==='y')m.rotation.x=-Math.PI/2;if(axis==='x')m.rotation.y=Math.PI/2;return m}
 function bolt(parent,p,axis,cat,length=.8,r=.18){cyl(parent,p,r,length,axis,'bright',cat,'bolt_shank',12);let h=[...p];h[{x:0,y:1,z:2}[axis]]+=length/2;return cyl(parent,h,r*1.7,.18,axis,'bright',cat,'hex_head',6)}
 const chassis=new T.Group();chassis.name='SPRUNG_FRAME';chassis.position.y=-q.k;g.add(chassis);
 for(const s of [-1,1]){const m=box(chassis,[0,22,s*14],[118,4,2],'steel','frame','side_rail');collisionBoxes.push(m)}
 for(const x of [-59,-48.25,-20,0,20,48.25,59])box(chassis,[x,22.5,0],[2,3,26],'steel','frame','crossmember');
 for(const e of [-1,1])for(const x of [20,46])for(const s of [-1,1]){const m=box(chassis,[e*x,22,s*19],[2.5,2.5,16],'fab','receivers','receiver_sleeve');collisionBoxes.push(m);box(chassis,[e*x,22,s*27.02],[1.98,1.98,.06],'black','receivers','receiver_opening');bolt(chassis,[e*x,22,s*25],'x','receivers',3,.24)}
 for(const e of [-1,1])for(const s of [-1,1])box(chassis,[e*52,22,s*13],[16,2.5,2.5],'fab','receivers','end_receiver');
 // Ground-level datum, never a deck or a body panel.
 const outline=new T.BufferGeometry().setFromPoints([[-60,0,-27],[60,0,-27],[60,0,27],[-60,0,27],[-60,0,-27]].map(V));const line=new T.Line(outline,new T.LineDashedMaterial({color:0x8c999c,dashSize:2,gapSize:1}));line.computeLineDistances();line.userData.guide=true;g.add(line);
 // Battery enclosure: two strings of 16 cells; hardware bay beside them.
 const battery=new T.Group();battery.name='BATTERY_SLED';chassis.add(battery);
 box(battery,[0,8.75,0],[50,.5,21],'fab','battery','sled_bottom');
 for(const s of [-1,1])box(battery,[0,13.75,s*10.4],[50,10.5,.2],'fab','battery','enclosure_side');
 for(const e of [-1,1])box(battery,[e*24.9,13.75,0],[.2,10.5,21],'fab','battery','enclosure_end');
 for(let row=0;row<2;row++)for(let i=0;i<16;i++){const x=(i-7.5)*(mm(72)+.025),z=(row-.5)*(mm(173.7)+.06)-2.5;
 box(battery,[x,9+mm(207.5)/2,z],[mm(72),mm(207.5),mm(173.7)],'blue','battery',`LF280K_string_${row+1}_cell_${i+1}`);
 for(const ss of [-1,1])cyl(battery,[x,17.25,z+ss*2.35],.21,.28,'y',ss>0?'red':'bright','battery','cell_terminal');
 if(i<15)box(battery,[x+(mm(72)+.025)/2,17.46,z+(i%2?2.35:-2.35)],[mm(72)+.12,.09,.46],'copper','battery','busbar_diagram');}
 for(const x of [-17,0,17]){box(battery,[x,13,8],[7,5,3.4],'black','battery','protection_envelope');box(battery,[x,15.6,8],[6.7,.2,3.1],'buy','battery','BMS_contactor_fuse_allowance')}
 for(const x of [-22,22])for(const s of [-1,1]){box(chassis,[x,19.7,s*11.5],[4,.5,4],'fab','battery','sled_bolt_tab');bolt(chassis,[x,19.9,s*11.5],'y','battery',1.5,.25)}
 anchors.battery=V([0,19,0]);anchors.frame=V([-53,24,-14]);anchors.receivers=V([-20,23,-25]);
 const cornerGroups=[];
 for(const e of [-1,1])for(const s of [-1,1]){
  const cg=new T.Group();cg.name=(e===1?'FRONT':'REAR')+'_'+(s===1?'LEFT':'RIGHT');g.add(cg);cornerGroups.push(cg);
  const R=cfg.tireD/2,az=e===1?cfg.kingpinZ:14,px=e*49,pivotY=R-q.k;
  // A bolted module cradle connects the bearings and spring tower back to the rail.
  for(const x of [e*45,e*52]){box(cg,[x,19.75-q.k,s*10],[7,.5,15],'fab','arms','module_top_plate');for(const zz of [5,14])bolt(cg,[x,20.2-q.k,s*zz],'y','arms',1,.22)}
  for(const z of [s*(az-8),s*az]){box(cg,[px,(pivotY+19-q.k)/2,z],[4,19-q.k-pivotY,.5],'fab','arms','pivot_hanger');cyl(cg,[px,pivotY,z],1.05,1.2,'z','buy','pivots','bushing');washer(cg,[px,pivotY,z+s*.7],1.13,.52,.12,'z','bright','pivots','thrust_washer')}
  cyl(cg,[px,pivotY,s*(az-4)],.5,10,'z','machine','pivots','pivot_shaft');
  const arm=new T.Group();arm.name='RIGID_16_IN_ARM';arm.position.set(px,pivotY,s*az);arm.rotation.z=-e*Math.asin(q.k/cfg.arm);cg.add(arm);
  for(const dz of [0,-s*8])box(arm,[-e*8,0,dz],[16,2.5,1.5],'fab','arms','arm_leg');
  box(arm,[-e*15.25,0,-s*4],[1.5,2.5,9.5],'fab','arms','arm_cross_tube');
  cyl(arm,[0,0,-s*4],.88,9.5,'z','fab','pivots','pivot_sleeve');
  const kp=new T.Group();kp.name='STEER_KNUCKLE';kp.position.set(-e*16,0,0);const sol=e===1?q.solutions.find(a=>a.s===s):{theta:0};kp.rotation.y=sol.theta;arm.add(kp);
  if(e===1){for(const yy of [-3.75,3.75]){box(arm,[-16,yy,0],[3.5,.5,3.5],'fab','knuckle','kingpin_ear');cyl(kp,[0,yy*.75,0],1.12,1.2,'y','buy','knuckle','kingpin_bushing');washer(kp,[0,yy*.85,0],1.3,.51,.2,'y','bright','knuckle','kingpin_thrust')}
   cyl(kp,[0,0,0],.5,9,'y','machine','knuckle','kingpin');box(kp,[0,0,0],[2.7,5,2.7],'machine','knuckle','knuckle_body');
   tube(kp,[0,2,0],[-6,2,-s*1.05],1,1,'machine','steering','steering_arm');
  }
  const wheelOffset=cfg.track/2-az,spread=(input.explode||0)/100;
  // Independent stationary shaft / clamped torque block. Wheel bearing internals are diagrammatic.
  box(kp,[0,0,s*(wheelOffset-3.1)/2],[3.1,3.4,wheelOffset-3.1],'machine','knuckle','shaft_torque_block');for(const xx of [-1,1])for(const yy of [-1.15,1.15])bolt(kp,[xx,yy,s*(wheelOffset-3)],'z','knuckle',1,.18);
  cyl(kp,[0,0,s*(wheelOffset-2.3)],mm(28)/2,4.6,'z','machine','motor','stationary_shaft');
  cyl(kp,[0,0,s*(wheelOffset-4.1)],mm(24)/2,mm(25),'z','bright','motor','M24_thread_envelope');
  const wm=new T.Group();wm.name='ROTATING_MOTOR';wm.position.z=s*(wheelOffset+spread*5);kp.add(wm);
  cyl(wm,[0,0,0],cfg.motorD/2,cfg.barrel,'z','buy','motor','QS205_barrel');
  for(const zz of [-1,1]){cyl(wm,[0,0,zz*cfg.barrel/2],cfg.motorD/2,.17,'z','bright','motor','motor_cover');for(let n=0;n<12;n++){let a=n*Math.PI/6;bolt(wm,[cfg.motorD*.46*Math.cos(a),cfg.motorD*.46*Math.sin(a),zz*(cfg.barrel/2+.15)],'z','motor',.16,.09)}}
  cyl(wm,[0,0,s*1.6],2.7,.5,'z','buy','motor','wheel_flange');
  cyl(wm,[0,0,s*1.97],cfg.centerBore/2,.4,'z','bright','motor','CB60_wheel_pilot');
  for(let n=0;n<4;n++){let a=n*Math.PI/2;bolt(wm,[cfg.pcd/2*Math.cos(a),cfg.pcd/2*Math.sin(a),s*2.25],'z','motor',mm(30),mm(6))}
  // Separate disc and caliper. All brake dimensions here are unselected allowance geometry.
  const rotorZ=s*(wheelOffset-2.6+spread*2);cyl(wm,[0,0,-s*1.9],1.6,1.2,'z','bright','brakes','rotor_hat_allowance');washer(kp,[0,0,rotorZ],3.55,1.18,.25,'z','bright','brakes','180mm_rotor_allowance');
  for(let n=0;n<18;n++){const a=n*Math.PI/9;cyl(kp,[2.9*Math.cos(a),2.9*Math.sin(a),rotorZ+s*.135],.12,.025,'z','black','brakes','rotor_drill_mark',8)}
  box(kp,[2.8,1.8,rotorZ],[2.2,2.3,1.6],'buy','brakes','service_caliper_allowance');box(kp,[1.7,.9,rotorZ-s*1],[3,.35,1.6],'machine','brakes','caliper_adapter');
  if(e===-1){box(kp,[-2.8,1.3,rotorZ],[2,2,1.65],'buy','park','mechanical_parking_caliper');bar(kp,[-3.2,1.8,rotorZ],[-4.7,3.5,rotorZ],.16,'bright','park','parking_lever')}
  const rim=new T.Group();rim.name='12_IN_RIM';rim.position.z=s*(wheelOffset+spread*11);kp.add(rim);
  for(const zz of [-1,1])ring(rim,[0,0,zz*cfg.rimW/2],6,.2,'z','bright','wheel','rim_bead');
  for(let n=0;n<8;n++){let a=n*Math.PI/4;bar(rim,[2*Math.cos(a),2*Math.sin(a),s*2.2],[5.8*Math.cos(a),5.8*Math.sin(a),s*3.8],.32,'bright','wheel','rim_spoke')}
  washer(rim,[0,0,s*2.2],2.6,cfg.centerBore/2,.25,'z','bright','wheel','wheel_center');
  const tire=new T.Group();tire.name='CARLSTAR_574353';tire.position.z=s*(wheelOffset+spread*18);kp.add(tire);
  const profile=[[6,-4.25],[7.3,-cfg.tireW/2],[9.8,-cfg.tireW/2],[R-.3,-4],[R,-2.5],[R,2.5],[R-.3,4],[9.8,cfg.tireW/2],[7.3,cfg.tireW/2],[6,4.25],[6,-4.25]].map(p=>new T.Vector2(...p));
  const tireMesh=mesh(tire,new T.LatheGeometry(profile,64),'tire','wheel','tire_casing');tireMesh.rotation.x=Math.PI/2;
  for(let n=0;n<36;n++)for(const rr of [-1,0,1]){let a=(n+Math.abs(rr)*.45)*Math.PI/18;let m=box(tire,[(R-.02)*Math.cos(a),(R-.02)*Math.sin(a),rr*2.75],[1.45,.34,2.0],'tire','wheel','turf_tread');m.rotation.z=a-Math.PI/2}
  wheels.push({tire,kp,e,s});
  // Spring base moves with the rigid arm. Top is tied to the sprung module.
  const low=V([-e*10,2.25,-s*3.5]).applyMatrix4(new T.Matrix4().compose(arm.position,arm.quaternion,arm.scale));const high=V([px-e*10,R+2.25+cfg.bagH-q.k,s*(az-3.5)]);
  box(cg,high.toArray(),[8,.5,8],'fab','spring','upper_spring_plate');
  for(const z of [s*(az-7.4),s*(az+.4)])tube(cg,[high.x,high.y,z],[px,20-q.k,z],.6,.8,'fab','spring','tower_brace');
  const bag=new T.Group();bag.name='D2500';cg.add(bag);const d=high.clone().sub(low),h=d.length();bag.position.copy(low);bag.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());
  const bp=[[0,0],[2.3,0],[2.8,.2],[3.5,h*.23],[3.3,h*.39],[2.6,h*.5],[3.3,h*.61],[3.5,h*.77],[2.8,h-.2],[2.3,h],[0,h]].map(p=>new T.Vector2(...p));mesh(bag,new T.LatheGeometry(bp,40),'black','spring','double_bellows');
  for(const yy of [0,h]){cyl(bag,[0,yy,0],3,.24,'y','buy','spring','spring_cap');for(const ss of [-1,1])bolt(bag,[ss*.875,yy,0],'y','spring',.5,.16)}
  const db=V([-e*5,0,-s*7]).applyMatrix4(new T.Matrix4().compose(arm.position,arm.quaternion,arm.scale)),dt=V([px-e*1,19-q.k,s*(az-7)]),mid=db.clone().lerp(dt,.6);
  bar(cg,db.toArray(),mid.toArray(),.7,'buy','damper','damper_body');bar(cg,mid.toArray(),dt.toArray(),.22,'bright','damper','damper_rod');for(const p of [db,dt])ring(cg,p.toArray(),.5,.2,'z','bright','damper','damper_eye');
  cyl(cg,[px-e*12,17-q.k,s*(az-7)],.8,2,'y','black','damper','bump_stop');path(cg,[[px-e*7,19-q.k,s*(az-6)],[px-e*10,14-q.k/2,s*(az-6)],[-e*7+px,pivotY+1,s*(az-6)]],.08,'black','damper','droop_strap');
  if(e===1){const p=steeringPoint(s,sol.theta,q.k),r=rackPoint(s,q.travel,q.k);bar(g,r.toArray(),p.toArray(),.22,'buy','steering','fixed_length_tie_rod');for(const v of [r,p])cyl(g,v.toArray(),.45,.55,'y','bright','steering','rod_end');}
  const motorWireStart=V([0,0,s*(wheelOffset-4)]);kp.updateWorldMatrix(true,false);motorWireStart.applyMatrix4(kp.matrixWorld);
  path(g,[motorWireStart.toArray(),[e*35,15,s*9],[e*43,21-q.k,s*6],[e*54,23-q.k,s*6]],.13,'copper','services','motor_cable_loop');
  path(g,[[e*28,22-q.k,s*12],[e*30,17,s*13],[e*33,13,s*17]],.075,'blue','services','brake_flex_loop');
  path(g,[[e*52,23-q.k,0],[high.x,high.y+1,0],[high.x,high.y+1,high.z]],.075,'buy','air','air_line');
  if(e===1&&s===1){anchors.motor=V([33,R,23]);anchors.knuckle=V([33,R+2,11.5]);anchors.spring=high.clone();anchors.wheel=V([33,R,29]);anchors.brakes=V([36,R+2,19]);}
 }
 // Rack is frame mounted, behind the axle. Inner pivot spacing is a proposal.
 box(chassis,[25,cfg.tireD/2+2,0],[2.1,2.1,12],'buy','steering','rack_housing');
 for(const s of [-1,1]){cyl(chassis,[25,cfg.tireD/2+2,s*5+q.travel],.38,4,'z','bright','steering','rack_bar');for(let n=0;n<7;n++)ring(chassis,[25,cfg.tireD/2+2,s*(4+n*.2)+q.travel/2],.68,.11,'z','black','steering','rack_boot');tube(chassis,[25,cfg.tireD/2+2,s*3],[21,21,s*9],.6,.6,'fab','steering','rack_mount')}
 const col=[[25,cfg.tireD/2+2,2],[40,18,7],[57,25,8],[68,38,8],[72,43,8]];
 for(let n=1;n<col.length;n++){bar(chassis,col[n-1],col[n],.38,'bright','steering','column_shaft');cyl(chassis,col[n-1],.8,1,'z','machine','steering','column_U_joint')}
 for(const p of [col[2],col[3]]){box(chassis,[p[0],p[1]-1,p[2]],[2,1,3],'fab','steering','column_bearing_mount');cyl(chassis,p,.8,1,'x','buy','steering','column_support_bearing')}
 const wh=new T.Group();wh.position.set(...col[4]);wh.rotation.y=Math.PI/2;wh.rotation.x=.6;chassis.add(wh);ring(wh,[0,0,0],6,.45,'z','black','controls','steering_wheel');for(let i=0;i<3;i++){let a=i*Math.PI*2/3;bar(wh,[0,0,0],[5.8*Math.cos(a),5.8*Math.sin(a),0],.22,'bright','controls','wheel_spoke')}
 // Driver cradle is explicitly temporary, not the omitted pod.
 for(const s of [-1,1])tube(chassis,[55,22,s*10],[76,22,s*10],1.2,1.2,'fab','controls','temporary_control_cradle');box(chassis,[75,22,0],[2,1.2,22],'fab','controls','pedal_cross_tube');
 for(const [z,cat] of [[5,'brakes'],[-4,'controls']]){tube(chassis,[75,23,z],[72,29,z],.6,.5,'buy',cat,'pedal_arm');let b=box(chassis,[72,29,z],[.7,3.5,2.5],'black',cat,'pedal_pad');b.rotation.z=.4}
 cyl(chassis,[67,23.5,5],.8,6,'x','buy','brakes','tandem_master');for(const x of [66,68.5])box(chassis,[x,25.5,5],[1.8,2.4,2],'bright','brakes','brake_reservoir');
 bar(chassis,[65,25,14],[62,32,14],.28,'black','park','held_parking_lever');
 for(const s of [-1,1])path(chassis,[[67,23.5,5],[53,24,s*12],[0,24,s*12],[-28,22,s*12]],.075,'blue','brakes','hydraulic_hardline');
 for(const x of [-54,54])for(const s of [-1,1]){box(chassis,[x,25,s*7],[8,2,5],'buy','controller','KLS4830S_envelope');for(let n=0;n<8;n++)box(chassis,[x,26.1,s*7+(n-3.5)*.5],[7.5,.35,.16],'black','controller','heatsink_fin')}
 cyl(chassis,[-7,26.5,0],3,13,'x','buy','air','two_gallon_tank');for(const x of [-13,0])cyl(chassis,[x,26.5,0],2.6,.5,'x','bright','air','tank_end');
 box(chassis,[8,26,0],[8,4,5],'black','air','compressor');box(chassis,[18,25,0],[5,2,6],'buy','air','four_corner_manifold');
 anchors.controller=V([-54,28,-7]);anchors.steering=V([25,cfg.tireD/2+3-q.k,0]);anchors.controls=V([72,44-q.k,8]);anchors.air=V([-7,30-q.k,0]);
 if(input.mode==='corner'){
  chassis.visible=false;for(const cg of cornerGroups)cg.visible=cg.name==='FRONT_LEFT';
  for(const m of g.children)if(!cornerGroups.includes(m)&&m!==chassis)m.visible=false;
  for(const key of Object.keys(anchors))if(!['motor','knuckle','spring','wheel','brakes'].includes(key))delete anchors[key];
  anchors.motor.z+=5*(input.explode||0)/100;anchors.wheel.z+=18*(input.explode||0)/100;
 }
 if(input.hideTires)g.traverse(o=>{if(o.name.startsWith('tire_casing')||o.name.startsWith('turf_tread'))o.visible=false});
 if(input.hideBattery)battery.visible=false;
 g.updateMatrixWorld(true);
 // Sample tire volume vs rail and receiver boxes. A limited interference screen, not certification.
 let clashes=new Set();for(const w of wheels){const R=cfg.tireD/2;for(const b of collisionBoxes){const bb=new T.Box3().setFromObject(b);let hit=false;for(let n=0;n<96&&!hit;n++)for(const rr of [.55,.72,.88,1])for(const zw of [-.5,-.25,0,.25,.5]){const a=n*Math.PI/48,p=V([R*rr*Math.cos(a),R*rr*Math.sin(a),cfg.tireW*zw]).applyMatrix4(w.tire.matrixWorld);if(bb.containsPoint(p)){hit=true;break}}if(hit)clashes.add(b.userData.part)}}
 q.clashes=[...clashes];q.parts=seq;
 return{group:g,anchors,metrics:q,parts,cfg};
}
function obj(g){let text='# Art car drivetrain: meters, Y up; conceptual geometry\nmtllib drivetrain.mtl\n',offset=1;const materials=new Map();g.updateMatrixWorld(true);g.traverse(m=>{if(!m.isMesh)return;let p=m;while(p){if(!p.visible)return;p=p.parent}const a=m.geometry.attributes.position;if(!a)return;const c=m.material.color,id='mat_'+c.getHexString();materials.set(id,c);text+='o '+m.name+'\nusemtl '+id+'\n';for(let i=0;i<a.count;i++){let v=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m.matrixWorld).multiplyScalar(.0254);text+=`v ${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}\n`}const ix=m.geometry.index;if(ix){for(let i=0;i<ix.count;i+=3)text+=`f ${offset+ix.getX(i)} ${offset+ix.getX(i+1)} ${offset+ix.getX(i+2)}\n`}else for(let i=0;i<a.count;i+=3)text+=`f ${offset+i} ${offset+i+1} ${offset+i+2}\n`;offset+=a.count});let mtl='';for(const [id,c] of materials)mtl+=`newmtl ${id}\nKd ${c.r.toFixed(4)} ${c.g.toFixed(4)} ${c.b.toFixed(4)}\nKs 0.15 0.15 0.15\nNs 25\n\n`;return{obj:text,mtl};}
return{cfg,parts,build,state,obj,solveAngle,rodLength,steeringPoint,rackPoint};
});
