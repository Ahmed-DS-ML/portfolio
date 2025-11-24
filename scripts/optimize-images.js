#!/usr/bin/env node
// Optimize images in public/images — create .webp and .avif variants
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const full = path.join(IMAGES_DIR, file);
  const name = path.basename(file, ext);

  try {
    const img = sharp(full);
    // produce webp
    await img
      .clone()
      .webp({ quality: 75, effort: 6 })
      .toFile(path.join(IMAGES_DIR, `${name}.webp`));

    // produce avif
    await img
      .clone()
      .avif({ quality: 60 })
      .toFile(path.join(IMAGES_DIR, `${name}.avif`));

    console.log('converted', file);
  } catch (err) {
    console.error('error converting', file, err.message);
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(p);
    } else {
      const rel = path.relative(IMAGES_DIR, p).replace(/\\/g, '/');
      await processFile(rel);
    }
  }
}

walk(IMAGES_DIR).then(()=> console.log('done')).catch(console.error);
