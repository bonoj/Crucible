export function createCoupletTrialSystem({world,components,THREE,scene,terrain,field,locus}){
  const {Transform,Body,Gravity,Support,RenderObject,SpatialBounds,Locus}=components;
  const root=new THREE.Group();root.name="clockchain-trial";
  const brass=new THREE.MeshStandardMaterial({color:0x9b6a2f,roughness:.46,metalness:.72}),dark=new THREE.MeshStandardMaterial({color:0x4d3a24,roughness:.55,metalness:.64}),humanMat=new THREE.MeshStandardMaterial({color:0xc9d2d0,roughness:.3,metalness:.78}),modelMat=new THREE.MeshStandardMaterial({color:0xd28a38,roughness:.42,metalness:.55});
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.72,.86,.18,8),dark);base.position.y=.09;root.add(base);
  const rail=new THREE.Mesh(new THREE.BoxGeometry(1.45,.10,.22),brass);rail.position.y=.36;root.add(rail);
  const plunger=new THREE.Mesh(new THREE.CylinderGeometry(.16,.20,.42,10),brass);plunger.position.y=.62;root.add(plunger);
  const px=-3.3,pz=2.7,gy=terrain.groundHeight(px,pz);root.position.set(px,(Number.isFinite(gy)?gy:.15),pz);scene.add(root);
  const tokens=[],specs=[{owner:"human",x:-.48,geo:new THREE.IcosahedronGeometry(.17,1),mat:humanMat},{owner:"model",x:.48,geo:new THREE.OctahedronGeometry(.20,0),mat:modelMat}];
  for(const s of specs){const cup=new THREE.Mesh(new THREE.TorusGeometry(.20,.045,7,18),dark);cup.rotation.x=Math.PI/2;cup.position.set(s.x,.48,0);root.add(cup);const id=world.entity(),mesh=new THREE.Mesh(s.geo,s.mat);mesh.castShadow=true;scene.add(mesh);world.add(id,Transform,{position:new THREE.Vector3(),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true,velocity:new THREE.Vector3()});world.add(id,RenderObject,{object:mesh});world.add(id,Body,{radius:.19,restitution:.42,drag:.97});world.add(id,Gravity,{acceleration:0});world.add(id,Support,{kind:"ground"});world.add(id,SpatialBounds,{kind:"sphere",radius:.20});if(Locus)world.add(id,Locus,{id:locus});const chain=new THREE.Group();scene.add(chain);tokens.push({id,owner:s.owner,localX:s.x,mesh,chain,links:[]});}
  const linkGeo=new THREE.TorusGeometry(.045,.012,5,8),linkMat=brass;
  for(const t of tokens)for(let i=0;i<11;i++){const link=new THREE.Mesh(linkGeo,linkMat);t.chain.add(link);t.links.push(link);}
  let state="parked",winner=null,trialStart=null,settledFor=0,lastFieldNow=0,frontierArmed=false;
  function anchor(t){return new THREE.Vector3(px+t.localX,root.position.y+.54,pz);}
  function park(){for(const t of tokens){const tr=Transform.get(t.id),a=anchor(t);tr.position.copy(a).add(new THREE.Vector3(0,.16,0));tr.velocity.set(0,0,0);Gravity.get(t.id).acceleration=0;}state="parked";winner=null;trialStart=null;settledFor=0;}
  function hash32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
  function rng(seed){let x=seed||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};}
  function beginTrial(now){if(state!=="parked"||field.draws.length)return false;const seed=hash32(field.clockchainHead());const r=rng(seed);state="trial";trialStart=now;settledFor=0;for(const [i,t] of tokens.entries()){const tr=Transform.get(t.id),a=anchor(t),side=i===0?-1:1,angle=(r()-.5)*1.0,speed=2.0+r()*1.35;tr.position.copy(a).add(new THREE.Vector3(0,.18,0));tr.velocity.set(side*speed*Math.cos(angle),3.1+r()*1.25,speed*Math.sin(angle));Gravity.get(t.id).acceleration=-8.5;}return true;}
  function chainLimit(t){const tr=Transform.get(t.id),a=anchor(t),delta=tr.position.clone().sub(a),max=1.55,d=delta.length();if(d>max){const n=delta.multiplyScalar(1/d);tr.position.copy(a).addScaledVector(n,max);const radial=tr.velocity.dot(n);if(radial>0)tr.velocity.addScaledVector(n,-radial);}}
  function resolve(now){const scored=tokens.map(t=>{const p=Transform.get(t.id).position,a=anchor(t);return{owner:t.owner,distance:p.distanceTo(a)}}).sort((a,b)=>b.distance-a.distance);winner=scored[0].owner;field.recordDraw({owner:winner,method:"clockchain-chained-trial",at:now,seed:hash32(field.clockchainHead()),distances:Object.fromEntries(scored.map(x=>[x.owner,Number(x.distance.toFixed(3))]))});state="resolved";}
  function updateChains(){for(const t of tokens){const a=anchor(t),p=Transform.get(t.id).position;for(let i=0;i<t.links.length;i++){const q=(i+1)/(t.links.length+1),link=t.links[i];link.position.lerpVectors(a,p,q);link.rotation.set(Math.PI/2,i%2?Math.PI/2:0,0);}}}
  function update(fieldNow,dt){lastFieldNow=fieldNow;const frontier=field.frontier();if(state==="parked"&&!field.draws.length&&fieldNow>=frontier&&!frontierArmed)frontierArmed=true;
    if(state==="trial"){let quiet=true;for(const t of tokens){chainLimit(t);const tr=Transform.get(t.id);if(tr.velocity.lengthSq()>.06)quiet=false;}settledFor=quiet?settledFor+dt:0;if(settledFor>.7||fieldNow-trialStart>6500)resolve(fieldNow);}
    if(state==="resolved"){for(const t of tokens){const tr=Transform.get(t.id),a=anchor(t);if(t.owner===winner){Gravity.get(t.id).acceleration=-8.5;tr.velocity.y+=12.2*dt;tr.velocity.multiplyScalar(Math.pow(.94,dt*60));chainLimit(t);}else{Gravity.get(t.id).acceleration=0;const home=a.clone().add(new THREE.Vector3(0,.16,0));tr.position.lerp(home,Math.min(1,dt*5));tr.velocity.set(0,0,0);}}}
    updateChains();
  }
  function advance(){const frontier=field.frontier();if(lastFieldNow<frontier){field.fastForwardTo(field.nextTurnStart(lastFieldNow));return "fast-forward";}if(state==="parked"&&!field.draws.length){beginTrial(lastFieldNow);frontierArmed=false;return "trial";}return state;}
  function contains(object){return root===object||root.children.includes(object)||root.children.some(c=>c===object);}
  park();updateChains();
  return{object:root,tokens,advance,park,update,contains,inspect:()=>({kind:"clockchain-trial",state,winner,rule:"chained trial; farther excursion wins; winner floats against gravity",clockchainHead:field.clockchainHead(),tokens:tokens.map(t=>{const p=Transform.get(t.id).position;return{owner:t.owner,position:[p.x,p.y,p.z]}})})};
}
