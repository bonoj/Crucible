const SQRT1_2=Math.SQRT1_2;
export function createTerrainSystem({THREE,scene}){
  const NX=60,NY=44,NZ=60,MIN=new THREE.Vector3(-10,-5.5,-10),MAX=new THREE.Vector3(10,6.5,10);
  const APPARATUS_RADIUS=9.75,APPARATUS_APOTHEM=APPARATUS_RADIUS*Math.cos(Math.PI/8),EDGE_REVEAL=.7,MATERIAL_APOTHEM=APPARATUS_APOTHEM-EDGE_REVEAL;
  const APPARATUS_TOP=-1.1,APPARATUS_DEPTH=5,APPARATUS_BOTTOM=APPARATUS_TOP-APPARATUS_DEPTH,SURFACE_Y=.15;
  const PLANES=[[1,0],[-1,0],[0,1],[0,-1],[SQRT1_2,SQRT1_2],[-SQRT1_2,SQRT1_2],[SQRT1_2,-SQRT1_2],[-SQRT1_2,-SQRT1_2]];
  const field=new Float32Array(NX*NY*NZ),initial=new Float32Array(field.length),idx=(x,y,z)=>x+NX*(y+NY*z);
  const wp=(x,y,z)=>new THREE.Vector3(THREE.MathUtils.lerp(MIN.x,MAX.x,x/(NX-1)),THREE.MathUtils.lerp(MIN.y,MAX.y,y/(NY-1)),THREE.MathUtils.lerp(MIN.z,MAX.z,z/(NZ-1)));
  const octagonDistance=(x,z)=>Math.max(Math.abs(x),Math.abs(z),(Math.abs(x)+Math.abs(z))/Math.SQRT2);
  const insideMaterial=(x,z)=>octagonDistance(x,z)<=MATERIAL_APOTHEM+1e-6,insideApparatus=(x,z,pad=0)=>octagonDistance(x,z)<=APPARATUS_APOTHEM+pad;
  function boundary(x,z){let q=-Infinity,nx=0,nz=0;for(const[px,pz]of PLANES){const d=x*px+z*pz;if(d>q){q=d;nx=px;nz=pz}}return{q,nx,nz};}
  function clipPlane(poly,nx,nz){if(!poly.length)return poly;const out=[];let a=poly.at(-1),da=a.x*nx+a.z*nz-MATERIAL_APOTHEM,ain=da<=1e-6;for(const b of poly){const db=b.x*nx+b.z*nz-MATERIAL_APOTHEM,bin=db<=1e-6;if(ain!==bin){const t=da/(da-db);out.push(a.clone().lerp(b,t))}if(bin)out.push(b);a=b;da=db;ain=bin}return out;}
  function clip(raw){const out=[];for(let i=0;i<raw.length;i+=3){let poly=[raw[i],raw[i+1],raw[i+2]];for(const[nx,nz]of PLANES){poly=clipPlane(poly,nx,nz);if(poly.length<3)break}for(let j=1;j+1<poly.length;j++)out.push(poly[0],poly[j],poly[j+1])}return out;}
  function cutWalls(surface){const edges=new Map(),eps=1e-4,key=p=>`${Math.round(p.x*1e4)},${Math.round(p.y*1e4)},${Math.round(p.z*1e4)}`;function planeFor(a,b){for(let i=0;i<PLANES.length;i++){const[nx,nz]=PLANES[i];if(Math.abs(a.x*nx+a.z*nz-MATERIAL_APOTHEM)<eps&&Math.abs(b.x*nx+b.z*nz-MATERIAL_APOTHEM)<eps)return i}return-1}for(let i=0;i<surface.length;i+=3){const tri=[surface[i],surface[i+1],surface[i+2]];for(let j=0;j<3;j++){const a=tri[j],b=tri[(j+1)%3],p=planeFor(a,b);if(p<0)continue;const ka=key(a),kb=key(b),id=p+":"+(ka<kb?ka+"|"+kb:kb+"|"+ka);if(!edges.has(id))edges.set(id,[a.clone(),b.clone()])}}const walls=[];for(const[a,b]of edges.values()){const fy=Math.min(APPARATUS_TOP-.03,a.y,b.y),ad=new THREE.Vector3(a.x,fy,a.z),bd=new THREE.Vector3(b.x,fy,b.z);walls.push(a,b,bd,a,bd,ad)}return walls;}
  const corners=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],tets=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
  const interp=(a,b,va,vb)=>a.clone().lerp(b,THREE.MathUtils.clamp(va/(va-vb),0,1));
  function polygonize(ps,vs,out){const inside=[],outside=[];for(let i=0;i<4;i++)(vs[i]>0?inside:outside).push(i);if(!inside.length||inside.length===4)return;if(inside.length===1||inside.length===3){const inv=inside.length===3,A=inv?outside[0]:inside[0],others=inv?inside:outside,p0=interp(ps[A],ps[others[0]],vs[A],vs[others[0]]),p1=interp(ps[A],ps[others[1]],vs[A],vs[others[1]]),p2=interp(ps[A],ps[others[2]],vs[A],vs[others[2]]);out.push(...(inv?[p0,p2,p1]:[p0,p1,p2]));return}const[a,b]=inside,[c,d]=outside,p0=interp(ps[a],ps[c],vs[a],vs[c]),p1=interp(ps[a],ps[d],vs[a],vs[d]),p2=interp(ps[b],ps[c],vs[b],vs[c]),p3=interp(ps[b],ps[d],vs[b],vs[d]);out.push(p0,p1,p2,p2,p1,p3);}
  function terrainSeedHeight(x,z){
    const broad=.72*Math.sin(x*.31)+.48*Math.cos(z*.43)+.34*Math.sin((x+z)*.57)+.22*Math.cos((x-z)*.81);
    const ridge=1.15*Math.exp(-Math.pow((z+.8)-.24*x,2)/3.1)*Math.exp(-(x*x+z*z)/120);
    const basin=-1.05*Math.exp(-((x+3.7)*(x+3.7)+(z-2.7)*(z-2.7))/5.4);
    const mesa=.72*Math.exp(-((x-4.2)*(x-4.2)+(z+3.1)*(z+3.1))/8.5);
    const fine=.13*Math.sin(x*1.73+z*.47)+.09*Math.cos(z*2.11-x*.61);
    return SURFACE_Y+broad+ridge+basin+mesa+fine;
  }
  for(let z=0;z<NZ;z++)for(let y=0;y<NY;y++)for(let x=0;x<NX;x++){const p=wp(x,y,z);field[idx(x,y,z)]=terrainSeedHeight(p.x,p.z)-p.y;}initial.set(field);
  const geometry=new THREE.BufferGeometry(),material=new THREE.MeshStandardMaterial({color:0x785846,roughness:.96,metalness:.02,flatShading:true,side:THREE.DoubleSide}),mesh=new THREE.Mesh(geometry,material);mesh.name="deformable-world-substance";mesh.receiveShadow=true;scene.add(mesh);
  const apparatusMaterial=new THREE.MeshStandardMaterial({color:0x3f4745,roughness:.78,metalness:.22}),apparatus=new THREE.Mesh(new THREE.CylinderGeometry(APPARATUS_RADIUS,APPARATUS_RADIUS,APPARATUS_DEPTH,8,1,false,Math.PI/8),apparatusMaterial);apparatus.position.y=APPARATUS_TOP-APPARATUS_DEPTH*.5;apparatus.name="crucible-octagonal-apparatus";apparatus.receiveShadow=true;scene.add(apparatus);
  function terrainHeight(x,z){
    if(!insideMaterial(x,z))return-Infinity;
    const fx=THREE.MathUtils.clamp((x-MIN.x)/(MAX.x-MIN.x)*(NX-1),0,NX-1.001),fz=THREE.MathUtils.clamp((z-MIN.z)/(MAX.z-MIN.z)*(NZ-1),0,NZ-1.001),x0=Math.floor(fx),z0=Math.floor(fz),tx=fx-x0,tz=fz-z0;
    function column(ix,iz){for(let y=NY-2;y>=0;y--){const a=field[idx(ix,y,iz)],b=field[idx(ix,y+1,iz)];if(a>=0&&b<0){const pa=wp(ix,y,iz),pb=wp(ix,y+1,iz),t=a/(a-b);return THREE.MathUtils.lerp(pa.y,pb.y,t)}}return-Infinity}
    const h00=column(x0,z0),h10=column(x0+1,z0),h01=column(x0,z0+1),h11=column(x0+1,z0+1);
    if(![h00,h10,h01,h11].every(Number.isFinite))return Math.max(h00,h10,h01,h11);
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(h00,h10,tx),THREE.MathUtils.lerp(h01,h11,tx),tz);
  }
  function groundHeight(x,z){const h=terrainHeight(x,z);return insideApparatus(x,z)?Math.max(h,APPARATUS_TOP):h;}
  let triangles=0;
  function rebuild(){const raw=[];for(let z=0;z<NZ-1;z++)for(let y=0;y<NY-1;y++)for(let x=0;x<NX-1;x++){const ps=corners.map(c=>wp(x+c[0],y+c[1],z+c[2])),vs=corners.map(c=>field[idx(x+c[0],y+c[1],z+c[2])]);for(const t of tets)polygonize(t.map(i=>ps[i]),t.map(i=>vs[i]),raw)}const out=clip(raw);out.push(...cutWalls(out));const pos=[];for(const p of out)pos.push(p.x,p.y,p.z);geometry.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));geometry.computeVertexNormals();geometry.computeBoundingSphere();triangles=out.length/3;}
  function impact(center,{magnitude=1}={}){
    const e=Math.max(.02,magnitude),radius=.72+.62*Math.sqrt(e),depth=.16+.72*Math.pow(e,.82),rim=.035+.16*Math.pow(e,.72);
    const ix0=Math.max(1,Math.floor((center.x-radius-MIN.x)/(MAX.x-MIN.x)*(NX-1))-1),ix1=Math.min(NX-2,Math.ceil((center.x+radius-MIN.x)/(MAX.x-MIN.x)*(NX-1))+1);
    const iz0=Math.max(1,Math.floor((center.z-radius-MIN.z)/(MAX.z-MIN.z)*(NZ-1))-1),iz1=Math.min(NZ-2,Math.ceil((center.z+radius-MIN.z)/(MAX.z-MIN.z)*(NZ-1))+1);
    const yr=radius*.62,iy0=Math.max(1,Math.floor((center.y-yr-MIN.y)/(MAX.y-MIN.y)*(NY-1))-1),iy1=Math.min(NY-2,Math.ceil((center.y+yr-MIN.y)/(MAX.y-MIN.y)*(NY-1))+1);
    for(let z=iz0;z<=iz1;z++)for(let y=iy0;y<=iy1;y++)for(let x=ix0;x<=ix1;x++){
      const p=wp(x,y,z),dx=p.x-center.x,dz=p.z-center.z,radial=Math.hypot(dx,dz),dy=p.y-center.y;
      const bowl=Math.hypot(dx,dy*.82,dz);
      if(bowl<radius*.72){const w=1-bowl/(radius*.72);field[idx(x,y,z)]-=depth*w*w;}
      if(radial>radius*.62&&radial<radius&&Math.abs(dy)<radius*.48){const ring=Math.sin(Math.PI*(radial-radius*.62)/(radius*.38)),vertical=Math.max(0,1-Math.abs(dy-radius*.08)/(radius*.48));field[idx(x,y,z)]+=rim*ring*vertical;}
    }
    rebuild();
    return{magnitude:e,radius,depth,rim};
  }
  function reset(){field.set(initial);rebuild();}
  function collideSphere(position,velocity,radius,restitution=.28,drag=.86){if(position.y-radius>=APPARATUS_TOP||position.y+radius<=APPARATUS_BOTTOM)return false;const b=boundary(position.x,position.z),minQ=APPARATUS_APOTHEM+radius;if(b.q>=minQ||b.q<=APPARATUS_APOTHEM)return false;const push=minQ-b.q;position.x+=b.nx*push;position.z+=b.nz*push;const vn=velocity.x*b.nx+velocity.z*b.nz;if(vn<0){velocity.x-=(1+restitution)*vn*b.nx;velocity.z-=(1+restitution)*vn*b.nz}velocity.x*=drag;velocity.z*=drag;return true;}
  function segmentApparatusHit(a,b){let enter=0,exit=1,normal=null;const d=b.clone().sub(a),slabs=PLANES.map(([nx,nz])=>({n:new THREE.Vector3(nx,0,nz),c:APPARATUS_APOTHEM}));slabs.push({n:new THREE.Vector3(0,1,0),c:APPARATUS_TOP},{n:new THREE.Vector3(0,-1,0),c:-APPARATUS_BOTTOM});for(const s of slabs){const da=s.n.dot(a)-s.c,dd=s.n.dot(d);if(Math.abs(dd)<1e-8){if(da>0)return null;continue}const t=-da/dd;if(dd<0){if(t>enter){enter=t;normal=s.n}}else exit=Math.min(exit,t);if(enter>exit)return null}return enter>=0&&enter<=1&&normal?{t:enter,point:a.clone().lerp(b,enter),normal:normal.clone()}:null;}
  rebuild();
  return{mesh,apparatus,field,rebuild,impact,reset,groundHeight,terrainHeight,insideMaterial,insideApparatus,collideSphere,segmentApparatusHit,inspect:()=>({grid:[NX,NY,NZ],triangles,apparatus:{radius:APPARATUS_RADIUS,top:APPARATUS_TOP,bottom:APPARATUS_BOTTOM},materialApothem:MATERIAL_APOTHEM})};
}