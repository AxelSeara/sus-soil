// Ejecuta: node scripts/optimize-images.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const roots = [
  path.resolve('public'),      // estáticos servidos tal cual
  path.resolve('src/assets'),  // imágenes importadas en React
];

const exts = new Set(['.png', '.jpg', '.jpeg']);

// Ajusta calidades (buenos defaults)
const WEBP_QUALITY = 78;  // 0–100 (75–82 suele ir bien)
const AVIF_QUALITY = 50;  // 0–100 (35–55 suele ir bien)
const MAKE_AVIF = true;   // si no quieres AVIF, pon false

async function* walk(dir) {
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); }
  catch { return; }
  for (const d of entries) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function exists(p) {
  try { await fs.stat(p); return true; } catch { return false; }
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return;

  // (opcional) salta iconos muy pequeños
  const { size } = await fs.stat(file);
  if (size < 2 * 1024) return; // <2KB: ignora

  const base = file.slice(0, -ext.length);
  const outWebp = `${base}.webp`;
  const outAvif = `${base}.avif`;

  const srcStat = await fs.stat(file);
  const needWebp = !(await exists(outWebp)) || (await fs.stat(outWebp)).mtimeMs < srcStat.mtimeMs;
  const needAvif = MAKE_AVIF && ( !(await exists(outAvif)) || (await fs.stat(outAvif)).mtimeMs < srcStat.mtimeMs );

  if (!needWebp && !needAvif) return;

  // Usa un pipeline por archivo
  const img = sharp(file, { failOn: 'none' });

  if (needWebp) {
    await img
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 5 }) // effort: 0–6 (más lento = más compresión)
      .toFile(outWebp);
    console.log('→ webp:', path.relative(process.cwd(), outWebp));
  }
  if (needAvif) {
    await img
      .clone()
      .avif({ quality: AVIF_QUALITY, effort: 4 }) // effort: 0–9
      .toFile(outAvif);
    console.log('→ avif:', path.relative(process.cwd(), outAvif));
  }
}

(async () => {
  for (const root of roots) {
    for await (const file of walk(root)) {
      try {
        await optimizeOne(file);
      } catch (e) {
        console.warn('⚠️', file, e.message);
      }
    }
  }
  console.log('✅ Imágenes optimizadas/convertidas.');
})();