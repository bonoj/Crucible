export function createTransportSystem({THREE,scene,terrain}){
  const N=48,SIZE=18,CELL=SIZE/N,MIN=-SIZE/2,COUNT=N*N,DT=.035,FLOW=.42;
  const mass=new Float32Array(COUNT),next=new Float32Array(COUNT),ground=new Float32Array(COUNT);
  const index=(x,z)=>x+N*z,worldX=x=>MIN+(x+.5)*CELL,worldZ=z=>MIN+(z+.5)*CELL;
  let totalInjected=0,totalEscaped=0,steps=0,enabled=false,lastNow=null,accumulator=0,source={x:-5.4,z:0,rate:.9};
  function sampleGround(){for(let z=0;z<N;z++)for(let x=0;x<N;x++)ground[index(x,z)]=terrain.groundHeight(worldX(x),worldZ(z));}
  sampleGround();
  const geometry=new THREE.BufferGeometry(),positions=new Float32Array(COUNT*3),colors=new Float32Array(COUNT*3),sizes=new Float32Array(COUNT);
  geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));geometry.setAttribute("color",new THREE.BufferAttribute(colors,3));
  const material=new THREE.PointsMaterial({size:.28,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,sizeAttenuation:true});
  const points=new THREE.Points(geometry,material);points.name="transport-surface-field";points.frustumCulled=false;scene.add(points);
  function refreshPresentation(){
    for(let z=0;z<N;z++)for(let x=0;x<N;x++){const k=index(x,z),h=ground[k],m=mass[k],o=k*3;
      const wet=m>1e-5;positions[o]=worldX(x);positions[o+1]=wet&&Number.isFinite(h)?h+.08+Math.min(.24,m*.08):-100;positions[o+2]=worldZ(z);
      const q=Math.min(1,Math.sqrt(m*.9));colors[o]=.08+.3*q;colors[o+1]=.38+.58*q;colors[o+2]=.7+.3*q;
    }
    geometry.attributes.position.needsUpdate=true;geometry.attributes.color.needsUpdate=true;points.visible=enabled;
  }
  function nearestCell(x,z){return{x:THREE.MathUtils.clamp(Math.floor((x-MIN)/CELL),0,N-1),z:THREE.MathUtils.clamp(Math.floor((z-MIN)/CELL),0,N-1)}}
  function inject(amount=1,x=source.x,z=source.z){const c=nearestCell(x,z),k=index(c.x,c.z);if(!Number.isFinite(ground[k]))return 0;mass[k]+=amount;totalInjected+=amount;return amount}
  function step(){
    sampleGround();next.set(mass);
    const delta=new Float32Array(COUNT);
    for(let z=0;z<N;z++)for(let x=0;x<N;x++){const k=index(x,z),m=mass[k],g=ground[k];if(m<=1e-7||!Number.isFinite(g))continue;
      const level=g+m*CELL*.16,neighbors=[];let sum=0;
      for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(nx<0||nx>=N||nz<0||nz>=N)continue;const j=index(nx,nz),ng=ground[j];if(!Number.isFinite(ng))continue;const drop=level-(ng+mass[j]*CELL*.16);if(drop>0){neighbors.push([j,drop]);sum+=drop}}
      if(!sum)continue;const movable=Math.min(m,m*FLOW);
      for(const [j,w] of neighbors){const q=movable*w/sum;delta[k]-=q;delta[j]+=q}
    }
    for(let k=0;k<COUNT;k++)next[k]=Math.max(0,next[k]+delta[k]);
    mass.set(next);steps++;
  }
  function update(now){if(!enabled){lastNow=now;return}if(lastNow==null)lastNow=now;accumulator+=Math.min(.15,Math.max(0,(now-lastNow)/1000));lastNow=now;while(accumulator>=DT){inject(source.rate*DT);step();accumulator-=DT}refreshPresentation()}
  function setEnabled(v){enabled=!!v;points.visible=enabled;lastNow=null;return enabled}
  function reset(){mass.fill(0);totalInjected=0;totalEscaped=0;steps=0;accumulator=0;sampleGround();refreshPresentation()}
  function setSource({x=source.x,z=source.z,rate=source.rate}={}){source={x,z,rate:Math.max(0,rate)};return{...source}}
  function inspect(){let stored=0,wet=0,max=0;for(const m of mass){stored+=m;if(m>1e-5)wet++;max=Math.max(max,m)}return{kind:"surface-parcel-field",enabled,grid:[N,N],cellSize:CELL,source:{...source},mass:{injected:totalInjected,stored,escaped:totalEscaped,error:totalInjected-stored-totalEscaped},wetCells:wet,maxCellMass:max,steps}}
  refreshPresentation();
  return{update,setEnabled,reset,inject,setSource,inspect,object:points};
}