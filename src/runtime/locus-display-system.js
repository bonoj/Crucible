export function createLocusDisplaySystem({THREE,station}){
  const canvas=document.createElement("canvas");canvas.width=384;canvas.height=256;const ctx=canvas.getContext("2d");
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const root=new THREE.Group();root.name="station-feed-hud";root.visible=false;station.object.add(root);
  const glow=new THREE.Mesh(new THREE.PlaneGeometry(1.72,1.10),new THREE.MeshBasicMaterial({color:0x6bcfff,transparent:true,opacity:.10,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));glow.position.z=-.012;root.add(glow);
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.55,1),new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:.92,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));root.add(screen);
  // Persistent JARVIS affordance: pack/deploy the Cinnabar apparatus without undoing its consequences.
  const buttonMat=new THREE.MeshBasicMaterial({color:0x9ee8ff,transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide});
  const stowButton=new THREE.Mesh(new THREE.CircleGeometry(.085,20),buttonMat);stowButton.name="cinnabar-stow-toggle";stowButton.position.set(.64,.40,.018);root.add(stowButton);
  const arrowShape=new THREE.Shape();arrowShape.moveTo(-.035,.025);arrowShape.lineTo(.035,.025);arrowShape.lineTo(0,-.035);arrowShape.closePath();
  const arrow=new THREE.Mesh(new THREE.ShapeGeometry(arrowShape),new THREE.MeshBasicMaterial({color:0x163f52,transparent:true,opacity:.95,depthWrite:false,side:THREE.DoubleSide}));arrow.position.z=.003;stowButton.add(arrow);
  let cinnabarPacked=false,cinnabarPacking=false;
  function setCinnabarPacked(packed,packing=false){cinnabarPacked=!!packed;cinnabarPacking=!!packing;arrow.rotation.z=cinnabarPacked?Math.PI:0;buttonMat.opacity=cinnabarPacking?.42:.72;return cinnabarPacked}
  const tailMat=new THREE.MeshBasicMaterial({color:0x6bcfff,transparent:true,opacity:.075,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
  const tailGeo=new THREE.BufferGeometry(),tail=new THREE.Mesh(tailGeo,tailMat);tail.name="station-feed-tail";station.object.add(tail);
  const anchorLocal=new THREE.Vector3(0,.31,0),anchorWorld=new THREE.Vector3(),cardWorld=new THREE.Vector3(),camDir=new THREE.Vector3(),cardRight=new THREE.Vector3(),cardUp=new THREE.Vector3();
  let open=false;function setOpen(v){open=!!v;root.visible=open;tail.visible=open;return open}function toggle(){return setOpen(!open)}tail.visible=false;
  function updatePresentation(camera){
    if(!open||!camera)return;
    const sw=new THREE.Vector3();station.object.getWorldPosition(sw);
    const cw=new THREE.Vector3();camera.getWorldPosition(cw);
    camDir.copy(cw).sub(sw).normalize();
    const p=sw.clone().add(new THREE.Vector3(.95,.65,0)).addScaledVector(camDir,.55);
    station.object.worldToLocal(p);root.position.copy(p);root.lookAt(cw);
    station.object.localToWorld(anchorWorld.copy(anchorLocal));root.getWorldPosition(cardWorld);
    cardRight.set(1,0,0).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion())).multiplyScalar(.34);
    cardUp.set(0,1,0).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion())).multiplyScalar(.22);
    const back=cardWorld.clone().addScaledVector(camDir,-.035),a=anchorWorld.clone();
    const corners=[back.clone().sub(cardRight).sub(cardUp),back.clone().add(cardRight).sub(cardUp),back.clone().add(cardRight).add(cardUp),back.clone().sub(cardRight).add(cardUp)];
    const pts=[];for(let i=0;i<4;i++){pts.push(a,corners[i],corners[(i+1)%4])}
    const localPts=pts.map(v=>station.object.worldToLocal(v.clone())),pos=[];for(const v of localPts)pos.push(v.x,v.y,v.z);
    tailGeo.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));tailGeo.computeBoundingSphere();
  }
  function draw(observation){
    ctx.clearRect(0,0,384,256);ctx.fillStyle="rgba(30,145,205,.09)";ctx.fillRect(8,8,368,240);ctx.strokeStyle="rgba(122,220,255,.70)";ctx.lineWidth=2;ctx.strokeRect(8,8,368,240);
    ctx.strokeStyle="rgba(122,220,255,.28)";ctx.beginPath();ctx.moveTo(24,38);ctx.lineTo(360,38);ctx.stroke();ctx.fillStyle="rgba(170,235,255,.88)";ctx.font="15px monospace";ctx.fillText("ORBITAL LOCUS // SCENE SUMMARY",24,29);
    const profile=observation?.measurement?.terrainProfile;if(!profile?.samples?.length){ctx.fillStyle="rgba(150,220,245,.68)";ctx.font="16px monospace";ctx.fillText("AWAITING APERTURE SAMPLE",72,138);texture.needsUpdate=true;return}
    const fp=observation.footprint,r=Math.max(.001,fp.radius),samples=profile.samples,min=profile.minHeight,max=profile.maxHeight,span=Math.max(.001,max-min),cx=192,cy=139,rr=82;
    ctx.strokeStyle="rgba(110,215,255,.55)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,rr,0,Math.PI*2);ctx.stroke();ctx.strokeStyle="rgba(110,215,255,.16)";ctx.lineWidth=1;for(const q of [.33,.66]){ctx.beginPath();ctx.arc(cx,cy,rr*q,0,Math.PI*2);ctx.stroke()}
    for(const s of samples){const dx=(s.x-fp.center[0])/r,dz=(s.z-fp.center[2])/r,v=(s.height-min)/span,alpha=.28+v*.67,rad=3.5+v*2.5;ctx.fillStyle=`rgba(130,225,255,${alpha.toFixed(3)})`;ctx.beginPath();ctx.arc(cx+dx*rr,cy+dz*rr,rad,0,Math.PI*2);ctx.fill()}
    ctx.fillStyle="rgba(220,250,255,.95)";ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(170,235,255,.88)";ctx.font="12px monospace";ctx.fillText(`RELIEF ${(max-min).toFixed(3)}`,24,231);ctx.fillText(`FOOTPRINT R ${r.toFixed(2)}`,224,231);texture.needsUpdate=true
  }
  draw(null);return{update:draw,toggle,setOpen,setCinnabarPacked,stowButton,updatePresentation,containsObject(object){for(let o=object;o;o=o.parent)if(o===root)return true;return false},inspect(){return{kind:"locus-evidence-display",presentation:"station-anchored camera-facing volumetric HUD",open,cinnabarPacked,cinnabarPacking,source:"latest recorded aperture observation",privilegedWorldAccess:false}}}
}
