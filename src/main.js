import {createWorld} from "./core/ecs.js";
import {installDiagnostics} from "./runtime/diagnostics.js";
import {createThreeRuntime} from "./runtime/three-runtime.js";
import {createRenderSyncSystem} from "./runtime/render-sync.js";
import {createCameraSystem} from "./runtime/camera-system.js";
import {createOrbitSystem} from "./runtime/orbit-system.js";
import {installOrbitInput} from "./runtime/orbit-input.js";
import {createLightSystem} from "./runtime/light-system.js";
import {createTerrainSystem} from "./runtime/terrain-system.js";
import {createMeteorSystem} from "./runtime/meteor-system.js";
import {createMeteorWeatherSystem} from "./runtime/meteor-weather-system.js";
import {createContinuityStationSystem} from "./runtime/continuity-station-system.js";
import {createFootprintSystem} from "./runtime/footprint-system.js";
import {createFootprintOccupancySystem} from "./runtime/footprint-occupancy-system.js";
import {createApertureSystem} from "./runtime/aperture-system.js";
import {createObservationAnalysisSystem} from "./runtime/observation-analysis-system.js";
import {createSpatialProbeSystem} from "./runtime/spatial-probe-system.js";
import {createLocusLedger} from "./runtime/locus-ledger.js";
import {createLocusDisplaySystem} from "./runtime/locus-display-system.js";
import {createLocusChronograph} from "./runtime/locus-chronograph-system.js";
import {createBearingSystem} from "./runtime/bearing-system.js";
import {createImpactSystem} from "./runtime/impact-system.js";
import {createExtruderSystem} from "./runtime/extruder-system.js";
import {createCinnabarDomeSystem} from "./runtime/cinnabar-dome-system.js";
import {createCinnabarAndCinnamon} from "./runtime/cinnabar-and-cinnamon.js";
import {createCinnabarKiteSystem} from "./runtime/cinnabar-kite-system.js";
import {createCinnabarSpireSystem} from "./runtime/cinnabar-spire-system.js";
import {createCoupletTrialSystem} from "./runtime/couplet-trial-system.js";
import {installDebugApi} from "./runtime/debug-api.js";
import {createLighthuggerInterior} from "./runtime/lighthugger-interior.js";
import {createLighthuggerExterior} from "./runtime/lighthugger-exterior.js";
import {createShallowWaterSystem} from "./runtime/shallow-water-system.js";
import {buildTransportWatershed} from "./transport-watershed.js";
import {buildTransportDamBreak} from "./transport-dam-break.js";
import {createDevUI} from "./runtime/dev-ui.js";

const mount=document.querySelector("#world"),diagnostics=installDiagnostics(document.querySelector("#diagnostics"));let devUI=null;

const world=createWorld(),three=createThreeRuntime({mount,diagnostics}),THREE=three.THREE;
const names=["Transform","Body","Gravity","Support","RenderObject","Camera","CameraTarget","Viewport","ActiveCamera","CameraView","OrbitBehavior","Light","LightView","Locus","Meteor","MeteorShower","ContinuityLocus","Footprint","FootprintView","SpatialBounds","Aperture","Observation","SpatialAnalysis"];
const components=Object.fromEntries(names.map(name=>[name,world.component(name)]));
const {Transform,Body,Gravity,Support,RenderObject,Camera,CameraTarget,Viewport,ActiveCamera,OrbitBehavior,Light,Locus}=components;
three.scene.background=new THREE.Color(0x7f8980);three.scene.fog=new THREE.Fog(0x7f8980,22,58);

const locus=world.entity();world.add(locus,Transform,{position:new THREE.Vector3(0,1,0),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(locus,Locus,{id:locus,kind:"locus"});
function addCamera({name,position,orbit,fov=38,targetEntity=locus}){const id=world.entity();world.add(id,Transform,{position:new THREE.Vector3(...position),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(id,Camera,{name,projection:"perspective",fov,height:5,near:.1,far:150});world.add(id,CameraTarget,{entity:targetEntity});world.add(id,Viewport,{slot:"primary"});world.add(id,OrbitBehavior,orbit);return id;}
const limits={minDistance:9,maxDistance:46,minPolar:.25,maxPolar:1.48,minWorldY:.18};
const overviewCamera=addCamera({name:"Overview",position:[12,13,18],orbit:{azimuth:.65,polar:1.02,distance:24,...limits}});
world.add(overviewCamera,ActiveCamera,true);
const orbit=createOrbitSystem({world,components,THREE}),cameras=createCameraSystem({world,components,three}),lights=createLightSystem({world,components,three}),renderSync=createRenderSyncSystem({world,components});
orbit.applyAll();installOrbitInput({element:three.renderer.domElement,activeCamera:()=>cameras.activeId(),orbit,onChange:()=>orbit.applyAll()});

function addLight({name,kind,color,groundColor,intensity,position,castShadow=false}){const id=world.entity();world.add(id,Transform,{position:new THREE.Vector3(...position),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(id,Light,{name,kind,color,groundColor,intensity,castShadow});return id;}
const skyLight=addLight({name:"Sky",kind:"hemisphere",color:0xf4d7aa,groundColor:0x43362d,intensity:2,position:[0,16,0]});
const keyLight=addLight({name:"Key",kind:"directional",color:0xffc57d,intensity:3.4,position:[-12,20,10],castShadow:true});
const fillLight=addLight({name:"Fill",kind:"directional",color:0x7ca39a,intensity:.7,position:[12,8,-10]});lights.syncAll();

const terrain=createTerrainSystem({THREE,scene:three.scene});
const interiorTarget=world.entity();world.add(interiorTarget,Transform,{position:new THREE.Vector3(0,-29.7,0),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true});world.add(interiorTarget,Locus,{id:interiorTarget,kind:"lighthugger-interior"});
const interiorCamera=addCamera({name:"Lighthugger Interior",position:[4.1,-27.4,5.6],orbit:{azimuth:.58,polar:1.12,distance:6.2,minDistance:3.0,maxDistance:7.0,minPolar:.5,maxPolar:1.46,minWorldY:-31.8},fov:48,targetEntity:interiorTarget});
const lighthuggerInterior=createLighthuggerInterior({THREE,scene:three.scene,origin:new THREE.Vector3(0,-32,0)});
const lighthuggerExterior=createLighthuggerExterior({THREE,scene:three.scene});
const exitLighthuggerButton=document.querySelector("#exit-lighthugger");
let insideLighthugger=false;
function setLighthuggerInterior(active){insideLighthugger=!!active;lighthuggerInterior.setActive(insideLighthugger);cameras.setActive(insideLighthugger?interiorCamera:overviewCamera);orbit.applyAll();document.body.classList.toggle("inside-lighthugger",insideLighthugger);if(exitLighthuggerButton)exitLighthuggerButton.hidden=!insideLighthugger;return insideLighthugger}
exitLighthuggerButton?.addEventListener("click",()=>setLighthuggerInterior(false));
const waterBottom=-1.42,waterLevel=-.12,waterDepth=waterLevel-waterBottom,waterRadius=9.75,waterMaterial=new THREE.MeshStandardMaterial({color:0x557f88,transparent:true,opacity:.34,roughness:.28,metalness:.04,depthWrite:false,depthTest:true,side:THREE.DoubleSide}),water=new THREE.Mesh(new THREE.CylinderGeometry(waterRadius,waterRadius,waterDepth,8,1,false,Math.PI/8),waterMaterial);water.position.y=waterBottom+waterDepth*.5;water.name="crucible-sea-volume";water.renderOrder=3;water.visible=false;three.scene.add(water);
// Impact bus must exist before producers and subscribers are constructed.
const impacts=createImpactSystem();
const meteors=createMeteorSystem({world,components,THREE,scene:three.scene,terrain,locus,onImpact:e=>{
 impacts.emit({kind:"meteor",position:e.point,radius:Math.max(1.4,3.2*e.magnitude),impulse:18*e.magnitude,magnitude:e.magnitude,terrainChanged:e.terrainChanged});
}});
const cinnabarAndCinnamon=createCinnabarAndCinnamon();
const meteorWeather=createMeteorWeatherSystem({THREE,terrain,meteors,field:cinnabarAndCinnamon});
const bearings=createBearingSystem({world,components,THREE,scene:three.scene,terrain,locus,impacts});
const extruder=createExtruderSystem({world,components,THREE,scene:three.scene,terrain,bearings,locus});
const transport=createShallowWaterSystem({THREE,scene:three.scene,terrain});
const cinnabarDome=createCinnabarDomeSystem({THREE,scene:three.scene,terrain,field:cinnabarAndCinnamon});
const cinnabarKite=createCinnabarKiteSystem({THREE,scene:three.scene,field:cinnabarAndCinnamon,dome:cinnabarDome});
const cinnabarSpire=createCinnabarSpireSystem({THREE,scene:three.scene,terrain,field:cinnabarAndCinnamon});
const domeGranularTurn=cinnabarAndCinnamon.turn(5);
const domeGranularRiseTurn=cinnabarAndCinnamon.turn(6);
const coupletTrial=createCoupletTrialSystem({world,components,THREE,scene:three.scene,terrain,field:cinnabarAndCinnamon,locus});
// Cinnabar's apparatus is packable presentation. Its consequences remain in Crucible.
const cinnabarLayer=new THREE.Group();cinnabarLayer.name="cinnabar-and-cinnamon-apparatus";three.scene.add(cinnabarLayer);
for(const object of [cinnabarDome.object,cinnabarKite.object,cinnabarKite.line,cinnabarSpire.object,coupletTrial.object])cinnabarLayer.attach(object);
terrain.occludeBelowPlinth(cinnabarLayer);
let cinnabarPacked=false,cinnabarPackTarget=0,cinnabarPackY=0,cinnabarPackFrom=0,cinnabarPackElapsed=0;const cinnabarPackDepth=-13,cinnabarPackDuration=.95;
function setCinnabarPacked(packed){cinnabarPacked=!!packed;cinnabarPackFrom=cinnabarPackY;cinnabarPackTarget=cinnabarPacked?1:0;cinnabarPackElapsed=0;return cinnabarPacked}
function toggleCinnabarPacked(){return setCinnabarPacked(!cinnabarPacked)}
let scienceMode=false,scienceSnapshot=null;
function setScienceMode(active){
 active=!!active;if(active===scienceMode)return scienceMode;
 if(active){
   scienceSnapshot={terrain:terrain.snapshot(),bearings:bearings.snapshot(),cinnabarVisible:cinnabarLayer.visible,extruderEnabled:extruder.inspect().enabled,weatherEnabled:meteorWeather.inspect().enabled};
   scienceMode=true;meteorWeather.setEnabled(false,simNow);extruder.setEnabled(false);cinnabarLayer.visible=false;bearings.clear();terrain.loadLandCandidate();transport.reset();transport.setEnabled(false);lastImpactTarget=meteors.targetAt();
 }else{
   const s=scienceSnapshot;scienceMode=false;if(s){terrain.restore(s.terrain);bearings.restore(s.bearings);cinnabarLayer.visible=s.cinnabarVisible;extruder.setEnabled(s.extruderEnabled);transport.setEnabled(false);meteorWeather.setEnabled(s.weatherEnabled,simNow)}scienceSnapshot=null;lastImpactTarget=meteors.targetAt();
 }
 devUI?.setPressed("science",scienceMode);return scienceMode;
}
function toggleScienceMode(){return setScienceMode(!scienceMode)}
const continuityStation=createContinuityStationSystem({world,components,THREE,scene:three.scene});
const footprints=createFootprintSystem({world,components,THREE,scene:three.scene,terrain});
const footprintOccupancy=createFootprintOccupancySystem({world,components,footprints});
const apertureSystem=createApertureSystem({world,components,footprints,occupancy:footprintOccupancy,terrain,granularProjection:bearings});
const sceneAperture=world.entity();world.add(sceneAperture,components.Aperture,{owner:continuityStation.id,kind:"scene-summary"});
components.ContinuityLocus.get(continuityStation.id).apertures.push(sceneAperture);
const observationAnalysis=createObservationAnalysisSystem({world,components});
const spatialProbes=createSpatialProbeSystem({world,components,THREE,terrain,footprints,apertures:apertureSystem,analysis:observationAnalysis,ownerId:continuityStation.id,apertureId:sceneAperture});
const locusLedger=createLocusLedger({build:globalThis.__CRUCIBLE_BUILD__,station:continuityStation,footprints,apertures:apertureSystem});
const locusDisplay=createLocusDisplaySystem({THREE,station:continuityStation});
const locusChronograph=createLocusChronograph({THREE,station:continuityStation.object});
let lastObservation=null,lastAnalysis=null,lastProbeResults=null,lastSampleAt=-Infinity;
const impactBuckets=[.18,.42,.85,1.55];let impactBucket=1,lastImpactTarget=meteors.targetAt();
function setImpactBucket(index){impactBucket=THREE.MathUtils.clamp(index,0,impactBuckets.length-1);devUI?.setChoice("impact",impactBucket);}
function callImpact(target=lastImpactTarget){lastImpactTarget=target.clone();return meteors.meteor(target.clone(),impactBuckets[impactBucket]);}
const brass=new THREE.MeshStandardMaterial({color:0xa87536,roughness:.42,metalness:.68});
const sphereGeo=new THREE.SphereGeometry(.22,12,8);
function spawnMatter(x,y,z){const id=world.entity(),mesh=new THREE.Mesh(sphereGeo,brass);mesh.castShadow=true;three.scene.add(mesh);world.add(id,Transform,{position:new THREE.Vector3(x,y,z),rotation:new THREE.Euler(),scale:new THREE.Vector3(1,1,1),visible:true,velocity:new THREE.Vector3((Math.random()-.5)*.35,0,(Math.random()-.5)*.35)});world.add(id,RenderObject,{object:mesh});world.add(id,Body,{radius:.22,restitution:.18,drag:.985});world.add(id,components.SpatialBounds,{kind:"sphere",radius:.22});world.add(id,Gravity,{acceleration:-8.5});world.add(id,Support,{kind:"ground"});world.add(id,Locus,{id:locus});return id;}
// Keep T0 visually and causally quiet: no automatic loose-matter population.
function physics(dt){for(const id of world.query(Transform,Body,Gravity)){const t=Transform.get(id),b=Body.get(id),g=Gravity.get(id);t.velocity.y+=g.acceleration*dt;t.position.addScaledVector(t.velocity,dt);if(Support.has(id)){terrain.collideSphere(t.position,t.velocity,b.radius,b.restitution,b.drag);const h=terrain.groundHeight(t.position.x,t.position.z);if(Number.isFinite(h)&&t.position.y-b.radius<h){t.position.y=h+b.radius;if(t.velocity.y<0)t.velocity.y=-t.velocity.y*b.restitution;t.velocity.x*=b.drag;t.velocity.z*=b.drag;if(Math.abs(t.velocity.y)<.08)t.velocity.y=0;}}}}

const timeScales=[1,4,8];let timeScaleIndex=0,timeScale=1,simNow=0,physicsAccumulator=0;const physicsStep=1/120;let last=performance.now(),fpsWindowStart=last,fpsFrames=0;
function cycleTimeScale(){timeScaleIndex=(timeScaleIndex+1)%timeScales.length;timeScale=timeScales[timeScaleIndex];devUI?.setText("time",\`\${timeScale}×\`,\`Simulation speed \${timeScale} times\`);devUI?.setPressed("time",timeScale!==1)}
devUI=createDevUI({mount:document.querySelector("#debug-tools"),build:globalThis.__CRUCIBLE_BUILD__,actions:{impactBucket:setImpactBucket,meteor:()=>callImpact(),bearingsMany:()=>bearings.spawnBatch(25000),science:()=>toggleScienceMode(),transportDensity:()=>{const d=transport.cycleDisplayDensity();devUI.setText("transport-density",\`🌊 \${d.level}\`,\`Transport display density \${d.level} of \${d.max}\`)},exportLog:()=>locusLedger.download(),timeScale:cycleTimeScale,refresh:()=>location.reload()}});setImpactBucket(1);devUI.setPressed("science",scienceMode);
function frame(now){const realDt=Math.min(.033,Math.max(0,(now-last)/1000));last=now;const fieldScale=cinnabarAndCinnamon.consumeFastForward(cinnabarAndCinnamon.update(simNow));const simDt=realDt*timeScale*fieldScale;simNow+=simDt*1000;physicsAccumulator+=simDt;fpsFrames++;if(now-fpsWindowStart>=500){devUI.setFps(Math.round(fpsFrames*1000/(now-fpsWindowStart)));fpsWindowStart=now;fpsFrames=0;}extruder.update(simNow);const fieldNow=cinnabarAndCinnamon.update(simNow);if(!scienceMode){cinnabarDome.update(fieldNow);cinnabarKite.update(fieldNow);cinnabarSpire.update(fieldNow);coupletTrial.update(fieldNow,simDt);}if(cinnabarPackY!==cinnabarPackTarget){cinnabarPackElapsed=Math.min(cinnabarPackDuration,cinnabarPackElapsed+realDt);const packT=cinnabarPackElapsed/cinnabarPackDuration,packEase=packT*packT*(3-2*packT);cinnabarPackY=THREE.MathUtils.lerp(cinnabarPackFrom,cinnabarPackTarget,packEase);if(packT>=1)cinnabarPackY=cinnabarPackTarget;}cinnabarLayer.position.y=cinnabarPackDepth*cinnabarPackY;locusDisplay?.setCinnabarPacked?.(cinnabarPackY>=.999,cinnabarPackY>0.001&&cinnabarPackY<.999);let steps=0;while(physicsAccumulator>=physicsStep&&steps<32){physics(physicsStep);physicsAccumulator-=physicsStep;steps++;}
 if(!scienceMode&&domeGranularTurn&&fieldNow>=domeGranularTurn.at){
   const u=Math.min(1,Math.max(0,(fieldNow-domeGranularTurn.at)/domeGranularTurn.duration));
   const ease=u*u*(3-2*u);
   let radius=4.2,strength=.032*ease,lift=.0015*ease;
   if(domeGranularRiseTurn&&fieldNow>=domeGranularRiseTurn.at){
     const v=Math.min(1,Math.max(0,(fieldNow-domeGranularRiseTurn.at)/domeGranularRiseTurn.duration));
     const rise=v*v*(3-2*v);
     radius=THREE.MathUtils.lerp(4.2,7.2,rise);
     strength=THREE.MathUtils.lerp(.032,.095,rise);
     lift=THREE.MathUtils.lerp(.0015,.055,rise);
   }
   bearings.applyField({x:2.7,z:1.8},{radius,strength,lift});
 }
 bearings.update(Math.min(.15,simDt));transport.update(simNow);if(steps===32)physicsAccumulator=0;meteorWeather.update(simNow);meteors.update(simNow);continuityStation.update(simNow);footprints.update();if(simNow-lastSampleAt>=3000){lastSampleAt=simNow;const evidence=apertureSystem.sample(continuityStation.id,sceneAperture,simNow);if(evidence){const observation=world.entity();world.add(observation,components.Observation,evidence);lastObservation={entity:observation,...evidence};lastAnalysis=observationAnalysis.analyze(observation);locusLedger.append(lastObservation,lastAnalysis);locusDisplay.update(lastObservation);locusChronograph.update(locusLedger.snapshot());}}orbit.applyAll();lights.syncAll();renderSync();const activeView=components.CameraView.get(cameras.activeId());locusDisplay.updatePresentation(activeView?.camera);cameras.render();requestAnimationFrame(frame);}requestAnimationFrame(frame);
const inspect=()=>({entities:world.alive.size,timeScale,simulationTimeMs:simNow,science:{active:scienceMode,baseline:"S0"},lighthuggerInterior:lighthuggerInterior.inspect(),lighthuggerExterior:lighthuggerExterior.inspect(),looseMatter:world.query(Transform,Body,Gravity).length,impactBucket:impactBucket+1,impactMagnitude:impactBuckets[impactBucket],build:globalThis.__CRUCIBLE_BUILD__,pixelRatio:three.renderer.getPixelRatio(),activeCamera:cameras.activeId(),cameras:cameras.inspect().map(c=>({...c,orbit:orbit.inspect(c.id)})),lights:lights.inspect(),terrain:terrain.inspect(),water:{visible:water.visible,level:waterLevel},meteors:{...meteors.inspect(),weather:meteorWeather.inspect()},impacts:impacts.inspect(),bearings:bearings.inspect(),extruder:extruder.inspect(),transport:transport.inspect(),cinnabarAndCinnamon:cinnabarAndCinnamon.inspect(simNow),cinnabarDome:cinnabarDome.inspect(),cinnabarKite:cinnabarKite.inspect(),cinnabarSpire:cinnabarSpire.inspect(),coupletTrial:coupletTrial.inspect(),continuityStation:{...continuityStation.inspect(),footprint:footprints.inspect(continuityStation.id),occupants:footprintOccupancy.inspect(continuityStation.id),apertures:apertureSystem.inspect(),lastObservation,lastAnalysis}});
const systems={renderSync,cameras,orbit,lights,transport,lighthuggerInterior,lighthuggerExterior,meteors,meteorWeather,impacts,bearings,extruder,cinnabarAndCinnamon,cinnabarDome,cinnabarKite,cinnabarSpire,coupletTrial,continuityStation,footprints,footprintOccupancy,apertureSystem,observationAnalysis,spatialProbes,locusLedger,locusDisplay,locusChronograph},entities={locus,interiorTarget,continuityStation:continuityStation.id,overviewCamera,interiorCamera,skyLight,keyLight,fillLight};
globalThis.crucible={sea:{show:()=>water.visible=true,hide:()=>water.visible=false,toggle:()=>water.visible=!water.visible,inspect:()=>({visible:water.visible,level:waterLevel,bottom:waterBottom,radius:waterRadius})},terrain:{reset:()=>{terrain.loadLandCandidate();transport.reset();transport.setEnabled(false);lastImpactTarget=meteors.targetAt();return terrain.inspect()},raise:(x,z,options={})=>terrain.raise({x,z},options),carve:(x,z,options={})=>terrain.excavate({x,z},options),inspect:()=>terrain.inspect()},transport:{reset:()=>transport.reset(),inject:(amount=1,x,z)=>transport.inject(amount,x,z),fillRegion:options=>transport.fillRegion(options),setSource:options=>transport.setSource(options),setSources:sources=>transport.setSources(sources),cycleDisplayDensity:()=>transport.cycleDisplayDensity(),setDisplayDensity:level=>transport.setDisplayDensity(level),inspect:()=>transport.inspect()},science:{enter:()=>setScienceMode(true),exit:()=>setScienceMode(false),toggle:toggleScienceMode,inspect:()=>({active:scienceMode,baseline:"S0"})},lighthugger:{enter:()=>setLighthuggerInterior(true),exit:()=>setLighthuggerInterior(false),inspect:()=>lighthuggerInterior.inspect()},cinnabarAndCinnamon:{replay:()=>cinnabarAndCinnamon.replay(),inspect:()=>cinnabarAndCinnamon.inspect(simNow),advance:()=>coupletTrial.advance(),stow:()=>setCinnabarPacked(true),deploy:()=>setCinnabarPacked(false),togglePacked:toggleCinnabarPacked},spawnMatter,spawnBearings:(count=25000)=>bearings.spawnBatch(count),meteor:callImpact,groundHeight:terrain.groundHeight,runSpatialProbes:()=>lastProbeResults=spatialProbes.run(),spatialProbeResults:()=>lastProbeResults,locusLog:()=>locusLedger.snapshot(),exportLocusLog:()=>locusLedger.download(),inspect};
installDebugApi({world,components,terrain,three,systems,entities,water,inspect});
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let tapStart=null;
three.renderer.domElement.addEventListener("pointerdown",event=>{if(event.pointerType==="mouse"&&event.button!==0)return;tapStart={id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()};});
three.renderer.domElement.addEventListener("pointerup",event=>{if(!tapStart||tapStart.id!==event.pointerId)return;const moved=Math.hypot(event.clientX-tapStart.x,event.clientY-tapStart.y),elapsed=performance.now()-tapStart.time;tapStart=null;if(moved>8||elapsed>450)return;const rect=three.renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height)*2+1);const cameraView=components.CameraView.get(cameras.activeId());if(!cameraView?.camera)return;raycaster.setFromCamera(pointer,cameraView.camera);if(insideLighthugger)return;const lighthuggerHit=raycaster.intersectObject(lighthuggerExterior.object,true)[0];if(lighthuggerHit){setLighthuggerInterior(true);return;}const stowHit=locusDisplay.inspect().open?raycaster.intersectObject(locusDisplay.stowButton,true)[0]:null;if(stowHit){toggleCinnabarPacked();return;}const trialHit=raycaster.intersectObject(coupletTrial.object,true)[0];if(trialHit){coupletTrial.advance();return;}const stationHit=raycaster.intersectObject(continuityStation.object,true)[0];if(stationHit){locusDisplay.toggle();return;}const hit=raycaster.intersectObject(terrain.mesh,true)[0];if(hit&&terrain.insideMaterial(hit.point.x,hit.point.z)){const p=hit.point;if(devUI.tool==="raise"){terrain.raise(p,{radius:1.15,height:.55});lastImpactTarget=meteors.targetAt(p.x,p.z);}else if(devUI.tool==="carve"){terrain.excavate(p,{radius:.82,depth:.42});lastImpactTarget=meteors.targetAt(p.x,p.z);}else if(devUI.tool==="bearing-packet"){bearings.spawnBatch(25,new THREE.Vector3(p.x,p.y+.35,p.z));}else if(devUI.tool==="source"||devUI.tool==="source-thick"){transport.reset();transport.setSource({x:p.x,z:p.z,rate:devUI.tool==="source-thick"?2.7:.9});transport.setEnabled(true);}else callImpact(meteors.targetAt(p.x,p.z));}});
diagnostics.ready();