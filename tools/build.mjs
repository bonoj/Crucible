import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,".."),dist=resolve(root,"dist");
await mkdir(dist,{recursive:true});

// Crucible currently boots from the proven Foundry runtime. The donor remains executable authority.
// The build may add observational provenance only: source identity must always be visible in candidates.
const source=resolve(root,"reference","FOUNDRY_200K.html");
let built=await readFile(source,"utf8");
const commit=process.env.GITHUB_SHA||"local";
const short=commit.slice(0,7);
const provenance=`<div id="crucible-build-id" style="position:fixed;z-index:2147483647;right:10px;top:42px;padding:5px 8px;border:1px solid #31413a55;border-radius:7px;background:#eee7d1ee;color:#26352e;font:800 10px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;pointer-events:none;box-shadow:0 2px 10px #0002">BUILD ${short}</div>`;
built=built.replace("</body>",provenance+"</body>");
await writeFile(resolve(dist,"index.html"),built,"utf8");
console.log(`Built dist/index.html (${Buffer.byteLength(built)} bytes) from Foundry 200K baseline at ${commit}`);
