export function createSupportSystem({world,components,THREE,terrain}){
  const {Transform,Body,Support}=components;
  const local=new THREE.Vector3(),worldPoint=new THREE.Vector3();
  function sphereContact(t,b){
    const h=terrain.groundHeight(t.position.x,t.position.z);if(!Number.isFinite(h))return false;
    const r=b.radius??.2,penetration=h-(t.position.y-r);if(penetration<=0)return false;
    t.position.y+=penetration;return true;
  }
  function boxContact(t,b){
    const e=b.halfExtents,points=[[-1,-1],[-1,1],[1,-1],[1,1],[0,0]],contacts=[];let deepest=0;
    for(const[sx,sz]of points){local.set(sx*e.x,-e.y,sz*e.z).applyEuler(t.rotation);worldPoint.copy(t.position).add(local);const h=terrain.groundHeight(worldPoint.x,worldPoint.z);if(!Number.isFinite(h))continue;const p=h-worldPoint.y;if(p>0){deepest=Math.max(deepest,p);contacts.push({x:worldPoint.x,z:worldPoint.z,h});}}
    if(!contacts.length)return false;t.position.y+=deepest;
    if(contacts.length>=2){let sx=0,sz=0,sxx=0,szz=0,sxz=0,sy=0,sxy=0,szy=0,n=contacts.length;for(const p of contacts){sx+=p.x;sz+=p.z;sy+=p.h;sxx+=p.x*p.x;szz+=p.z*p.z;sxz+=p.x*p.z;sxy+=p.x*p.h;szy+=p.z*p.h;}const det=(sxx-sx*sx/n)*(szz-sz*sz/n)-(sxz-sx*sz/n)**2;if(Math.abs(det)>1e-6){const A=sxx-sx*sx/n,B=sxz-sx*sz/n,C=szz-sz*sz/n,D=sxy-sx*sy/n,E=szy-sz*sy/n,dx=(D*C-B*E)/det,dz=(A*E-B*D)/det;t.rotation.x=THREE.MathUtils.lerp(t.rotation.x,Math.atan2(dz,1),.18);t.rotation.z=THREE.MathUtils.lerp(t.rotation.z,-Math.atan2(dx,1),.18);}}
    return true;
  }
  function update(){
    for(const id of world.query(Transform,Body,Support)){const t=Transform.get(id),b=Body.get(id),s=Support.get(id);let grounded=false;
      if((b.shape??"sphere")==="box")grounded=boxContact(t,b);else grounded=sphereContact(t,b);
      s.grounded=grounded;
      if(grounded&&t.velocity){if(t.velocity.y<0)t.velocity.y=-t.velocity.y*(b.restitution??.1);t.velocity.x*=b.drag??.9;t.velocity.z*=b.drag??.9;if(Math.abs(t.velocity.y)<.08)t.velocity.y=0;if(t.angularVelocity)t.angularVelocity.multiplyScalar(.82);}
    }
  }
  return{update};
}
