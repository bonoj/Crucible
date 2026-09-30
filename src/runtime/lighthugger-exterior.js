export function createLighthuggerExterior({THREE,scene}){
  const root=new THREE.Group();root.name="lighthugger-exterior";
  // Horizontal over the Continuity Station: monumental enough to read, small enough to share Crucible.
  root.position.set(-1.2,13.0,-1.2);root.rotation.z=Math.PI/2;scene.add(root);

  const hull=new THREE.MeshStandardMaterial({color:0x3b3934,roughness:.58,metalness:.72}),
    brass=new THREE.MeshStandardMaterial({color:0x8f6333,roughness:.43,metalness:.78}),
    recess=new THREE.MeshStandardMaterial({color:0x111517,roughness:.78,metalness:.46}),
    warm=new THREE.MeshBasicMaterial({color:0xffb15a}),
    cool=new THREE.MeshStandardMaterial({color:0x334a50,roughness:.48,metalness:.7});
  const length=10.8,outer=1.75,inner=1.03;
  // Eight longitudinal hull slabs leave both ends visibly cored.
  for(let i=0;i<8;i++){
    const a=Math.PI/8+i*Math.PI/4;
    const slab=new THREE.Mesh(new THREE.BoxGeometry(.56,length,1.18),hull);
    slab.position.set(Math.sin(a)*1.38,0,Math.cos(a)*1.38);slab.rotation.y=a;slab.castShadow=true;root.add(slab);
  }
  // Dark inner barrel makes the hollow section legible.
  const core=new THREE.Mesh(new THREE.CylinderGeometry(inner,inner,length+.04,8,1,true,Math.PI/8),recess);core.material.side=THREE.BackSide;root.add(core);
  // Structural octagonal collars.
  for(const y of [-length*.48,-length*.29,0,length*.29,length*.48]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.78,.075,4,8),brass);ring.rotation.x=Math.PI/2;ring.rotation.z=Math.PI/8;ring.position.y=y;root.add(ring);
  }
  // Ordered service arrays: repeated modules, not noise soup.
  const boxGeo=new THREE.BoxGeometry(.24,.42,.18),windowGeo=new THREE.BoxGeometry(.12,.16,.055);
  for(const side of [-1,1]){
    for(let row=0;row<3;row++)for(let j=0;j<9;j++){
      const y=-4.25+j*1.05+(row%2)*.18,a=(side>0?Math.PI*.5:-Math.PI*.5)+row*.16;
      const m=new THREE.Mesh(boxGeo,j%3===0?brass:cool);m.position.set(Math.sin(a)*(1.82+row*.06),y,Math.cos(a)*(1.82+row*.06));m.rotation.y=a;m.castShadow=true;root.add(m);
    }
  }
  // Warm windows sit barely proud of four hull faces.
  for(const face of [0,2,4,6]){const a=Math.PI/8+face*Math.PI/4;for(let j=0;j<8;j++){
    const w=new THREE.Mesh(windowGeo,warm);w.position.set(Math.sin(a)*1.985,-3.75+j*1.05,Math.cos(a)*1.985);w.rotation.y=a;root.add(w);
  }}
  // Long rails and small antenna forests establish comprehensible machinery bands.
  const railGeo=new THREE.CylinderGeometry(.025,.025,length*.78,5);
  for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5]){const rail=new THREE.Mesh(railGeo,brass);rail.position.set(Math.sin(a)*2.02,0,Math.cos(a)*2.02);root.add(rail);}
  // End-cap spars around the open throat.
  for(const end of [-1,1])for(let i=0;i<8;i++){
    const a=Math.PI/8+i*Math.PI/4;
    const radial=new THREE.Vector3(Math.sin(a),0,Math.cos(a));
    const inward=new THREE.Vector3(0,-end,0);
    const dir=radial.clone().multiplyScalar(-.86).add(inward.multiplyScalar(.52)).normalize();
    const toothLength=.62;
    const b=new THREE.Mesh(new THREE.CylinderGeometry(.035,.065,toothLength,5),brass);
    b.position.copy(radial).multiplyScalar(1.62);b.position.y=end*length*.535;
    b.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
    root.add(b);
  }
  root.traverse(o=>{if(o.isMesh)o.userData.lighthuggerExterior=true});
  return{object:root,inspect:()=>({kind:"lighthugger-exterior",shape:"horizontal cored octagonal vessel",length,outerRadius:outer,innerRadius:inner,entryTarget:true})};
}
