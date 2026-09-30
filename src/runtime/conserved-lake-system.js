// Conserved-volume lake over mutable terrain.
// Authority is one water volume. The horizontal free-surface level is solved from terrain capacity.
export function createConservedLakeSystem({THREE,scene,terrain}){
  const N=96,SIZE=18,MIN=-SIZE/2,DX=SIZE/(N-1),CELL=DX*DX,EPS=1e-5;
  const bed=new Float32Array(N*N);
  let enabled=true,volume=0,level=0,initialized=false;
  const geom=new THREE.BufferGeometry();
  const mat=new THREE.MeshPhysicalMaterial({color:0x55a9c5,transparent:true,opacity:.34,roughness:.08,metalness:0,transmission:.18,thickness:1.4,depthWrite:false,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geom,mat);mesh.name="conserved-lake";mesh.renderOrder=3;scene.add(mesh);
  const wx=i=>MIN+i*DX,wz=j=>MIN+j*DX,k=(i,j)=>i+N*j;
  function sample(){for(let j=0;j<N;j++)for(let i=0;i<N;i++)bed[k(i,j)]=terrain.groundHeight(wx(i),wz(j))}
  function capacity(y){let v=0;for(let q=0;q<bed.length;q++)if(Number.isFinite(bed[q])&&bed[q]<y)v+=(y-bed[q])*CELL;return v}
  function solveLevel(target){
    let lo=Infinity,hi=-Infinity;for(const b of bed)if(Number.isFinite(b)){lo=Math.min(lo,b);hi=Math.max(hi,b)}
    if(!(target>EPS))return lo;
    hi=Math.max(hi,lo+1);while(capacity(hi)<target)hi+=(hi-lo)+1;
    for(let n=0;n<42;n++){const mid=(lo+hi)*.5;if(capacity(mid)<target)lo=mid;else hi=mid}
    return(lo+hi)*.5;
  }
  function rebuild(){
    sample();level=solveLevel(volume);
    const p=[],ind=[];let v=0;
    // Render only wet quads; their top vertices all lie on the solved horizontal free surface.
    for(let j=0;j<N-1;j++)for(let i=0;i<N-1;i++){
      const ks=[k(i,j),k(i+1,j),k(i+1,j+1),k(i,j+1)];
      if(!ks.some(q=>bed[q]<level-EPS))continue;
      p.push(wx(i),level,wz(j), wx(i+1),level,wz(j), wx(i+1),level,wz(j+1), wx(i),level,wz(j+1));
      ind.push(v,v+1,v+2,v,v+2,v+3);v+=4;
    }
    geom.setAttribute("position",new THREE.Float32BufferAttribute(p,3));geom.setIndex(ind);geom.computeBoundingSphere();mesh.visible=enabled&&volume>EPS;
  }
  function initialize({surfaceLevel}={}){
    sample();
    if(surfaceLevel==null){
      // Choose a central-basin lake level from local terrain statistics, not a magic volume.
      const center=[];for(let j=0;j<N;j++)for(let i=0;i<N;i++)if(Math.hypot(wx(i),wz(j))<4.1)center.push(bed[k(i,j)]);
      center.sort((a,b)=>a-b);surfaceLevel=center[Math.floor(center.length*.42)];
    }
    volume=capacity(surfaceLevel);initialized=true;rebuild();return inspect();
  }
  function terrainChanged(){if(!initialized)return;rebuild()}
  function reset(){initialized=false;initialize()}
  function setEnabled(v){enabled=!!v;mesh.visible=enabled&&volume>EPS;return enabled}
  function setVolume(v){volume=Math.max(0,v);initialized=true;rebuild();return inspect()}
  function addVolume(v){return setVolume(volume+v)}
  function inspect(){return{kind:"conserved-lake",enabled,volume,level,grid:[N,N],cellArea:CELL,wetArea:[...bed].reduce((a,b)=>a+(b<level?CELL:0),0),conservation:"surface level solved from fixed volume after terrain changes"}}
  initialize();
  return{update:()=>{},reset,setEnabled,setVolume,addVolume,terrainChanged,inspect,object:mesh};
}
