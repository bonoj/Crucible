export function createMeteorWeatherSystem({THREE,terrain,meteors,seed=0x51a7c1}){
  class RNG{constructor(s){this.s=s>>>0||1}next(){let x=this.s;x^=x<<13;x^=x>>>17;x^=x<<5;this.s=x>>>0;return this.s/4294967296}}
  const rng=new RNG(seed);let nextAt=performance.now()+2200+rng.next()*2800,events=0,impacts=0,lastKind=null;
  const powers=[.18,.28,.42,.62,.85,1.15,1.55];
  function target(){
    for(let i=0;i<8;i++){const a=rng.next()*Math.PI*2,r=Math.sqrt(rng.next())*8.0,x=Math.cos(a)*r,z=Math.sin(a)*r;if(terrain.insideMaterial(x,z))return meteors.targetAt(x,z)}
    return meteors.targetAt();
  }
  function power(){const u=rng.next();const index=u<.38?Math.floor(rng.next()*3):u<.82?2+Math.floor(rng.next()*3):4+Math.floor(rng.next()*3);return powers[Math.min(index,powers.length-1)]}
  function schedule(now){nextAt=now+1800+rng.next()*7200}
  function update(now){
    if(now<nextAt)return;
    events++;const u=rng.next(),base=target();
    let count,spread,kind;
    if(u<.48){count=1;spread=0;kind="singlet"}
    else if(u<.86){count=2+Math.floor(rng.next()*4);spread=.45+rng.next()*1.2;kind="burst"}
    else{count=6+Math.floor(rng.next()*7);spread=1.0+rng.next()*2.0;kind="shower"}
    lastKind=kind;
    for(let i=0;i<count;i++){
      const a=rng.next()*Math.PI*2,r=spread?Math.sqrt(rng.next())*spread:0,x=base.x+Math.cos(a)*r,z=base.z+Math.sin(a)*r;
      const p=terrain.insideMaterial(x,z)?meteors.targetAt(x,z):base;
      const delay=i===0?0:80+i*(70+rng.next()*220);
      setTimeout(()=>{meteors.meteor(p,power());impacts++},delay);
    }
    schedule(now);
  }
  return{update,inspect:()=>({seed,events,impacts,lastKind,nextInMs:Math.max(0,Math.round(nextAt-performance.now()))})};
}
