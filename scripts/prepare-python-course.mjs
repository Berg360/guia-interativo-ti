import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = resolve(root, 'public/python-course/vendor');
await mkdir(vendor, { recursive: true });

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

const tailwindCli = resolve(root, 'node_modules/tailwindcss/lib/cli.js');
if (await exists(tailwindCli)) {
  execFileSync(process.execPath, [
    tailwindCli,
    '-c', resolve(root, 'tailwind.config.cjs'),
    '-i', resolve(root, 'src/python-course.css'),
    '-o', resolve(vendor, 'tailwind.css'),
    '--minify',
  ], { cwd: root, stdio: 'inherit' });
} else if (!(await exists(resolve(vendor, 'tailwind.css')))) {
  throw new Error('Tailwind não está instalado e o CSS local do curso Python não foi encontrado. Execute npm.cmd install.');
}

const chartSource = resolve(root, 'node_modules/chart.js/dist/chart.umd.js');
if (await exists(chartSource)) await cp(chartSource, resolve(vendor, 'chart.umd.js'));
else if (!(await exists(resolve(vendor, 'chart.umd.js')))) throw new Error('Chart.js não está instalado e o arquivo local não foi encontrado. Execute npm.cmd install.');

const pyodideSource = resolve(root, 'node_modules/pyodide');
const pyodideTarget = resolve(vendor, 'pyodide');
const pyodideRuntimeFiles = ['README.md', 'pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json'];
if (await exists(pyodideSource)) {
  await mkdir(pyodideTarget, { recursive: true });
  for (const name of pyodideRuntimeFiles) {
    const source = resolve(pyodideSource, name);
    if (!(await exists(source))) throw new Error(`Arquivo necessário do Pyodide não encontrado: ${name}.`);
    await cp(source, resolve(pyodideTarget, name), { force: true });
  }
  const allowedFiles = new Set(pyodideRuntimeFiles);
  for (const name of await readdir(pyodideTarget)) {
    if (!allowedFiles.has(name)) await rm(resolve(pyodideTarget, name), { recursive: true, force: true });
  }
} else if (!(await exists(resolve(pyodideTarget, 'pyodide.js')))) {
  throw new Error('Pyodide não está instalado e os arquivos locais não foram encontrados. Execute npm.cmd install.');
}
console.log('Recursos offline do curso de Python preparados.');
