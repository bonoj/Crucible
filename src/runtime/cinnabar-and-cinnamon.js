export function createCinnabarAndCinnamon(){
  // The play record is a deterministic score, not a wall-clock transcript.
  // New turns append after the previous scored consequence unless a turn earns explicit timing.
  const turns=[
    {turn:1,actor:"human",at:0,duration:12000,kind:"raise-dome"}
  ];
  let origin=null,replays=0;
  function update(now){if(origin==null)origin=now;return Math.max(0,now-origin);}
  function replay(){origin=null;replays++;}
  function turn(number){return turns.find(entry=>entry.turn===number)??null;}
  function inspect(now=null){const elapsed=origin==null?0:(now==null?null:Math.max(0,now-origin));return{kind:"cinnabar-and-cinnamon",clock:"simulation",origin,elapsed,replays,turns:turns.map(entry=>({...entry}))};}
  return{turns,update,replay,turn,inspect};
}
