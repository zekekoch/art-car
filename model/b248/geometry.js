/* Deliberately schematic donor internals; exact mounting locations are unmeasured. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../drivetrain/three.min.js'),require('./config.js'));else root.B248Geometry=factory(root.THREE,root.B248);})(this,function(T,B){
'use strict';
function build(opts={}){
 const o=B.options(opts),c={...B.cfg,...B.dimensions(o)},group=new T.Group(),anchors={},mats={};
 const palette={donor:0x477d78,carrier:0xc78d43,tire:0x303a3c,hub:0xc2c9c6,pod:0x965f50,cushion:0xe1ccb0,guard:0xd5c6ae,roof:0xd6d1b9,solar:0x304f68,blue:0x658ea4,orange:0xc87b5b,battery:0x658775,ghost:0xaaa9a2};
 for(const [k,color] of Object.entries(palette))mats[k]=new T.MeshStandardMaterial({color,roughness:.72,metalness:k==='carrier'?.25:.08,transparent:k==='ghost',opacity:k==='ghost'?.22:1});
 function mesh(name,g,mat,pos,parent=group){const m=new T.Mesh(g,mats[mat]);m.name=name;m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function box(name,x,y,z,l,h,w,mat,parent){return mesh(name,new T.BoxGeometry(l,h,w),mat,[x,y,z],parent);}
 function cyl(name,x,y,z,r,h,mat,axis='y',parent){const m=mesh(name,new T.CylinderGeometry(r,r,h,24),mat,[x,y,z],parent);if(axis==='z')m.rotation.x=Math.PI/2;if(axis==='x')m.rotation.z=Math.PI/2;return m;}
 function beam(name,a,b,r,mat,parent){const A=new T.Vector3(...a),C=new T.Vector3(...b),v=C.clone().sub(A),m=mesh(name,new T.CylinderGeometry(r,r,v.length(),10),mat,A.clone().add(C).multiplyScalar(.5).toArray(),parent);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());return m;}
 function slab(name,pts,y,h,mat,parent){const sh=new T.Shape();pts.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z));sh.closePath();const geo=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false});geo.rotateX(-Math.PI/2);return mesh(name,geo,mat,[0,y,0],parent);}
 const donor=new T.Group();donor.name='OEM_RUNNING_GEAR_ENVELOPES';group.add(donor);
 const front=o.axleMid+c.wheelbase/2,rear=o.axleMid-c.wheelbase/2;
 // The teal rails are a unitized-body envelope, not a drawing of factory rail sections.
 if(o.layout==='stock')for(const z of [-20.5,20.5])box('OEM_body_envelope',0,19,z,121,8,4,'donor',donor);
 if(o.layout==='stock')box('OEM_rear_deck',-22.875,24.5,0,75.25,1,41.25,'donor',donor);
 if(o.layout==='stock')box('OEM_front_floor_envelope',37,12,0,45,1.5,41.25,'donor',donor);
 for(const x of [rear,front]){
  cyl(x===rear?'Rear_GT_transaxle':'Front_beam_axle',x,9,0,1.7,o.track,'donor','z',donor);
  for(const s of [-1,1]){
   cyl('OEM_pneumatic_tire_placeholder',x,9,s*o.track/2,9,5.7,'tire','z',donor);
   cyl('OEM_wheel',x,9,s*(o.track/2+2.9),4.2,.5,'hub','z',donor);
   cyl('OEM_brake_envelope',x,9,s*(o.track/2-3),3.3,.6,'hub','z',donor);
   for(let leaf=0;leaf<4;leaf++)box('Leaf_spring_envelope',x,11.5+leaf*.3,s*14,24-leaf*3,.27,2,'donor',donor);
  }
 }
 box('GT_differential_envelope',rear,10,0,9,8,10,'donor',donor);
 cyl('OEM_AC_motor_envelope',rear+10,11,0,4.5,13,'donor','x',donor);
 for(const x of [-10,1,12,23])for(const z of [-7,7])box('Existing_6V_battery_envelope',x,17,z,10,10,12,'battery',donor);
 anchors.donor=[rear,13,0];anchors.battery=[0,23,0];
 const carrier=new T.Group();carrier.name='NEW_CARRIER_LAYOUT_NOT_MEMBER_SIZES';group.add(carrier);
 for(const z of [-25,25])box('New_carrier_perimeter',0,27.5,z,c.length,4,2,'carrier',carrier);
 for(const x of [-59.5,-46,-20,20,46,59.5])box('New_carrier_crossmember',x,27.5,0,2,4,50,'carrier',carrier);
 // Service panels stop short of the battery lid. These are layout panels, no specified material.
 for(const x of [-43,43])box('Removable_walkway_panel',x,29.75,0,31,.5,48,'guard',carrier);
 anchors.carrier=[-46,28,25];
 if(o.layout==='transplant'){for(const x of [rear,front])for(const z of [-14,14])for(const dx of [-12,12])box('Spring_hanger_envelope_unselected',x+dx,19,z,2,14,3,'carrier',carrier);box('Battery_cradle_envelope',6.5,11.5,0,46,1,30,'carrier',carrier);for(const x of [-15,28])for(const z of [-15,15])box('Battery_cradle_hanger',x,19,z,1,14,1,'carrier',carrier);}
 const superstructure=new T.Group();superstructure.name='DEMOUNTABLE_ART';group.add(superstructure);
 for(const p of B.pods()){
  const local=new T.Group();local.name='POD_'+p.id;superstructure.add(local);
  if(opts.pods!==false){
   slab('Pod_floor',B.outline(p),c.floor-.5,.5,'pod',local);
   const arc=[];for(let i=0;i<=32;i++){const a=p.dir-Math.PI/2+i*Math.PI/32;arc.push([p.x+p.r*Math.cos(a),p.z+p.r*Math.sin(a)]);}
   const wall=arc.concat(arc.slice().reverse().map(([x,z])=>[p.x+(x-p.x)*(p.r-1)/p.r,p.z+(z-p.z)*(p.r-1)/p.r]));
   slab('Lit_low_wall',wall,c.floor,25,'pod',local);
   const seat=[];for(let i=0;i<=32;i++){const a=p.dir-Math.PI/2+i*Math.PI/32;seat.push([p.x+(p.r-2)*Math.cos(a),p.z+(p.r-2)*Math.sin(a)]);}for(let i=32;i>=0;i--){const a=p.dir-Math.PI/2+i*Math.PI/32;seat.push([p.x+6*Math.cos(a),p.z+6*Math.sin(a)]);}slab('Loveseat_cushion',seat,c.floor+14,3,'cushion',local);
   // A separate raised guard preserves the low padded wall. Its construction is unresolved.
   for(let i=0;i<arc.length-1;i++)beam('Guard_rail_proposal',[arc[i][0],c.floor+36,arc[i][1]],[arc[i+1][0],c.floor+36,arc[i+1][1]],.55,'guard',local);
   for(let i=0;i<arc.length;i+=8)beam('Guard_upright',[arc[i][0],c.floor+25,arc[i][1]],[arc[i][0],c.floor+36,arc[i][1]],.5,'guard',local);
   for(const s of [-1,1]){const a=B.point(p,0,s*p.r),b=B.point(p,-p.leg,s*p.r);beam('Console_top',[a.x,c.floor+25,a.z],[b.x,c.floor+25,b.z],1.1,'cushion',local);}
  }
  // Two sleeve axes, schematic only. Mounting nodes must be tied into verified donor structure.
  for(const s of [-1,1]){
   if(p.z){box('Receiver_sleeve',p.x+s*14,27.5,Math.sign(p.z)*20,2.5,3.5,14,'carrier',carrier);if(opts.pods!==false)box('Removable_arm',p.x+s*14,27.5,Math.sign(p.z)*33,2,3,26,'carrier',local);}
   else {const end=p.driver?1:-1;box('End_receiver_sleeve',end*52,27.5,s*14,17,3.5,2.5,'carrier',carrier);if(opts.pods!==false)box('End_removable_arm',end*68,27.5,s*14,35,3,2,'carrier',local);}
  }
  if(opts.riders!==false&&opts.pods!==false&&B.active(o.caseName,p))for(const s of [-1,1]){const q=B.point(p,15,s*8),mat=s<0?'blue':'orange';cyl('Occupant_torso',q.x,c.floor+25,q.z,4,15,mat,'y',local);mesh('Occupant_head',new T.SphereGeometry(3.6,16,12),mat,[q.x,c.floor+37,q.z],local);}
 }
 const driver=B.pods()[5];
 if(opts.pods!==false){
  const hand=[driver.x+10,c.floor+28,9];beam('Proposed_column',[driver.x+4,c.floor,9],hand,.65,'carrier',superstructure);
  const wheel=mesh('Steering_wheel',new T.TorusGeometry(6.5,.65,10,36),'tire',hand,superstructure);wheel.rotation.x=-Math.PI/3;
  box('Service_brake_pedal_proposal',driver.x+10,c.floor+3,3,4,1,3,'donor',superstructure);box('Throttle_pedal_proposal',driver.x+10,c.floor+3,12,4,1,3,'donor',superstructure);
  const path=[[front,16,9],[50,22,9],[driver.x+4,c.floor,9]];for(let i=0;i<path.length-1;i++)beam('Control_route_NOT_a_linkage_solution',path[i],path[i+1],.4,'carrier',superstructure);
 }
 anchors.controls=[driver.x+10,c.floor+28,9];
 if(opts.ghost&&o.layout==='stock'){box('Original_driver_seat_reference',21,35,0,18,4,40,'ghost');box('Original_seat_back_reference',13,43,0,3,16,40,'ghost');box('Original_cowl_reference',51,27,0,15,28,41,'ghost');}
 if(opts.pods!==false){
  for(const s of [-1,1])for(let i=1;i<=3;i++)box('Boarding_tread',0,i*c.floor/4,s*(26+9*(3.5-i)),16,1,9,'carrier',superstructure);
  for(const [x,l] of [[-31,37],[25,26]]){box('Ottoman_storage',x,c.floor+7,0,l,14,12,'pod',superstructure);box('Ottoman_cushion',x,c.floor+15,0,l,2,12,'cushion',superstructure);}
 }
 const roof=new T.Group();roof.name='SIX_LEAVES_EIGHT_SYMMETRIC_POSTS';superstructure.add(roof);
 if(opts.roof!==false&&opts.pods!==false){
  for(const x of c.roofPostXs)for(const z of [-18,18]){box('Roof_post',x,(c.floor+106)/2,z,1.5,106-c.floor,1.5,'guard',roof);}
  for(const x of c.roofPostXs)box('Roof_cross_tie',x,105,0,1.5,2,40,'guard',roof);
  for(const z of [-18,18])box('Roof_longitudinal_tie',0,105,z,156,2,1.5,'guard',roof);
  for(const p of B.roofLeaves()){
   const x=p.x,z=p.z;cyl('Roof_leaf',x,107,z,32,2,'roof','y',roof);
   // Panel size is the repository allowance (41 x 21), not a confirmed purchased panel.
   for(const s of [-1,1]){box('100W_panel_allowance',x,108.3,z+s*10.75,41,.25,21,'solar',roof);for(let n=-3;n<=3;n++)box('Panel_cell_line',x+n*5,108.45,z+s*10.75,.12,.05,20,'hub',roof);}
  }
 }
 anchors.roof=[-50,108,18];
 if(opts.transport){superstructure.visible=false;
  box('Trailer_floor_reference',0,-1,0,143,1.5,72,'ghost');
  for(const z of [-36,36]){box('Trailer_30in_rail',0,30,z,143,1.5,1.5,'carrier');for(const x of [-70,0,70])box('Trailer_stanchion',x,15,z,1.5,30,1.5,'carrier');}
  for(const z of [-28.5,28.5])box('57in_loading_opening',73,10,z,1,20,1,'orange');
 }
 if(opts.cg){const q=B.loads(o);mesh('Illustrative_CG',new T.SphereGeometry(2.5,16,16),'orange',[q.cg.x,q.cg.y,q.cg.z]);}
 return {group,anchors,metrics:B.loads(o)};
}
return {build};
});
