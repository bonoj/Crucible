export function createApertureSystem({world,components,footprints,occupancy,terrain}){
  const {Aperture,Footprint}=components;
  let sequence=0;
  function sample(ownerId,apertureId,now){
    const aperture=Aperture.get(apertureId);if(!aperture||aperture.owner!==ownerId||!Footprint.has(ownerId))return null;
    const footprint=footprints.inspect(ownerId),occupants=occupancy.inspect(ownerId);
    if(aperture.kind!=="scene-summary")return null;
    const center=footprint.center;
    const ground=terrain.groundHeight(center[0],center[2]);
    return{
      observationId:++sequence,
      sampledAtMs:Number(now.toFixed(1)),
      observer:ownerId,
      aperture:{id:apertureId,kind:aperture.kind},
      footprint:{center:[...center],radius:footprint.radius},
      measurement:{
        groundHeight:Number.isFinite(ground)?Number(ground.toFixed(3)):null,
        boundedOccupants:occupants.map(o=>({id:o.id,kind:o.bounds.kind}))
      }
    };
  }
  return{sample,inspect:()=>world.query(Aperture).map(id=>({id,...Aperture.get(id)}))};
}
