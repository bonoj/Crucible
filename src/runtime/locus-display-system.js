export function createLocusDisplaySystem({THREE,station}){
  const canvas=document.createElement("canvas");canvas.width=192;canvas.height=192;
  const ctx=canvas.getContext("2d");
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(.24,.24),mat);
  screen.position.set(.18,.31,.02);screen.rotation.set(-Math.PI/2,0,0);
  const frame=new THREE.Mesh(new THREE.BoxGeometry(.27,.018,.27),new THREE.MeshStandardMaterial({color:0x4d5659,roughness:.55,metalness:.25}));
  frame.position.copy(screen.position);frame.position.y-=.012;
  station.object.add(frame);station.object.add(screen);

  function draw(observation){
    ctx.fillStyle="#111713";ctx.fillRect(0,0,192,192);
    ctx.strokeStyle="#d5ddd6";ctx.lineWidth=3;ctx.beginPath();ctx.arc(96,96,82,0,Math.PI*2);ctx.stroke();
    const profile=observation?.measurement?.terrainProfile;
    if(!profile?.samples?.length){ctx.fillStyle="#9aa59d";ctx.font="14px sans-serif";ctx.fillText("NO SAMPLE",54,100);texture.needsUpdate=true;return;}
    const fp=observation.footprint, r=Math.max(.001,fp.radius), samples=profile.samples;
    const min=profile.minHeight,max=profile.maxHeight,span=Math.max(.001,max-min);
    for(const s of samples){
      const dx=(s.x-fp.center[0])/r,dz=(s.z-fp.center[2])/r;
      const v=(s.height-min)/span;
      const light=Math.round(28+v*65);
      ctx.fillStyle=`hsl(36 18% ${light}%)`;
      ctx.beginPath();ctx.arc(96+dx*82,96+dz*82,7,0,Math.PI*2);ctx.fill();
    }
    ctx.fillStyle="#e6a14a";ctx.beginPath();ctx.arc(96,96,3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#d5ddd6";ctx.font="11px monospace";ctx.fillText(`R ${(max-min).toFixed(3)}`,8,184);
    texture.needsUpdate=true;
  }
  draw(null);
  return{update:draw,inspect(){return{kind:"locus-evidence-display",source:"latest recorded aperture observation",privilegedWorldAccess:false}}};
}
