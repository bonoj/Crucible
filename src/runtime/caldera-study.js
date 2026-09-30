// Caldera A-Z teaching study.
// Experimental evidence surface: 26 deliberately different interpretations of one human-painted caldera.
// This is not a reusable terrain primitive. Keep the variants separate until human selection earns one.
export function createCalderaStudy({THREE,scene,terrain}){
  const labels=new THREE.Group();labels.name="caldera-study-labels";scene.add(labels);
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const xs=[-6.25,-3.75,-1.25,1.25,3.75,6.25],zs=[-5,-2.5,0,2.5,5];
  const centers=[...letters].map((letter,i)=>({letter,x:xs[i%6],z:zs[Math.floor(i/6)]}));
  const profiles=[
    "balanced","broad-shallow","narrow-deep","high-rim","low-rim","flat-floor",
    "sharp-lip","soft-lip","terraced","central-uplift","eccentric","elliptic",
    "breached-east","breached-west","horseshoe","scalloped","double-basin","nested",
    "slumped-north","slumped-south","asymmetric-rim","knife-bowl","wide-apron","inner-ring",
    "offset-vent","ragged"
  ];
  function smooth(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}
  function gauss(x,c,w){const q=(x-c)/w;return Math.exp(-q*q)}
  function displacement(i,nx,nz){
    const r=Math.hypot(nx,nz),a=Math.atan2(nz,nx);
    let bowl=-1.05*Math.pow(Math.max(0,1-r/.68),1.45),rim=.62*gauss(r,.82,.13),d=bowl+rim;
    switch(i){
      case 1:d=-.58*Math.pow(Math.max(0,1-r/.88),1.2)+.34*gauss(r,.9,.18);break;
      case 2:d=-1.55*Math.pow(Math.max(0,1-r/.5),1.05)+.5*gauss(r,.68,.1);break;
      case 3:d=bowl+1.02*gauss(r,.8,.11);break;
      case 4:d=-.9*Math.pow(Math.max(0,1-r/.72),1.5)+.22*gauss(r,.84,.17);break;
      case 5:d=-(r<.38?.82:.82*Math.pow(Math.max(0,1-(r-.38)/.34),1.5))+.55*gauss(r,.82,.12);break;
      case 6:d=-1.02*Math.pow(Math.max(0,1-r/.7),1.3)+.72*gauss(r,.74,.065);break;
      case 7:d=-.92*Math.pow(Math.max(0,1-r/.76),1.8)+.46*gauss(r,.84,.22);break;
      case 8:d=bowl+.3*gauss(r,.42,.07)+.58*gauss(r,.82,.11);break;
      case 9:d=bowl+rim+.5*gauss(r,0,.18);break;
      case 10:{const rr=Math.hypot(nx-.18,nz+.1);d=-1.1*Math.pow(Math.max(0,1-rr/.64),1.35)+.58*gauss(r,.82,.13);break}
      case 11:{const rr=Math.hypot(nx/.72,nz/1.18);d=-1.0*Math.pow(Math.max(0,1-rr/.68),1.4)+.55*gauss(rr,.82,.13);break}
      case 12:d=bowl+rim*(1-smooth(-.55,.18,Math.cos(a)));break;
      case 13:d=bowl+rim*(1-smooth(-.55,.18,-Math.cos(a)));break;
      case 14:d=bowl+rim*Math.max(0,.45-.55*Math.cos(a));break;
      case 15:d=bowl+rim*(.72+.28*Math.sin(5*a));break;
      case 16:{const r1=Math.hypot(nx-.22,nz),r2=Math.hypot(nx+.25,nz);d=-.78*gauss(r1,0,.34)-.78*gauss(r2,0,.34)+.54*gauss(r,.86,.13);break}
      case 17:d=-.78*gauss(r,0,.48)-.38*gauss(r,.38,.11)+.62*gauss(r,.84,.12);break;
      case 18:d=bowl+rim*(1-.72*Math.max(0,Math.sin(a)))+.32*gauss(Math.hypot(nx,nz-.55),0,.28);break;
      case 19:d=bowl+rim*(1-.72*Math.max(0,-Math.sin(a)))+.32*gauss(Math.hypot(nx,nz+.55),0,.28);break;
      case 20:d=bowl+rim*(.52+.48*(.5+.5*Math.cos(a-.7)));break;
      case 21:d=-1.28*Math.pow(Math.max(0,1-r/.66),.62)+.6*gauss(r,.76,.085);break;
      case 22:d=-.72*Math.pow(Math.max(0,1-r/.9),1.5)+.28*gauss(r,.72,.11)+.22*gauss(r,1.02,.2);break;
      case 23:d=bowl+.38*gauss(r,.46,.07)+.62*gauss(r,.82,.12);break;
      case 24:{const rr=Math.hypot(nx+.25,nz-.18);d=-1.15*gauss(rr,0,.34)+.55*gauss(r,.84,.13);break}
      case 25:{const wobble=r*(1+.13*Math.sin(3*a)+.08*Math.sin(7*a+1.2));d=-.98*Math.pow(Math.max(0,1-wobble/.7),1.3)+.58*gauss(wobble,.83,.14);break}
    }
    const edge=1-smooth(.9,1.16,r);return d*edge;
  }
  function makeLabel(letter,x,z){
    const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d");g.font="700 82px system-ui";g.textAlign="center";g.textBaseline="middle";g.fillStyle="white";g.strokeStyle="rgba(0,0,0,.8)";g.lineWidth=12;g.strokeText(letter,64,66);g.fillText(letter,64,66);
    const tex=new THREE.CanvasTexture(c),mat=new THREE.SpriteMaterial({map:tex,depthTest:false,transparent:true}),s=new THREE.Sprite(mat);s.scale.set(.62,.62,1);s.position.set(x,terrain.groundHeight(x,z)+.72,z);s.renderOrder=20;labels.add(s);
  }
  function clear(){for(const s of [...labels.children]){labels.remove(s);s.material.map?.dispose();s.material.dispose()}labels.visible=false}
  function apply(){
    clear();labels.visible=true;
    const f=terrain.field,meta=terrain.inspect(),[nx,ny,nz]=meta.grid,[sx,sy,sz]=meta.volume.spacing,[minx,miny,minz]=meta.volume.min;
    // Every specimen gets its own profile. We alter signed density uniformly through Y,
    // which displaces the local zero-set without imposing a mesh or heightfield.
    for(let z=1;z<nz-1;z++)for(let x=1;x<nx-1;x++){
      const wx=minx+x*sx,wz=minz+z*sz;
      for(let i=0;i<centers.length;i++){
        const c=centers[i],radius=1.08,dx=(wx-c.x)/radius,dz=(wz-c.z)/radius;
        if(Math.abs(dx)>1.2||Math.abs(dz)>1.2)continue;
        const delta=displacement(i,dx,dz);
        if(Math.abs(delta)<1e-5)continue;
        for(let y=1;y<ny-1;y++)f[x+nx*(y+ny*z)]+=delta;
      }
    }
    terrain.rebuild();
    for(const c of centers)makeLabel(c.letter,c.x,c.z);
    return centers.map((c,i)=>({letter:c.letter,approach:profiles[i],x:c.x,z:c.z}));
  }
  return{apply,clear,inspect:()=>centers.map((c,i)=>({...c,approach:profiles[i]}))};
}
