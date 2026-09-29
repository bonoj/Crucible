export function createCinnabarAndCinnamon(){
  // The play record is a deterministic score, not a wall-clock transcript.
  // New turns append after the previous scored consequence unless a turn earns explicit timing.
  const turns=[
    {turn:1,actor:"human",at:0,duration:12000,kind:"raise-dome"},
    {turn:2,actor:"model",at:12000,duration:10000,kind:"unfurl-kite"}
  ];
  const draws=[];
  let origin=null,replays=0,fastForwardTarget=null;
  function update(now){if(origin==null)origin=now;return Math.max(0,now-origin);}
  function replay(){origin=null;fastForwardTarget=null;replays++;}
  function frontier(){return turns.reduce((m,t)=>Math.max(m,t.at+t.duration),0);}
  function fastForwardTo(target=frontier()){fastForwardTarget=Math.max(0,target);return fastForwardTarget;}
  function consumeFastForward(fieldNow){if(fastForwardTarget==null)return 1;if(fieldNow>=fastForwardTarget){fastForwardTarget=null;return 1;}return 8;}
  function clockchainHead(){return JSON.stringify({turns:turns.map(({turn,actor,at,duration,kind})=>({turn,actor,at,duration,kind})),draws:draws.map(({couplet,owner,method,seed})=>({couplet,owner,method,seed}))});}
  function turn(number){return turns.find(entry=>entry.turn===number)??null;}
  function recordDraw(draw){if(draws.length)return draws[draws.length-1];const entry={couplet:1,...draw};draws.push(entry);return entry;}
  function inspect(now=null){const elapsed=origin==null?0:(now==null?null:Math.max(0,now-origin));return{kind:"cinnabar-and-cinnamon",clock:"simulation",origin,elapsed,replays,frontier:frontier(),fastForwardTarget,clockchainHead:clockchainHead(),turns:turns.map(entry=>({...entry})),rules:{fromTurn:3,initiative:"two-turn-couplets",draw:"diegetic-world-trial"},draws:draws.map(entry=>({...entry}))};}
  return{turns,draws,update,replay,turn,recordDraw,frontier,fastForwardTo,consumeFastForward,clockchainHead,inspect};
}
