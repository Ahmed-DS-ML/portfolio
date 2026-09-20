import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { distFileForRoute, prerenderRoutes } from '../src/seo/paths.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const PORT = 4179;
const ORIGIN = `http://127.0.0.1:${PORT}`;

async function waitForServer(url, tries = 50) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Preview server did not start at ${url}`);
}

function startPreview() {
  const viteBin = join(root, 'node_modules/vite/bin/vite.js');
  const child = spawn(
    process.execPath,
    [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: process.platform !== 'win32',
    },
  );
  child.stdout?.on('data', (buf) => process.stdout.write(buf));
  child.stderr?.on('data', (buf) => process.stderr.write(buf));
  return child;
}

function stopPreview(child) {
  if (!child?.pid) return;
  child.stdout?.destroy();
  child.stderr?.destroy();
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    return;
  }
  try {
    process.kill(-child.pid, 'SIGKILL');
  } catch {
    try {
      child.kill('SIGKILL');
    } catch {
      /* ignore */
    }
  }
}

const routes = prerenderRoutes();
const preview = startPreview();

try {
  await waitForServer(ORIGIN);
  const browser = await chromium.launch({ headless: true });
  const snapshots = [];

  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForSelector('#main h1, h1', { timeout: 30000 });
    await page.waitForFunction(
      (path) => {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) return false;
        const href = canonical.getAttribute('href') || '';
        if (path === '/') {
          return href.endsWith('/') && !href.includes('/ar') && !href.includes('/project');
        }
        return href.endsWith(path) || href.endsWith(`${path}/`);
      },
      route,
      { timeout: 20000 }
    );
    const html = await page.content();
    snapshots.push({ route, html });
    await page.close();
    console.log(`prerendered ${route}`);
  }

  await browser.close();

  for (const { route, html } of snapshots) {
    const rel = distFileForRoute(route);
    const file = join(dist, rel);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, 'utf8');
  }

  console.log(`Wrote ${snapshots.length} prerendered routes`);
} finally {
  stopPreview(preview);
}
process.exit(process.exitCode ?? 0);
