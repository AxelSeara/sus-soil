import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const BASE_URL = 'http://127.0.0.1:4173';
const ROUTES = [
  '/',
  '/project/about',
  '/news',
  '/resources/materials',
  '/resources/practice-abstracts',
  '/contact',
];
const CONSENT_KEY = 'siteCookieConsentV2';
const CONSENT_VALUE = JSON.stringify({
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // ignore and retry
    }
    await wait(400);
  }
  throw new Error(`Timed out waiting for preview server: ${url}`);
}

function waitForExit(processHandle) {
  return new Promise((resolve) => {
    processHandle.once('exit', (code, signal) => {
      resolve({ code, signal });
    });
  });
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  const normalized = route.replace(/^\/+/, '');
  return path.join(distDir, normalized, 'index.html');
}

async function prerenderRoutes() {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('Prerender skipped (SKIP_PRERENDER=1).');
    return;
  }

  const preview = spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
    }
  );
  let previewLogs = '';
  preview.stdout?.on('data', (chunk) => {
    previewLogs += String(chunk);
  });
  preview.stderr?.on('data', (chunk) => {
    previewLogs += String(chunk);
  });

  let browser;
  try {
    const exitPromise = waitForExit(preview);
    await Promise.race([
      waitForServer(BASE_URL),
      exitPromise.then(({ code, signal }) => {
        throw new Error(
          `Preview server exited before prerender (code=${code}, signal=${signal}).\n${previewLogs}`
        );
      }),
    ]);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.evaluateOnNewDocument((key, value) => {
      localStorage.setItem(key, value);
    }, CONSENT_KEY, CONSENT_VALUE);
    await page.setViewport({ width: 1440, height: 900 });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('#root', { timeout: 10000 });
      await wait(500);

      let html = await page.content();
      if (!/^<!doctype html>/i.test(html)) {
        html = `<!doctype html>\n${html}`;
      }

      const outputPath = outputPathForRoute(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, 'utf8');
      console.log(`Prerendered: ${route} -> ${path.relative(projectRoot, outputPath)}`);
    }
  } finally {
    if (browser) await browser.close();
    if (preview && !preview.killed) {
      preview.kill('SIGTERM');
    }
  }
}

prerenderRoutes().catch((error) => {
  const strict = process.env.STRICT_PRERENDER === '1';
  if (strict) {
    console.error('Prerender failed (strict mode):', error);
    process.exit(1);
  } else {
    console.warn('Prerender skipped due to environment/runtime issue:', error?.message || error);
    process.exit(0);
  }
});
