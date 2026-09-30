export function createLighthuggerExterior({THREE,scene}){
  const root=new THREE.Group();root.name="lighthugger-exterior";root.position.set(-1.2,13.0,-1.2);root.rotation.z=Math.PI/2;scene.add(root);
  const hull=new THREE.MeshStandardMaterial({color:0x3b3934,roughness:.58,metalness:.72}),brass=new THREE.MeshStandardMaterial({color:0x8f6333,roughness:.43,metalness:.78}),recess=new THREE.MeshStandardMaterial({color:0x111517,roughness:.78,metalness:.46}),warm=new THREE.MeshBasicMaterial({color:0xffb15a}),cool=new THREE.MeshStandardMaterial({color:0x334a50,roughness:.48,metalness:.7});
  const length=10.8,outer=1.75,inner=1.03;
  const fixed=new THREE.Group(),greebles=new THREE.Group();root.add(fixed,greebles);
  const tag=o=>o.traverse(x=>{if(x.isMesh)x.userData.lighthuggerExterior=true});
  for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4,m=new THREE.Mesh(new THREE.BoxGeometry(.56,length,1.18),hull);m.position.set(Math.sin(a)*1.38,0,Math.cos(a)*1.38);m.rotation.y=a;m.castShadow=true;fixed.add(m)}
  const core=new THREE.Mesh(new THREE.CylinderGeometry(inner,inner,length+.04,8,1,true,Math.PI/8),recess);core.material.side=THREE.BackSide;fixed.add(core);
  for(const y of [-length*.48,-length*.29,0,length*.29,length*.48]){const r=new THREE.Mesh(new THREE.TorusGeometry(1.78,.075,4,8),brass);r.rotation.x=Math.PI/2;r.rotation.z=Math.PI/8;r.position.y=y;fixed.add(r)}
  for(const end of [-1,1])for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4,radial=new THREE.Vector3(Math.sin(a),0,Math.cos(a)),p0=radial.clone().multiplyScalar(1.72);p0.y=end*length*.505;const p1=radial.clone().multiplyScalar(1.13);p1.y=end*(length*.515+.23);const d=p1.clone().sub(p0),mid=p0.clone().add(p1).multiplyScalar(.5),b=new THREE.Mesh(new THREE.BoxGeometry(.08,d.length(),.08),brass);b.position.copy(mid);b.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());fixed.add(b)}
  function rng(seed){return()=>{seed|=0;seed=(seed+0x6D2B79F5)|0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
  function addBox(a,y,r,w,h,d,mat=brass){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(Math.sin(a)*r,y,Math.cos(a)*r);m.rotation.y=a;m.castShadow=true;greebles.add(m)}
  function addRail(a,r=2.02,span=8.4,mat=brass){const m=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,span,5),mat);m.position.set(Math.sin(a)*r,0,Math.cos(a)*r);greebles.add(m)}
  function addMast(a,y,r=2.02,h=.42){const m=new THREE.Mesh(new THREE.CylinderGeometry(.018,.027,h,5),brass);m.position.set(Math.sin(a)*r,y,Math.cos(a)*r);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(Math.sin(a),0,Math.cos(a)));greebles.add(m)}
  function addLight(a,y,r=2.0){addBox(a,y,r,.11,.14,.055,warm)}
  function buildVariant(index){
    greebles.clear();const R=rng(0x51a7+index*7919),letter=String.fromCharCode(65+index),mode=index%6;
    // A is the accepted eight-rail baseline. The rest deliberately span sparse to dense.
    const railCount=index===0?8:[0,2,4,6,8,8][mode];
    for(let i=0;i<railCount;i++){const offset=(index%3)*Math.PI/24;addRail(i*Math.PI/Math.max(1,railCount)*2+offset,1.94+(i%2)*.09,7.0+R()*2.2,i%5===0?cool:brass)}
    const faces=mode===2?[0,2,4,6]:mode===3?[0,1,4,5]:[0,1,2,3,4,5,6,7];
    const boxRows=1+(index%4),density=mode===0?4:mode===5?10:6+(index%3);
    for(const f of faces){const a=Math.PI/8+f*Math.PI/4;for(let j=0;j<density;j++){if(mode===3&&R()<.38)continue;const y=-4.35+j*(8.7/Math.max(1,density-1))+(R()-.5)*.18;for(let row=0;row<boxRows;row++){if(R()<.2&&index>2)continue;addBox(a+(row-(boxRows-1)/2)*.055,y,1.80+row*.07,.16+R()*.22,.18+R()*.42,.10+R()*.12,R()<.22?brass:cool)}}}
    const lightPattern=index%5;
    for(let f=0;f<8;f++){if(lightPattern===1&&f%2||lightPattern===2&&f>2||lightPattern===3&&f!==1&&f!==5)continue;const a=Math.PI/8+f*Math.PI/4;const n=3+(index+f)%7;for(let j=0;j<n;j++)if(!(lightPattern===4&&R()<.45))addLight(a,-3.8+j*(7.6/Math.max(1,n-1))+(R()-.5)*.12,1.985)}
    const mastBands=mode===0?2:mode===5?6:3+(index%3);
    for(let b=0;b<mastBands;b++){const y=-3.7+b*(7.4/Math.max(1,mastBands-1));const count=mode===3?2+Math.floor(R()*4):4+(index+b)%5;for(let k=0;k<count;k++){const a=(k/count)*Math.PI*2+(mode===3?R()*.8:0);if(mode===4&&k%2)continue;addMast(a,y,1.98+R()*.12,.22+R()*.58)}}
    // Occasional ribs, pipes and dorsal blocks add distinct silhouettes without changing the vessel body.
    if(index%3===1)for(const y of [-2.6,2.6]){const r=new THREE.Mesh(new THREE.TorusGeometry(1.91,.035,4,8),index%2?cool:brass);r.rotation.x=Math.PI/2;r.rotation.z=Math.PI/8;r.position.y=y;greebles.add(r)}
    if(index%4===2)for(let j=0;j<5;j++)addBox(Math.PI/2,-3+j*1.5,2.08,.34,.62,.22,j===2?brass:cool);
    if(index%7===0&&index>0)for(let j=0;j<3;j++)addRail(Math.PI*.25+j*Math.PI*.5,2.13,4.8+R()*2,cool);
    tag(greebles);return letter;
  }
  let variant=0;buildVariant(variant);tag(fixed);
  return{object:root,nextVariant(){variant=(variant+1)%26;return buildVariant(variant)},setVariant(i){variant=((i%26)+26)%26;return buildVariant(variant)},inspect:()=>({kind:"lighthugger-exterior",shape:"horizontal cored octagonal vessel",length,outerRadius:outer,innerRadius:inner,entryTarget:true,greebleVariant:String.fromCharCode(65+variant)})};
}
