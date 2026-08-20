import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = resolve(root, 'node_modules', 'gsap', 'dist');
const targetRoot = resolve(root, 'assets', 'vendor', 'gsap');

await mkdir(targetRoot, { recursive: true });
await copyFile(resolve(sourceRoot, 'gsap.min.js'), resolve(targetRoot, 'gsap.min.js'));
await copyFile(resolve(sourceRoot, 'ScrollTrigger.min.js'), resolve(targetRoot, 'ScrollTrigger.min.js'));
