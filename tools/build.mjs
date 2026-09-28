import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,".."),dist=resolve(root,"dist");
await mkdir(dist,{recursive:true});

// Crucible currently boots from the proven Foundry runtime. Keep this copy path intentionally
// boring: the donor is the executable authority; no bundling, rewriting, or ECS overlay occurs here.
const source=resolve(root,"reference","FOUNDRY_200K.html");
const built=await readFile(source,"utf8");
await writeFile(resolve(dist,"index.html"),built,"utf8");
console.log(`Built dist/index.html (${Buffer.byteLength(built)} bytes) from exact Foundry 200K baseline`);
