#!/usr/bin/env node

/**
 * Pre-publish script: copies protocol + skills + IDE templates
 * from the repo root into cli/templates/ so they ship with the npm package.
 *
 * Run: node cli/scripts/prep-templates.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..', '..');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean templates dir
if (fs.existsSync(TEMPLATES_DIR)) {
  fs.rmSync(TEMPLATES_DIR, { recursive: true });
}
fs.mkdirSync(TEMPLATES_DIR, { recursive: true });

// 1. Copy BATON_v3.1.md
const batonSrc = path.join(REPO_ROOT, 'BATON_v3.1.md');
if (!fs.existsSync(batonSrc)) {
  console.error('Error: BATON_v3.1.md not found at repo root');
  process.exit(1);
}
fs.copyFileSync(batonSrc, path.join(TEMPLATES_DIR, 'BATON_v3.1.md'));
console.log('  Copied BATON_v3.1.md');

// 2. Copy skills/
const skillsSrc = path.join(REPO_ROOT, 'skills');
if (!fs.existsSync(skillsSrc)) {
  console.error('Error: skills/ not found at repo root');
  process.exit(1);
}
copyDir(skillsSrc, path.join(TEMPLATES_DIR, 'skills'));
console.log('  Copied skills/');

// 3. Copy IDE templates
const ideSrc = path.join(REPO_ROOT, 'templates', 'ide');
if (fs.existsSync(ideSrc)) {
  copyDir(ideSrc, path.join(TEMPLATES_DIR, 'ide'));
  console.log('  Copied IDE templates');
}

console.log('');
console.log('  Templates ready for publishing.');
