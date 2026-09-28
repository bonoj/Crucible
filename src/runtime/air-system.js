export function createAirSystem({world,components,THREE}){
  const {Transform,Aerodynamic}=components;
  const flow=new THREE.Vector3(),relative=new THREE.Vector3(),normal=new THREE.Vector3(),axis=new THREE.Vector3();
  let gust=new THREE.Vector3(),nextGust=0;
  function update(dt,now){
    if(now>=nextGust){gust.set((Math.random()-.5)*2,Math.random()*.22,(Math.random()-.5)*2);nextGust=now+450+Math.random()*1100;}
    const t=now*.00018;flow.set(Math.sin(t*1.7)*.75,0,Math.cos(t*.91)*.55).add(gust);
    gust.multiplyScalar(Math.pow(.992,dt*60));
    for(const id of world.query(Transform,Aerodynamic)){
      const tr=Transform.get(id),a=Aerodynamic.get(id);if(!tr.velocity)continue;
      relative.copy(flow).sub(tr.velocity);
      normal.set(0,0,1).applyEuler(tr.rotation);
      const facing=Math.abs(normal.dot(relative)/(relative.length()||1));
      tr.velocity.addScaledVector(relative,(a.drag??1.5)*(0.18+facing*.82)*dt);
      tr.velocity.y+=Math.max(0,relative.lengthSq())*(a.lift??.08)*facing*dt;
      if(!tr.angularVelocity)tr.angularVelocity=new THREE.Vector3();
      axis.crossVectors(normal,relative).multiplyScalar((a.torque??.7)*dt);
      tr.angularVelocity.add(axis);
      tr.angularVelocity.multiplyScalar(Math.pow(a.angularDrag??.96,dt*60));
      tr.rotation.x+=tr.angularVelocity.x*dt;tr.rotation.y+=tr.angularVelocity.y*dt;tr.rotation.z+=tr.angularVelocity.z*dt;
    }
  }
  return{update,inspect:()=>({flow:flow.toArray().map(n=>Number(n.toFixed(2))),aerodynamicBodies:world.query(Aerodynamic).length})};
}
