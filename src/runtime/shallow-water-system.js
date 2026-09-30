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
  // Presentation reconstruction is deliberately finer than the solver grid.
  // Solver cells are measurements/state; they are not render polygons.
  const SURFACE_SUBDIV=2,SURFACE_STEP=DX/SURFACE_SUBDIV,SURFACE_MIN=MIN+DX*.5,SURFACE_MAX=MIN+SIZE-DX*.5;
  function renderSample(x,z){
    const gx=(x-MIN)/DX-.5,gz=(z-MIN)/DX-.5,x0=Math.floor(gx),z0=Math.floor(gz),fx=gx-x0,fz=gz-z0;
    if(x0<0||z0<0||x0>=N-1||z0>=N-1)return{depth:0,surface:NaN};
    const cells=[[x0,z0,(1-fx)*(1-fz)],[x0+1,z0,fx*(1-fz)],[x0,z0+1,(1-fx)*fz],[x0+1,z0+1,fx*fz]];
    let depth=0,eta=0,w=0;
    for(const[ix,iz,q]of cells){const k=idx(ix,iz);if(!valid(k)||h[k]<=DRY)continue;depth+=h[k]*q;eta+=(bed[k]+h[k])*q;w+=q}
    return{depth,surface:w>1e-8?eta/w:NaN};
  }
  function supported(x,z){return Number.isFinite(terrain.groundHeight(x,z))}
  function supportBoundary(a,b){
    let lo={...a},hi={...b},loIn=supported(lo.x,lo.z);
    if(loIn===supported(hi.x,hi.z))return loIn?hi:lo;
    if(!loIn){const q=lo;lo=hi;hi=q;loIn=true}
    for(let i=0;i<8;i++){const m={x:(lo.x+hi.x)*.5,z:(lo.z+hi.z)*.5};if(supported(m.x,m.z))lo=m;else hi=m}
    const rs=renderSample(lo.x,lo.z);return{x:lo.x,z:lo.z,y:rs.surface};
  }
  function wetBoundary(a,b){
    const da=a.depth-DRY,db=b.depth-DRY,t=THREE.MathUtils.clamp(da/(da-db),0,1),x=THREE.MathUtils.lerp(a.x,b.x,t),z=THREE.MathUtils.lerp(a.z,b.z,t),rs=renderSample(x,z);
    return{x,z,y:rs.surface,depth:DRY};
  }
  function clipWet(poly){
    const out=[];if(!poly.length)return out;let a=poly.at(-1),ain=a.depth>DRY;
    for(const b of poly){const bin=b.depth>DRY;if(ain!==bin)out.push(wetBoundary(a,b));if(bin)out.push(b);a=b;ain=bin}return out;
  }
  function clipSupport(poly){
    const out=[];if(!poly.length)return out;let a=poly.at(-1),ain=supported(a.x,a.z);
    for(const b of poly){const bin=supported(b.x,b.z);if(ain!==bin)out.push(supportBoundary(a,b));if(bin)out.push(b);a=b;ain=bin}return out;
  }
  function refresh(){
    const pos=[],ind=[];let vi=0;
    const samples=new Map(),sample=(x,z)=>{const key=x.toFixed(6)+","+z.toFixed(6);if(samples.has(key))return samples.get(key);const r=renderSample(x,z),p={x,z,y:r.surface,depth:r.depth};samples.set(key,p);return p};
    const emit=poly=>{if(poly.length<3)return;const base=vi;for(const p of poly){if(!Number.isFinite(p.y)){const r=renderSample(p.x,p.z);p.y=r.surface}if(!Number.isFinite(p.y))return;pos.push(p.x,p.y+.008,p.z);vi++}for(let j=1;j+1<poly.length;j++)ind.push(base,base+j,base+j+1)};
    for(let z=SURFACE_MIN;z<SURFACE_MAX-1e-6;z+=SURFACE_STEP)for(let x=SURFACE_MIN;x<SURFACE_MAX-1e-6;x+=SURFACE_STEP){
      const x1=Math.min(SURFACE_MAX,x+SURFACE_STEP),z1=Math.min(SURFACE_MAX,z+SURFACE_STEP),a=sample(x,z),b=sample(x1,z),c=sample(x1,z1),d=sample(x,z1);
      // Triangles avoid square saddle ambiguity. Wet/dry is interpolated from solver depth;
      // material support is clipped independently against the continuous terrain/plinth query.
      emit(clipSupport(clipWet([a,b,c])));emit(clipSupport(clipWet([a,c,d])));
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
  function sampleState(x,z){
    const gx=(x-MIN)/DX-.5,gz=(z-MIN)/DX-.5,x0=Math.floor(gx),z0=Math.floor(gz),fx=gx-x0,fz=gz-z0;
    if(x0<0||z0<0||x0>=N-1||z0>=N-1)return null;
    const cells=[[x0,z0,(1-fx)*(1-fz)],[x0+1,z0,fx*(1-fz)],[x0,z0+1,(1-fx)*fz],[x0+1,z0+1,fx*fz]];
    let depth=0,eta=0,u=0,v=0,w=0;
    for(const [ix,iz,q] of cells){const k=idx(ix,iz);if(!valid(k)||h[k]<=DRY)continue;depth+=h[k]*q;eta+=(bed[k]+h[k])*q;u+=(hu[k]/h[k])*q;v+=(hv[k]/h[k])*q;w+=q}
    return w>1e-6?{depth:depth/w,surface:eta/w,u:u/w,v:v/w}:null;
  }
  function surfaceHeight(x,z){return sampleState(x,z)?.surface??NaN}
  function inspect(){let volume=0,wet=0,maxDepth=0,maxSpeed=0;for(let k=0;k<K;k++)if(h[k]>DRY){wet++;volume+=h[k]*DX*DX;maxDepth=Math.max(maxDepth,h[k]);maxSpeed=Math.max(maxSpeed,Math.hypot(hu[k],hv[k])/h[k])}return{kind:"shallow-water",independent:true,enabled,grid:[N,N],cellSize:DX,sources:sources.map(s=>({...s})),display:{density:displayDensity,level:displayDensity,max:25},water:{injected:totalInjected,volume,maxDepth,maxSpeed},wetCells:wet,steps}}
  sampleBed();refresh();
  return{update,setEnabled,reset,inject,fillRegion,setSource,setSources,cycleDisplayDensity,setDisplayDensity,sampleState,surfaceHeight,inspect,object:surface};
}
