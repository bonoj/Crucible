export function createCoupletTrialSystem({world,components,THREE,scene,terrain,field,locus}){
  const {Transform,Body,Gravity,Support,RenderObject,SpatialBounds,Locus}=components;
  const root=new THREE.Group();root.name="couplet-trial";
  const brass=new THREE.MeshStandardMaterial({color:0x9b6a2f,roughness:.46,metalness:.72}),
    dark=new THREE.MeshStandardMaterial({color:0x4d3a24,roughness:.55,metalness:.64}),
    humanMat=new THREE.MeshStandardMaterial({color:0xc9d2d0,roughness:.3,metalness:.78}),
    modelMat=new THREE.MeshStandardMaterial({color:0xd28a38,roughness:.42,metalness:.55});
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.72,.86,.18,8),dark);base.position.y=.09;root.add(base);
  const rail=new THREE.Mesh(new THREE.BoxGeometry(1.45,.10,.22),brass);rail.position.y=.36;root.add(rail);
  const plunger=new THREE.Mesh(new THREE.CylinderGeometry(.16,.20,.42,10),brass);plunger.position.y=.62;root.add(plunger);
  for(const x of [-.48,.48]){const cup=new THREE.Mesh(new THREE.TorusGeometry(.18,.045,7,18),dark);cup.rotation.x=Math.PI/2;cup.position.set(x,.48,0);root.add(cup);}
  const px=-3.3,pz=2.7,gy=terrain.groundHeight(px,pz);root.position.set(px,(Number.isFinite(gy)?gy:.15),pz);scene.add(root);
  const tokens=[],specs=[
    {owner:"human",x:-.48,geo:new THREE.IcosahedronGeometry(.17,1),mat:humanMat},
    {owner:"model",x:.48,geo:new THREE.OctahedronGeometry(.20,0),mat:modelMat}
  ];
  for(const s of specs){const id=world.entity(),mesh=new THREE.Mesh(s.geo,s.mat);mesh.castShadow=true;scene.add(mesh);world.add(id,Transform,{position:new THREE.Vector3(),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true,velocity:new THREE.Vector3()});world.add(id,RenderObject,{object:mesh});world.add(id,Body,{radius:.19,restitution:.48,drag:.965});world.add(id,Gravity,{acceleration:0});world.add(id,Support,{kind:"ground"});world.add(id,SpatialBounds,{kind:"sphere",radius:.20});if(Locus)world.add(id,Locus,{id:locus});tokens.push({id,owner:s.owner,localX:s.x,mesh});}
  let state="ready",launchedAt=null,winner=null,lastNow=0,settledFor=0;
  function park(){for(const t of tokens){const tr=Transform.get(t.id);tr.position.set(px+t.localX,root.position.y+.62,pz);tr.velocity.set(0,0,0);Gravity.get(t.id).acceleration=0;}winner=null;state="ready";launchedAt=null;settledFor=0;}
  park();
  function launch(now=lastNow){if(state!=="ready")return false;state="running";launchedAt=now;winner=null;settledFor=0;for(const [i,t] of tokens.entries()){const tr=Transform.get(t.id);Gravity.get(t.id).acceleration=-8.5;const side=i===0?-1:1,angle=(Math.random()-.5)*.55,speed=4.5+Math.random()*1.8;tr.velocity.set(side*speed*Math.cos(angle),5.2+Math.random()*1.8,speed*Math.sin(angle));tr.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);}return true;}
  function update(now,dt){lastNow=now;if(state!=="running")return;let quiet=true;for(const t of tokens){const tr=Transform.get(t.id);t.mesh.rotation.x+=dt*5;t.mesh.rotation.z+=dt*3;if(tr.velocity.lengthSq()>.045)quiet=false;}settledFor=quiet?settledFor+dt:0;if(settledFor>.85||now-launchedAt>9000){const scored=tokens.map(t=>{const p=Transform.get(t.id).position;return{owner:t.owner,distance:Math.hypot(p.x-px,p.z-pz)}}).sort((a,b)=>b.distance-a.distance);winner=scored[0].owner;state="resolved";field.recordDraw?.({owner:winner,method:"world-trial-farthest",at:now,distances:Object.fromEntries(scored.map(x=>[x.owner,Number(x.distance.toFixed(3))]))});}}
  function contains(object){return root===object||root.children.includes(object)||root.children.some(c=>c===object||c.children?.includes(object));}
  return{object:root,tokens,launch,park,update,contains,inspect:()=>({kind:"couplet-trial",state,winner,rule:"farthest-from-machine-wins",position:[px,root.position.y,pz],tokens:tokens.map(t=>{const p=Transform.get(t.id).position;return{owner:t.owner,position:[p.x,p.y,p.z],distance:Number(Math.hypot(p.x-px,p.z-pz).toFixed(3))}})})};
}
