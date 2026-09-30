// One ownership surface for Crucible's developer UI.
// Control grammar, grouping, labels, state, and DOM binding live here.
export function createDevUI({mount,build,actions}){
  if(!mount)throw new Error("DevUI mount missing");
  const groups=[
    {kind:"readout",items:[["fps","fps …","Frames per second"],["build",`build ${String(build||"local").slice(0,7)}`,"Build"]]},
    {kind:"choice",label:"Impact magnitude",items:[1,2,3,4].map((n,i)=>({id:`impact-${n}`,text:String(n),label:`Impact magnitude ${n}`,on:()=>actions.impactBucket(i)}))},
    {kind:"controls",items:[{id:"meteor",text:"☄️",label:"Call meteor",on:actions.meteor}]},
    {kind:"choice",label:"Bearing controls",items:[
      {id:"bearings-many",text:"••",label:"Spawn 25 thousand bearings",on:actions.bearingsMany},
      {id:"bearings-packet",text:"•",label:"Spawn 25 bearings at tapped point",tool:"bearing-packet"}
    ]},
    {kind:"choice",label:"Terrain tools",items:[
      {id:"carve",text:"⛏️",label:"Carve terrain at tapped point",tool:"carve"},
      {id:"raise",text:"🪏",label:"Raise terrain at tapped point",tool:"raise"}
    ]},
    {kind:"choice",label:"Transport tools",items:[
      {id:"source",text:"💧",label:"Place transport source at tapped point",tool:"source"},
      {id:"source-thick",text:"🩸",label:"Place thicker transport source at tapped point",tool:"source-thick"}
    ]},
    {kind:"controls",items:[
      {id:"science",text:"🔬",label:"Toggle Science mode",on:actions.science},
      {id:"transport-density",text:"🌊 25",label:"Transport display density 25 of 25",on:actions.transportDensity},
      {id:"log",text:"LOG",label:"Export locus observation log",on:actions.exportLog},
      {id:"time",text:"1×",label:"Simulation speed 1 times",on:actions.timeScale},
      {id:"refresh",text:"↻",label:"Refresh",on:actions.refresh}
    ]}
  ];
  let tool="meteor";const nodes=new Map();
  mount.replaceChildren();
  function button(item){
    const b=document.createElement("button");b.type="button";b.className="dev-control";b.textContent=item.text;b.setAttribute("aria-label",item.label);nodes.set(item.id,b);
    b.addEventListener("click",()=>{if(item.tool){tool=item.tool;syncTools();actions.tool?.(tool)}else item.on?.(b)});return b;
  }
  for(const group of groups){
    if(group.kind==="readout"){for(const [id,value,label] of group.items){const o=document.createElement("output");o.className="dev-readout";o.textContent=value;o.setAttribute("aria-label",label);nodes.set(id,o);mount.append(o)}continue}
    const host=document.createElement("span");host.className=group.kind==="choice"?"dev-group":"dev-controls";if(group.label)host.setAttribute("aria-label",group.label);
    for(const item of group.items)host.append(button(item));mount.append(host);
  }
  function syncTools(){for(const group of groups)for(const item of group.items||[])if(item?.tool)nodes.get(item.id)?.classList.toggle("active",item.tool===tool)}
  function setPressed(id,value){const n=nodes.get(id);n?.classList.toggle("active",!!value);n?.setAttribute("aria-pressed",String(!!value))}
  function setChoice(prefix,index){for(let i=0;i<16;i++){const n=nodes.get(`${prefix}-${i+1}`);if(n)n.classList.toggle("active",i===index)}}
  function setText(id,text,label){const n=nodes.get(id);if(!n)return;n.textContent=text;if(label)n.setAttribute("aria-label",label)}
  syncTools();
  return{get tool(){return tool},setTool(v){tool=v;syncTools();return tool},setPressed,setChoice,setText,setFps:v=>setText("fps",`fps ${v}`),inspect:()=>({tool,controls:[...nodes.keys()]})};
}
