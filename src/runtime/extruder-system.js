export function createExtruderSystem({world,components,THREE,scene,terrain,bearings,locus}){
  const {Transform,Body,Gravity,Support,RenderObject,SpatialBounds,Locus}=components;
  const id=world.entity(),root=new THREE.Group(),bodyMat=new THREE.MeshStandardMaterial({color:0x66706b,roughness:.62,metalness:.34}),cutMat=new THREE.MeshStandardMaterial({color:0xc27b36,roughness:.38,metalness:.58});
  const chassis=new THREE.Mesh(new THREE.BoxGeometry(.72,.34,.5),bodyMat),cutter=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.58,8),cutMat);cutter.rotation.z=Math.PI/2;cutter.position.set(.38,-.08,0);chassis.castShadow=true;cutter.castShadow=true;root.add(chassis,cutter);root.name="autonomous-extruder";scene.add(root);
  const startY=terrain.groundHeight(-4.8,-2.6);world.add(id,Transform,{position:new THREE.Vector3(-4.8,(Number.isFinite(startY)?startY:.15)+.3,-2.6),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true,velocity:new THREE.Vector3()});world.add(id,RenderObject,{object:root});world.add(id,Body,{radius:.31,restitution:.08,drag:.94});world.add(id,Gravity,{acceleration:-8.5});world.add(id,Support,{kind:"ground"});world.add(id,SpatialBounds,{kind:"sphere",radius:.42});if(Locus)world.add(id,Locus,{id:locus});
  let heading=.31,lastDig=-Infinity,lastNow=null,digs=0,produced=0,turns=0,emissionSequence=0;
  const emissions=[];
  function queueYield(position,now){
    const durations=[1000,2000,3000],duration=durations[emissionSequence++%durations.length],total=48;
    emissions.push({position:position.clone(),startedAt:now,duration,total,emitted:0});
  }
  function emitYield(now){
    for(let i=emissions.length-1;i>=0;i--){const e=emissions[i],progress=THREE.MathUtils.clamp((now-e.startedAt)/e.duration,0,1),target=Math.floor(e.total*progress),due=target-e.emitted;
      if(due>0){for(let n=0;n<due;n++){const angle=(e.emitted+n)*2.399963229728653,r=.04+.09*((e.emitted+n)%5)/4,point=new THREE.Vector3(e.position.x+Math.cos(angle)*r,e.position.y,e.position.z+Math.sin(angle)*r);produced+=bearings.spawnBatch(1,point);}e.emitted+=due;}
      if(progress>=1&&e.emitted>=e.total)emissions.splice(i,1);
    }
  }
  function update(now){const t=Transform.get(id);if(!t)return;const dt=lastNow==null?0:Math.min(.1,Math.max(0,(now-lastNow)/1000));lastNow=now;
    const speed=.72,probe=1.05;heading+=.11*dt;let px=t.position.x+Math.cos(heading)*probe,pz=t.position.z+Math.sin(heading)*probe;
    if(!terrain.insideMaterial(px,pz)){heading+=2.18;turns++;px=t.position.x+Math.cos(heading)*probe;pz=t.position.z+Math.sin(heading)*probe;}
    t.velocity.x=Math.cos(heading)*speed;t.velocity.z=Math.sin(heading)*speed;root.rotation.y=-heading;root.children[1].rotation.x=now*.012;
    if(now-lastDig>=720){lastDig=now;const bx=t.position.x-Math.cos(heading)*.34,bz=t.position.z-Math.sin(heading)*.34,gy=terrain.terrainHeight(bx,bz);if(Number.isFinite(gy)){terrain.excavate(new THREE.Vector3(bx,gy,bz),{radius:.58,depth:.24});queueYield(new THREE.Vector3(bx,gy+.12,bz),now);digs++;}}
    emitYield(now);
  }
  return{id,object:root,update,inspect:()=>{const t=Transform.get(id);return{kind:"autonomous-extruder",id,position:t?[t.position.x,t.position.y,t.position.z]:null,heading,digs,producedBearings:produced,pendingEmissions:emissions.length,turns}}};
}
