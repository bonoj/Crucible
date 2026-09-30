// Deterministic geological history over Crucible's signed-density volume.
// Passes are geometric verbs, not named landforms. Each pass owns an independent
// asymmetric noise domain derived from world seed + pass identity.
export function createTerrainHistory({terrain}){
  const TAU=Math.PI*2;
  const fract=x=>x-Math.floor(x),clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
  function hash3(x,y,z,s){return fract(Math.sin(x*127.1+y*311.7+z*74.7+s*19.19)*43758.5453123)}
  function noise3(x,y,z,s){
    const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),fx=smooth(fract(x)),fy=smooth(fract(y)),fz=smooth(fract(z));
    const h=(a,b,c)=>hash3(ix+a,iy+b,iz+c,s),mix=(a,b,t)=>a+(b-a)*t;
    const a=mix(h(0,0,0),h(1,0,0),fx),b=mix(h(0,1,0),h(1,1,0),fx),c=mix(h(0,0,1),h(1,0,1),fx),d=mix(h(0,1,1),h(1,1,1),fx);
    return mix(mix(a,b,fy),mix(c,d,fy),fz)*2-1;
  }
  const passSeed=(worldSeed,id)=>{let h=(worldSeed|0)^0x9e3779b9;for(let i=0;i<id.length;i++)h=Math.imul(h^id.charCodeAt(i),16777619);return h>>>0};
  function domain(seed,id){
    const s=passSeed(seed,id),r=n=>hash3(n,17,31,s);
    return{seed:s,angle:r(1)*TAU,sx:.55+r(2)*1.45,sy:.55+r(3)*1.15,sz:.55+r(4)*1.45,ox:(r(5)-.5)*31,oy:(r(6)-.5)*23,oz:(r(7)-.5)*31,warp:.35+r(8)*1.15};
  }
  function sample(d,x,y,z,scale=.18){
    const ca=Math.cos(d.angle),sa=Math.sin(d.angle),rx=(ca*x-sa*z)*d.sx,rz=(sa*x+ca*z)*d.sz,ry=y*d.sy;
    const w=noise3(rx*.11+d.ox,ry*.09+d.oy,rz*.11+d.oz,d.seed);
    const X=(rx+d.ox+w*d.warp)*scale,Y=(ry+d.oy+w*d.warp*.45)*scale,Z=(rz+d.oz-w*d.warp)*scale;
    return .58*noise3(X,Y,Z,d.seed)+.28*noise3(X*2.03+7,Y*1.83-3,Z*2.17+11,d.seed+101)+.14*noise3(X*4.11-9,Y*3.77+5,Z*3.91-2,d.seed+307);
  }
  const recipe=[
    {id:"uplift-west",kind:"uplift",strength:1.7,scale:.105,bias:[-.45,.12]},
    {id:"oblique-folds",kind:"fold",strength:.82,scale:.16},
    {id:"deep-shear",kind:"shear",strength:.72,scale:.12},
    {id:"collapse-belt",kind:"collapse",strength:1.35,scale:.14,bias:[.22,-.18]},
    {id:"fracture",kind:"fracture",strength:.72,scale:.2},
    {id:"weather",kind:"weather",strength:.48,scale:.27},
    {id:"deposit-east",kind:"deposit",strength:.72,scale:.13,bias:[.34,.2]}
  ];
  function run(worldSeed=741,customRecipe=recipe){
    terrain.loadLandCandidate({rebuild:false});
    const f=terrain.field,meta=terrain.inspect(),[nx,ny,nz]=meta.grid,[sx,sy,sz]=meta.volume.spacing,[minx,miny,minz]=meta.volume.min;
    const history=[];
    for(const spec of customRecipe){
      const d=domain(worldSeed,spec.id),before=f.slice(),cx=(spec.bias?.[0]||0)*12,cz=(spec.bias?.[1]||0)*12;
      for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){
        const wx=minx+x*sx,wy=miny+y*sy,wz=minz+z*sz,n=sample(d,wx,wy,wz,spec.scale),n2=sample(d,wx+8.7,wy-3.1,wz-6.4,spec.scale*1.7);
        const radial=Math.hypot((wx-cx)*.105,(wz-cz)*.105),mask=clamp(1-radial*radial),surface=Math.exp(-Math.abs(before[x+nx*(y+ny*z)])*.72);
        let delta=0;
        if(spec.kind==="uplift") delta=spec.strength*mask*(.32+.68*clamp((n+1)*.5));
        else if(spec.kind==="fold") delta=spec.strength*mask*Math.sin((wx*Math.cos(d.angle)+wz*Math.sin(d.angle))*.72+n*2.4)*(.38+.62*surface);
        else if(spec.kind==="shear"){const side=Math.tanh((wx*Math.cos(d.angle)+wz*Math.sin(d.angle)+n*2.1)*1.35);delta=spec.strength*side*surface*(.35+.65*Math.abs(n2));}
        else if(spec.kind==="collapse"){const basin=clamp(1-Math.hypot((wx-cx)/6.8,(wz-cz)/4.7));delta=-spec.strength*basin*basin*(.3+.7*clamp((n+1)*.5));}
        else if(spec.kind==="fracture"){const seam=Math.abs(Math.sin((wx*Math.cos(d.angle)+wz*Math.sin(d.angle))*.48+n*1.8));delta=seam<.12?-spec.strength*(1-seam/.12)*surface:0;}
        else if(spec.kind==="weather") delta=-spec.strength*surface*clamp((n*.72+n2*.28+.22)*.8)*clamp((wy+4)/8);
        else if(spec.kind==="deposit"){const apron=clamp(1-Math.hypot((wx-cx)/7.5,(wz-cz)/5.4));delta=spec.strength*apron*(.25+.75*clamp((n+1)*.5))*surface;}
        f[x+nx*(y+ny*z)]+=delta;
      }
      let rms=0,max=0;for(let i=0;i<f.length;i++){const q=f[i]-before[i];rms+=q*q;max=Math.max(max,Math.abs(q))}
      history.push({id:spec.id,kind:spec.kind,seed:d.seed,rms:Math.sqrt(rms/f.length),max});
    }
    terrain.rebuildAll();
    return{seed:worldSeed,recipe:customRecipe.map(x=>({...x})),passes:history};
  }
  return{run,recipe:()=>recipe.map(x=>({...x}))};
}
