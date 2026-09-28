import {createWorld} from "./core/ecs.js";
import {installDiagnostics} from "./runtime/diagnostics.js";
import {createThreeRuntime} from "./runtime/three-runtime.js";
import {createRenderSyncSystem} from "./runtime/render-sync.js";
import {createCameraSystem} from "./runtime/camera-system.js";
import {createOrbitSystem} from "./runtime/orbit-system.js";
import {installOrbitInput} from "./runtime/orbit-input.js";
import {createLightSystem} from "./runtime/light-system.js";

const mount=document.querySelector("#world"),diagnostics=installDiagnostics(document.querySelector("#diagnostics"));
document.querySelector("#build-id").textContent="build "+String(globalThis.__CRUCIBLE_BUILD__||"local").slice(0,7);
document.querySelector("#debug-refresh").addEventListener("click",()=>location.reload());

const world=createWorld(),three=createThreeRuntime({mount,diagnostics}),THREE=three.THREE;
const names=["Transform","Body","Gravity","Support","RenderObject","Camera","CameraTarget","Viewport","ActiveCamera","CameraView","OrbitBehavior","Light","LightView"];
const components=Object.fromEntries(names.map(name=>[name,world.component(name)]));
const {Transform,Body,Gravity,Support,RenderObject,Camera,CameraTarget,Viewport,ActiveCamera,OrbitBehavior,Light}=components;
three.scene.background=new THREE.Color(0x7f8980);three.scene.fog=new THREE.Fog(0x7f8980,22,58);

const locus=world.entity();world.add(locus,Transform,{position:new THREE.Vector3(0,1,0),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});
function addCamera({name,position,orbit,fov=38}){const id=world.entity();world.add(id,Transform,{position:new THREE.Vector3(...position),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(id,Camera,{name,projection:"perspective",fov,height:5,near:.1,far:150});world.add(id,CameraTarget,{entity:locus});world.add(id,Viewport,{slot:"primary"});world.add(id,OrbitBehavior,orbit);return id;}
const limits={minDistance:9,maxDistance:38,minPolar:.25,maxPolar:1.48,minWorldY:.18};
const overviewCamera=addCamera({name:"Overview",position:[12,13,18],orbit:{azimuth:.65,polar:1.02,distance:24,...limits}});
world.add(overviewCamera,ActiveCamera,true);
const orbit=createOrbitSystem({world,components,THREE}),cameras=createCameraSystem({world,components,three}),lights=createLightSystem({world,components,three}),renderSync=createRenderSyncSystem({world,components});
orbit.applyAll();installOrbitInput({element:three.renderer.domElement,activeCamera:()=>cameras.activeId(),orbit,onChange:()=>orbit.applyAll()});

function addLight({name,kind,color,groundColor,intensity,position,castShadow=false}){const id=world.entity();world.add(id,Transform,{position:new THREE.Vector3(...position),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(id,Light,{name,kind,color,groundColor,intensity,castShadow});return id;}
const skyLight=addLight({name:"Sky",kind:"hemisphere",color:0xf4d7aa,groundColor:0x43362d,intensity:2,position:[0,5,0]});
const keyLight=addLight({name:"Key",kind:"directional",color:0xffc57d,intensity:3.4,position:[-12,20,10],castShadow:true});
const fillLight=addLight({name:"Fill",kind:"directional",color:0x7ca39a,intensity:.7,position:[12,8,-10]});lights.syncAll();

const rockMat=new THREE.MeshStandardMaterial({color:0x785846,roughness:.96,metalness:.02,flatShading:true}),rimMat=new THREE.MeshStandardMaterial({color:0x5c4033,roughness:.86,metalness:.08,flatShading:true}),brass=new THREE.MeshStandardMaterial({color:0xa87536,roughness:.42,metalness:.68}),cinnabar=new THREE.MeshStandardMaterial({color:0x7d2d22,roughness:.78,metalness:.04});
function groundHeight(x,z){const r=Math.hypot(x,z);if(r>9.15)return-Infinity;const edge=Math.max(0,(r-7.2)/1.95);return .28*Math.sin(x*.7)+.22*Math.cos(z*.83)+.16*Math.sin((x+z)*1.1)-edge*1.2;}
const N=42,size=18.3,positions=[];for(let iz=0;iz<N;iz++)for(let ix=0;ix<N;ix++){const x0=-size/2+size*ix/N,x1=-size/2+size*(ix+1)/N,z0=-size/2+size*iz/N,z1=-size/2+size*(iz+1)/N,pts=[[x0,z0],[x1,z0],[x1,z1],[x0,z1]].map(([x,z])=>[x,groundHeight(x,z),z]);if(pts.some(p=>!Number.isFinite(p[1])))continue;for(const k of[0,1,2,0,2,3])positions.push(...pts[k]);}
const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));geo.computeVertexNormals();const ground=new THREE.Mesh(geo,rockMat);ground.receiveShadow=true;three.scene.add(ground);
const plinth=new THREE.Mesh(new THREE.CylinderGeometry(9.75,10.1,2.1,8,1,false,Math.PI/8),rimMat);plinth.position.y=-1.75;plinth.receiveShadow=true;three.scene.add(plinth);
const mineralGeo=new THREE.IcosahedronGeometry(.22,1);for(let i=0;i<13;i++){const a=i*2.399,r=2.2+(i%5)*1.15,x=Math.cos(a)*r,z=Math.sin(a)*r,y=groundHeight(x,z);if(!Number.isFinite(y))continue;const m=new THREE.Mesh(mineralGeo,i%4===0?cinnabar:brass);m.scale.set(.6+(i%3)*.25,.5+(i%4)*.18,.6);m.position.set(x,y+.12,z);m.rotation.set(a*.3,a,.2);m.castShadow=true;three.scene.add(m);}
const sphereGeo=new THREE.SphereGeometry(.22,12,8);
function spawnMatter(x,y,z){const id=world.entity(),mesh=new THREE.Mesh(sphereGeo,brass);mesh.castShadow=true;three.scene.add(mesh);world.add(id,Transform,{position:new THREE.Vector3(x,y,z),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true,velocity:new THREE.Vector3((Math.random()-.5)*.35,0,(Math.random()-.5)*.35)});world.add(id,RenderObject,{object:mesh});world.add(id,Body,{radius:.22,restitution:.18,drag:.985});world.add(id,Gravity,{acceleration:-8.5});world.add(id,Support,{kind:"ground"});return id;}
for(let i=0;i<9;i++){const a=i*.72,r=.4+(i%3)*.42;spawnMatter(Math.cos(a)*r,4.2+i*.28,Math.sin(a)*r);}
function physics(dt){for(const id of world.query(Transform,Body,Gravity)){const t=Transform.get(id),b=Body.get(id),g=Gravity.get(id);t.velocity.y+=g.acceleration*dt;t.position.addScaledVector(t.velocity,dt);if(Support.has(id)){const h=groundHeight(t.position.x,t.position.z);if(Number.isFinite(h)&&t.position.y-b.radius<h){t.position.y=h+b.radius;if(t.velocity.y<0)t.velocity.y=-t.velocity.y*b.restitution;t.velocity.x*=b.drag;t.velocity.z*=b.drag;if(Math.abs(t.velocity.y)<.08)t.velocity.y=0;}}}}

let last=performance.now(),fpsWindowStart=last,fpsFrames=0;const fpsCounter=document.querySelector("#fps-counter");
function frame(now){const dt=Math.min(.033,Math.max(0,(now-last)/1000));last=now;fpsFrames++;if(now-fpsWindowStart>=500){fpsCounter.textContent=`fps ${Math.round(fpsFrames*1000/(now-fpsWindowStart))}`;fpsWindowStart=now;fpsFrames=0;}physics(dt);orbit.applyAll();lights.syncAll();renderSync();cameras.render();requestAnimationFrame(frame);}requestAnimationFrame(frame);
globalThis.crucible={world,components,spawnMatter,groundHeight,systems:{renderSync,cameras,orbit,lights},entities:{locus,overviewCamera,skyLight,keyLight,fillLight},inspect:()=>({entities:world.alive.size,looseMatter:world.query(Transform,Body,Gravity).length,build:globalThis.__CRUCIBLE_BUILD__,pixelRatio:three.renderer.getPixelRatio(),activeCamera:cameras.activeId(),cameras:cameras.inspect().map(c=>({...c,orbit:orbit.inspect(c.id)})),lights:lights.inspect()})};
diagnostics.ready();