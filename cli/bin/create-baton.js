#!/usr/bin/env node

const [major] = process.versions.node.split('.').map(Number);
if (major < 18) {
  console.error('Baton requires Node.js 18 or higher. You are running ' + process.version);
  process.exit(1);
}

require('../src/index.js');
