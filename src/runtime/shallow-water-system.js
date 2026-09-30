// Independent liquid candidate: depth-averaged shallow water over mutable Crucible terrain.
// This module intentionally imports no scalar-carrier/transport machinery.
export function createShallowWaterSystem({THREE,scene,terrain}){
  const N=64,SIZE=18,DX=SIZE/N,MIN=-SIZE/2,G=9.81,CFL=.32,MAX_DT=.012,DRY=1e-4;
  const K=N*N,idx=(x,z)=>x+N*z,wx=x=>MIN+(x+.5)*DX,wz=z=>MIN+(z+.5)*DX;
  const h=new Float32Array(K),hu=new Float32Array(K),hv=new Float32Array(K),bed=new Float32Array(K);
  const nh=new Float32Array(K),nhu=new Float32Array(K),nhv=new Float32Array(K);
  let enabled=false,lastNow=null,acc=0,steps=0,totalInjected=0,totalEscaped=0,displayDensity=25;
  let sources=[{x:0,z:0,rate:.9}];

  const geometry=new THREE.BufferGeometry();
  const material=new THREE.MeshStandardMaterial({color:0x318fb2,transparent:true,opacity:.72,roughness:.18,metalness:0,depthWrite:false,side:THREE.DoubleSide});
  const surface=new THREE.Mesh(geometry,material);surface.name="shallow-water-free-surface";surface.renderOrder=4;scene.add(surface);

  function sampleBed(){for(let z=0;z<N;z++)for(let x=0;x<N;x++)bed[idx(x,z)]=terrain.groundHeight(wx(x),wz(z))}
  const valid=k=>Number.isFinite(bed[k]);
  function cell(x,z){return{x:THREE.MathUtils.clamp(Math.floor((x-MIN)/DX),0,N-1),z:THREE.MathUtils.clamp(Math.floor((z-MIN)/DX),0,N-1)}}
  function addWater(q,x,z){if(!(q>0))return 0;const c=cell(x,z),k=idx(c.x,c.z);if(!valid(k))return 0;h[k]+=q/(DX*DX);totalInjected+=q;return q}

  // Hydrostatic reconstruction: reconstruct depths against the higher bed at an interface.
  // This preserves lake-at-rest much better than treating bed slope as a separate scalar force.
  function fluxX(kL,kR){
    const bL=bed[kL],bR=bed[kR],etaL=bL+h[kL],etaR=bR+h[kR],bs=Math.max(bL,bR);
    const HL=Math.max(0,etaL-bs),HR=Math.max(0,etaR-bs);
    const uL=h[kL]>DRY?hu[kL]/h[kL]:0,vL=h[kL]>DRY?hv[kL]/h[kL]:0;
    const uR=h[kR]>DRY?hu[kR]/h[kR]:0,vR=h[kR]>DRY?hv[kR]/h[kR]:0;
    const a=Math.max(Math.abs(uL)+Math.sqrt(G*HL),Math.abs(uR)+Math.sqrt(G*HR));
    return[
      .5*(HL*uL+HR*uR)-.5*a*(HR-HL),
      .5*(HL*uL*uL+.5*G*HL*HL+HR*uR*uR+.5*G*HR*HR)-.5*a*(HR*uR-HL*uL),
      .5*(HL*uL*vL+HR*uR*vR)-.5*a*(HR*vR-HL*vL)
    ];
  }
  function fluxZ(kD,kU){
    const bD=bed[kD],bU=bed[kU],etaD=bD+h[kD],etaU=bU+h[kU],bs=Math.max(bD,bU);
    const HD=Math.max(0,etaD-bs),HU=Math.max(0,etaU-bs);
    const uD=h[kD]>DRY?hu[kD]/h[kD]:0,vD=h[kD]>DRY?hv[kD]/h[kD]:0;
    const uU=h[kU]>DRY?hu[kU]/h[kU]:0,vU=h[kU]>DRY?hv[kU]/h[kU]:0;
    const a=Math.max(Math.abs(vD)+Math.sqrt(G*HD),Math.abs(vU)+Math.sqrt(G*HU));
    return[
      .5*(HD*vD+HU*vU)-.5*a*(HU-HD),
      .5*(HD*uD*vD+HU*uU*vU)-.5*a*(HU*uU-HD*uD),
      .5*(HD*vD*vD+.5*G*HD*HD+HU*vU*vU+.5*G*HU*HU)-.5*a*(HU*vU-HD*vD)
    ];
  }
  function stableDt(){
    let s=0;for(let k=0;k<K;k++)if(h[k]>DRY&&valid(k)){const u=hu[k]/h[k],v=hv[k]/h[k];s=Math.max(s,Math.abs(u)+Math.sqrt(G*h[k]),Math.abs(v)+Math.sqrt(G*h[k]))}
    return s>1e-6?Math.min(MAX_DT,CFL*DX/s):MAX_DT;
  }
  function solve(dt){
    sampleBed();nh.set(h);nhu.set(hu);nhv.set(hv);
    const scale=dt/DX;
    for(let z=0;z<N;z++)for(let x=0;x<N-1;x++){
      const L=idx(x,z),R=idx(x+1,z);if(!valid(L)||!valid(R))continue;const f=fluxX(L,R);
      nh[L]-=scale*f[0];nhu[L]-=scale*f[1];nhv[L]-=scale*f[2];
      nh[R]+=scale*f[0];nhu[R]+=scale*f[1];nhv[R]+=scale*f[2];
    }
    for(let z=0;z<N-1;z++)for(let x=0;x<N;x++){
      const D=idx(x,z),U=idx(x,z+1);if(!valid(D)||!valid(U))continue;const f=fluxZ(D,U);
      nh[D]-=scale*f[0];nhu[D]-=scale*f[1];nhv[D]-=scale*f[2];
      nh[U]+=scale*f[0];nhu[U]+=scale*f[1];nhv[U]+=scale*f[2];
    }
    // Bed-pressure source term balances hydrostatic pressure across varying terrain.
    for(let z=1;z<N-1;z++)for(let x=1;x<N-1;x++){const k=idx(x,z);if(!valid(k)||nh[k]<=DRY)continue;
      const dbx=(bed[idx(x+1,z)]-bed[idx(x-1,z)])/(2*DX),dbz=(bed[idx(x,z+1)]-bed[idx(x,z-1)])/(2*DX);
      nhu[k]-=dt*G*nh[k]*dbx;nhv[k]-=dt*G*nh[k]*dbz;
    }
    for(let k=0;k<K;k++){
      if(!valid(k)){h[k]=hu[k]=hv[k]=0;continue}
      h[k]=Math.max(0,nh[k]);
      if(h[k]<=DRY){h[k]=hu[k]=hv[k]=0}else{const damp=Math.exp(-.22*dt);hu[k]=nhu[k]*damp;hv[k]=nhv[k]*damp;const sp=Math.hypot(hu[k]/h[k],hv[k]/h[k]),max=12;if(sp>max){hu[k]*=max/sp;hv[k]*=max/sp}}
    }
    steps++;
  }
  function refresh(){
    const pos=[],ind=[];let vi=0;const stride=Math.max(1,Math.ceil((26-displayDensity)/5));
    // Surface vertices are eta = bed + solved depth. No presentation-authored wave term.
    for(let z=0;z<N-1;z+=stride)for(let x=0;x<N-1;x+=stride){const x1=Math.min(N-1,x+stride),z1=Math.min(N-1,z+stride),ks=[idx(x,z),idx(x1,z),idx(x1,z1),idx(x,z1)];
      if(ks.some(k=>h[k]<=DRY||!valid(k)))continue;
      for(const k of ks){const ix=k%N,iz=Math.floor(k/N);pos.push(wx(ix),bed[k]+h[k]+.008,wz(iz))}
      ind.push(vi,vi+1,vi+2,vi,vi+2,vi+3);vi+=4;
    }
    geometry.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));geometry.setIndex(ind);if(pos.length)geometry.computeVertexNormals();geometry.computeBoundingSphere();surface.visible=enabled;
  }
  function update(now){
    if(!enabled){lastNow=now;return}if(lastNow==null)lastNow=now;
    acc+=Math.min(.05,Math.max(0,(now-lastNow)/1000));lastNow=now;
    let guard=0;while(acc>1e-5&&guard++<16){const dt=Math.min(acc,stableDt());for(const s of sources)addWater(s.rate*dt,s.x,s.z);solve(dt);acc-=dt}
    refresh();
  }
  function reset(){h.fill(0);hu.fill(0);hv.fill(0);totalInjected=totalEscaped=steps=0;acc=0;sampleBed();refresh()}
  function setEnabled(v){enabled=!!v;lastNow=null;refresh();return enabled}
  function setSource({x=sources[0]?.x??0,z=sources[0]?.z??0,rate=sources[0]?.rate??0}={}){sources=[{x,z,rate:Math.max(0,rate)}];return{...sources[0]}}
  function setSources(a=[]){sources=a.map(s=>({x:s.x??0,z:s.z??0,rate:Math.max(0,s.rate??0)}));return sources.map(s=>({...s}))}
  function inject(q=1,x=sources[0]?.x??0,z=sources[0]?.z??0){return addWater(q,x,z)}
  function fillRegion({x=0,z=0,radius=1,amount=1}={}){const cells=[];for(let iz=0;iz<N;iz++)for(let ix=0;ix<N;ix++)if(Math.hypot(wx(ix)-x,wz(iz)-z)<=radius&&valid(idx(ix,iz)))cells.push(idx(ix,iz));if(!cells.length)return 0;const dh=amount/(cells.length*DX*DX);for(const k of cells)h[k]+=dh;totalInjected+=amount;return amount}
  function cycleDisplayDensity(){displayDensity=displayDensity>=25?1:displayDensity+1;refresh();return inspect().display}
  function setDisplayDensity(v){displayDensity=THREE.MathUtils.clamp(v|0,1,25);refresh();return inspect().display}
  function inspect(){let volume=0,wet=0,maxDepth=0,maxSpeed=0;for(let k=0;k<K;k++)if(h[k]>DRY){wet++;volume+=h[k]*DX*DX;maxDepth=Math.max(maxDepth,h[k]);maxSpeed=Math.max(maxSpeed,Math.hypot(hu[k],hv[k])/h[k])}return{kind:"shallow-water",independent:true,enabled,grid:[N,N],cellSize:DX,sources:sources.map(s=>({...s})),display:{density:displayDensity,level:displayDensity,max:25},water:{injected:totalInjected,volume,maxDepth,maxSpeed},wetCells:wet,steps}}
  sampleBed();refresh();
  return{update,setEnabled,reset,inject,fillRegion,setSource,setSources,cycleDisplayDensity,setDisplayDensity,inspect,object:surface};
}
