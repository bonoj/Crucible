export function createCinnabarAndCinnamon(){
  // The play record is a deterministic score, not a wall-clock transcript.
  // New turns append after the previous scored consequence unless a turn earns explicit timing.
  const turns=[
    {turn:1,actor:"human",at:0,duration:12000,kind:"raise-dome"},
    {turn:2,actor:"model",at:12000,duration:10000,kind:"unfurl-kite"},
    {turn:3,actor:"human",at:22000,duration:5200,kind:"clockchain-burrow-to-dome"}
  ];
  // First Clockchain result is now historical evidence: Human won the first couplet.
  const draws=[{couplet:1,owner:"human",method:"clockchain-derived",at:22000}];
  let origin=null,replays=0,fastForwardTarget=null;
  function update(now){if(origin==null)origin=now;return Math.max(0,now-origin);}
  function replay(){origin=null;fastForwardTarget=null;replays++;}
  function frontier(){return turns.reduce((m,t)=>Math.max(m,t.at+t.duration),0);}
  function nextTurnStart(fieldNow){for(const t of turns)if(t.at>fieldNow+.5)return t.at;return frontier();}
  function fastForwardTo(target=frontier()){fastForwardTarget=Math.max(0,target);return fastForwardTarget;}
  function consumeFastForward(fieldNow){if(fastForwardTarget==null)return 1;const remaining=fastForwardTarget-fieldNow;if(remaining<=0){fastForwardTarget=null;return 1;}const span=Math.max(1,Math.min(1,remaining/1800));const eased=span*span*(3-2*span);return 1+3*eased;}
  function clockchainHead(){return JSON.stringify({turns:turns.map(({turn,actor,at,duration,kind})=>({turn,actor,at,duration,kind})),draws:draws.map(({couplet,owner,method,seed})=>({couplet,owner,method,seed}))});}
  function turn(number){return turns.find(entry=>entry.turn===number)??null;}
  function recordDraw(draw){if(draws.length)return draws[draws.length-1];const entry={couplet:1,...draw};draws.push(entry);return entry;}
  function inspect(now=null){const elapsed=origin==null?0:(now==null?null:Math.max(0,now-origin));return{kind:"cinnabar-and-cinnamon",clock:"simulation",origin,elapsed,replays,frontier:frontier(),fastForwardTarget,clockchainHead:clockchainHead(),turns:turns.map(entry=>({...entry})),rules:{fromTurn:3,initiative:"clockchain-per-turn",draw:"diegetic-world-clockchain"},draws:draws.map(entry=>({...entry}))};}
  return{turns,draws,update,replay,turn,recordDraw,frontier,nextTurnStart,fastForwardTo,consumeFastForward,clockchainHead,inspect};
}
