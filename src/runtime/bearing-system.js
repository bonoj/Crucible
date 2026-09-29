export function createBearingSystem({world,components,THREE,scene,terrain,locus,maxBearings=180000}){
  const BALL_R=.22,PG=96;
  const bx=new Float32Array(maxBearings),by=new Float32Array(maxBearings),bz=new Float32Array(maxBearings);
  const bvx=new Float32Array(maxBearings),bvy=new Float32Array(maxBearings),bvz=new Float32Array(maxBearings);
  let count=0;
  const pile=new Uint16Array(PG*PG),dummy=new THREE.Object3D();
  const geometry=new THREE.IcosahedronGeometry(BALL_R,0),material=new THREE.MeshStandardMaterial({color:0xc7d0d0,metalness:.82,roughness:.24});
  const mesh=new THREE.InstancedMesh(geometry,material,maxBearings);mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;mesh.count=0;scene.add(mesh);
  const entity=world.entity();
  if(components.Locus)world.add(entity,components.Locus,{id:locus});
  // Batch bounds are intentionally absent: one batch must not masquerade as one occupant.
  function pileIndex(x,z){const span=20,ix=THREE.MathUtils.clamp(Math.floor((x+10)/span*PG),0,PG-1),iz=THREE.MathUtils.clamp(Math.floor((z+10)/span*PG),0,PG-1);return ix+PG*iz}
  function spawnBatch(n=25000,center=new THREE.Vector3(0,3.5,0)){
    const available=Math.min(n,maxBearings-count),cols=Math.max(3,Math.ceil(Math.cbrt(available)*1.45)),spacing=BALL_R*2.08,baseY=center.y+BALL_R+1;
    for(let n=0;n<available;n++){const i=count++,ix=n%cols,iz=Math.floor(n/cols)%cols,iy=Math.floor(n/(cols*cols));bx[i]=center.x+(ix-(cols-1)/2)*spacing+(Math.random()-.5)*.05;bz[i]=center.z+(iz-(cols-1)/2)*spacing+(Math.random()-.5)*.05;by[i]=baseY+iy*spacing+(Math.random()-.5)*.05;bvx[i]=(Math.random()-.5)*.15;bvy[i]=0;bvz[i]=(Math.random()-.5)*.15}
    return available;
  }
  const contact={x:0,y:0,z:0,vx:0,vy:0,vz:0};
  function update(dt){
    pile.fill(0);const g=-8.5;let rendered=0;
    for(let i=0;i<count;i++){
      bvy[i]+=g*dt;bvx[i]*=.998;bvz[i]*=.998;bx[i]+=bvx[i]*dt;by[i]+=bvy[i]*dt;bz[i]+=bvz[i]*dt;
      contact.x=bx[i];contact.y=by[i];contact.z=bz[i];contact.vx=bvx[i];contact.vy=bvy[i];contact.vz=bvz[i];terrain.collideBearingState(contact,BALL_R,.28,.86);bx[i]=contact.x;by[i]=contact.y;bz[i]=contact.z;bvx[i]=contact.vx;bvy[i]=contact.vy;bvz[i]=contact.vz;
      const gh=terrain.groundHeight(bx[i],bz[i]);if(Number.isFinite(gh)){const stack=Math.min(28,pile[pileIndex(bx[i],bz[i])]++)*BALL_R*.34,floor=gh+BALL_R+stack;if(by[i]<floor){by[i]=floor;bvy[i]=Math.abs(bvy[i])*.13;bvx[i]*=.82;bvz[i]*=.82;const eps=.7,hx=terrain.groundHeight(bx[i]+eps,bz[i])-terrain.groundHeight(bx[i]-eps,bz[i]),hz=terrain.groundHeight(bx[i],bz[i]+eps)-terrain.groundHeight(bx[i],bz[i]-eps);if(Number.isFinite(hx))bvx[i]-=hx*.08;if(Number.isFinite(hz))bvz[i]-=hz*.08}}
      dummy.position.set(bx[i],by[i],bz[i]);dummy.rotation.set(0,0,0);dummy.scale.setScalar(1);dummy.updateMatrix();mesh.setMatrixAt(rendered++,dummy.matrix);
    }
    mesh.count=rendered;mesh.instanceMatrix.needsUpdate=true;
  }
  return{entity,mesh,spawnBatch,update,inspect:()=>({kind:"foundry-bearing-batch",count,maxBearings,radius:BALL_R,rendered:mesh.count})};
}
