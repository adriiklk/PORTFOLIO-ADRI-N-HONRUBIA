import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { projectPaths } from '../src/projectRoutes.mjs';
// Emit real entry files, so direct links also work on static hosts without rewrites.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const path of Object.values(projectPaths)) {
  const folder = new URL(`../dist${path}/`, import.meta.url);
  await mkdir(folder, { recursive: true });
  await writeFile(new URL('index.html', folder), html);
}
await writeFile(new URL('../dist/404.html', import.meta.url), html);
console.log(`Created ${Object.keys(projectPaths).length} project entry pages.`);
