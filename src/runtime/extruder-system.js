export function createExtruderSystem({world,components,THREE,scene,terrain,bearings,locus}){
  const {Transform,Body,Gravity,Support,RenderObject,SpatialBounds,Locus}=components;
  const id=world.entity(),root=new THREE.Group(),
    hullMat=new THREE.MeshStandardMaterial({color:0xcfd3d1,roughness:.58,metalness:.16}),
    hull2Mat=new THREE.MeshStandardMaterial({color:0xaeb6b6,roughness:.62,metalness:.13}),
    darkMat=new THREE.MeshStandardMaterial({color:0x4d5659,roughness:.56,metalness:.28}),
    orangeMat=new THREE.MeshStandardMaterial({color:0xd8782c,roughness:.48,metalness:.20}),
    windowMat=new THREE.MeshStandardMaterial({color:0xffc66e,emissive:0xffa33a,emissiveIntensity:1.15,roughness:.40,metalness:0});
  function box(size,pos,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(size.x,size.y,size.z),mat);m.position.copy(pos);m.castShadow=true;root.add(m);return m;}
  const chassis=box(new THREE.Vector3(.78,.30,.48),new THREE.Vector3(0,0,0),hullMat);
  box(new THREE.Vector3(.46,.16,.38),new THREE.Vector3(-.05,.20,0),hull2Mat);
  box(new THREE.Vector3(.18,.08,.40),new THREE.Vector3(-.27,-.17,0),darkMat);
  box(new THREE.Vector3(.18,.08,.40),new THREE.Vector3(.27,-.17,0),darkMat);
  box(new THREE.Vector3(.025,.075,.24),new THREE.Vector3(.395,.07,0),orangeMat);
  for(const z of [-.11,0,.11])box(new THREE.Vector3(.012,.055,.065),new THREE.Vector3(.401,.21,z),windowMat);
  const cutter=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.58,8),orangeMat);cutter.rotation.z=Math.PI/2;cutter.position.set(.48,-.08,0);cutter.castShadow=true;root.add(cutter);
  root.name="autonomous-extruder";scene.add(root);
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
    t.velocity.x=Math.cos(heading)*speed;t.velocity.z=Math.sin(heading)*speed;root.rotation.y=-heading;root.rotation.y+=Math.PI/2;cutter.rotation.x=now*.012;
    if(now-lastDig>=720){lastDig=now;const bx=t.position.x-Math.cos(heading)*.34,bz=t.position.z-Math.sin(heading)*.34,gy=terrain.terrainHeight(bx,bz);if(Number.isFinite(gy)){terrain.excavate(new THREE.Vector3(bx,gy,bz),{radius:.58,depth:.24});queueYield(new THREE.Vector3(bx,gy+.12,bz),now);digs++;}}
    emitYield(now);
  }
  return{id,object:root,update,inspect:()=>{const t=Transform.get(id);return{kind:"autonomous-extruder",id,position:t?[t.position.x,t.position.y,t.position.z]:null,heading,digs,producedBearings:produced,pendingEmissions:emissions.length,turns}}};
}
