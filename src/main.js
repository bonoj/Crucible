import * as THREE from "three";
import {createWorld} from "./core/ecs.js";
import {installDiagnostics} from "./runtime/diagnostics.js";

const mount=document.querySelector("#world"), diagnostics=installDiagnostics(document.querySelector("#diagnostics"));
document.querySelector("#build-id").textContent="build "+String(globalThis.__CRUCIBLE_BUILD__||"local").slice(0,7);

const world=createWorld();
const Transform=world.component("Transform"),Body=world.component("Body"),Gravity=world.component("Gravity"),Support=world.component("Support");
const scene=new THREE.Scene();scene.background=new THREE.Color(0x7f8980);scene.fog=new THREE.Fog(0x7f8980,22,58);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;mount.append(renderer.domElement);

const camera=new THREE.PerspectiveCamera(38,1,.1,150);
let az=.65,polar=1.02,distance=24,target=new THREE.Vector3(0,1,0);
function placeCamera(){polar=THREE.MathUtils.clamp(polar,.25,1.48);distance=THREE.MathUtils.clamp(distance,9,38);camera.position.set(target.x+distance*Math.sin(polar)*Math.sin(az),target.y+distance*Math.cos(polar),target.z+distance*Math.sin(polar)*Math.cos(az));camera.lookAt(target)}
placeCamera();

const hemi=new THREE.HemisphereLight(0xf4d7aa,0x43362d,2.0);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffc57d,3.4);sun.position.set(-12,20,10);scene.add(sun);
const fill=new THREE.DirectionalLight(0x7ca39a,.7);fill.position.set(12,8,-10);scene.add(fill);

const rockMat=new THREE.MeshStandardMaterial({color:0x785846,roughness:.96,metalness:.02,flatShading:true});
const rimMat=new THREE.MeshStandardMaterial({color:0x5c4033,roughness:.86,metalness:.08,flatShading:true});
const brass=new THREE.MeshStandardMaterial({color:0xa87536,roughness:.42,metalness:.68});
const cinnabar=new THREE.MeshStandardMaterial({color:0x7d2d22,roughness:.78,metalness:.04});

function groundHeight(x,z){
  const r=Math.hypot(x,z); if(r>9.15)return -Infinity;
  const edge=Math.max(0,(r-7.2)/1.95);
  return .28*Math.sin(x*.7)+.22*Math.cos(z*.83)+.16*Math.sin((x+z)*1.1)-edge*1.2;
}
const N=42,size=18.3,positions=[],colors=[];
for(let iz=0;iz<N;iz++)for(let ix=0;ix<N;ix++){
  const x0=-size/2+size*ix/N,x1=-size/2+size*(ix+1)/N,z0=-size/2+size*iz/N,z1=-size/2+size*(iz+1)/N;
  const pts=[[x0,z0],[x1,z0],[x1,z1],[x0,z1]].map(([x,z])=>[x,groundHeight(x,z),z]);
  if(pts.some(p=>!Number.isFinite(p[1])))continue;
  for(const k of [0,1,2,0,2,3])positions.push(...pts[k]);
}
const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));geo.computeVertexNormals();
const ground=new THREE.Mesh(geo,rockMat);scene.add(ground);

const plinth=new THREE.Mesh(new THREE.CylinderGeometry(9.75,10.1,2.1,8,1,false,Math.PI/8),rimMat);plinth.position.y=-1.75;scene.add(plinth);
const mineralGeo=new THREE.IcosahedronGeometry(.22,1);
for(let i=0;i<13;i++){const a=i*2.399,r=2.2+(i%5)*1.15,x=Math.cos(a)*r,z=Math.sin(a)*r,y=groundHeight(x,z);if(!Number.isFinite(y))continue;const m=new THREE.Mesh(mineralGeo,i%4===0?cinnabar:brass);m.scale.set(.6+(i%3)*.25,.5+(i%4)*.18,.6);m.position.set(x,y+.12,z);m.rotation.set(a*.3,a,.2);scene.add(m)}

const sphereGeo=new THREE.SphereGeometry(.22,12,8);
function spawnMatter(x,y,z){
  const id=world.entity(),mesh=new THREE.Mesh(sphereGeo,brass);scene.add(mesh);
  world.add(id,Transform,{position:new THREE.Vector3(x,y,z),velocity:new THREE.Vector3((Math.random()-.5)*.35,0,(Math.random()-.5)*.35)});
  world.add(id,Body,{object:mesh,radius:.22,restitution:.18,drag:.985});
  world.add(id,Gravity,{acceleration:-8.5});world.add(id,Support,{kind:"ground"});return id;
}
for(let i=0;i<9;i++){const a=i*.72,r=.4+(i%3)*.42;spawnMatter(Math.cos(a)*r,4.2+i*.28,Math.sin(a)*r)}

function physics(dt){
  for(const id of world.query(Transform,Body,Gravity)){
    const t=Transform.get(id),b=Body.get(id),g=Gravity.get(id);t.velocity.y+=g.acceleration*dt;t.position.addScaledVector(t.velocity,dt);
    if(Support.has(id)){
      const h=groundHeight(t.position.x,t.position.z);
      if(Number.isFinite(h)&&t.position.y-b.radius<h){t.position.y=h+b.radius;if(t.velocity.y<0)t.velocity.y=-t.velocity.y*b.restitution;t.velocity.x*=b.drag;t.velocity.z*=b.drag;if(Math.abs(t.velocity.y)<.08)t.velocity.y=0}
    }
  }
}
function sync(){for(const id of world.query(Transform,Body)){const t=Transform.get(id),b=Body.get(id);b.object.position.copy(t.position)}}

let dragging=false,lastX=0,lastY=0;
renderer.domElement.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener("pointermove",e=>{if(!dragging)return;az-=(e.clientX-lastX)*.006;polar-=(e.clientY-lastY)*.006;lastX=e.clientX;lastY=e.clientY;placeCamera()});
renderer.domElement.addEventListener("pointerup",()=>dragging=false);
renderer.domElement.addEventListener("wheel",e=>{e.preventDefault();distance*=Math.exp(e.deltaY*.001);placeCamera()},{passive:false});
let pinch=null;
renderer.domElement.addEventListener("touchmove",e=>{if(e.touches.length===2){e.preventDefault();const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(pinch)distance*=pinch/d;pinch=d;placeCamera()}},{passive:false});
renderer.domElement.addEventListener("touchend",()=>pinch=null);

function resize(){const w=Math.max(1,mount.clientWidth),h=Math.max(1,mount.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(mount);resize();
let last=performance.now();
function frame(now){const dt=Math.min(.033,(now-last)/1000);last=now;physics(dt);sync();renderer.render(scene,camera);requestAnimationFrame(frame)}
requestAnimationFrame(frame);
globalThis.crucible={world,components:{Transform,Body,Gravity,Support},spawnMatter,groundHeight,inspect:()=>({entities:world.alive.size,looseMatter:world.query(Transform,Body,Gravity).length,build:globalThis.__CRUCIBLE_BUILD__})};
diagnostics.ready();

// T0 bench checkpoint: candidate machinery installed; Actions enabled.
