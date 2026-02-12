// IDE tool → config file mapping
const IDE_MAP = {
  'Claude Code': { file: 'CLAUDE.md', template: 'CLAUDE.md.template' },
  'Cursor': { file: '.cursorrules', template: 'cursorrules.template' },
  'Windsurf': { file: '.windsurfrules', template: 'cursorrules.template' },
  'Kiro': { file: 'CLAUDE.md', template: 'CLAUDE.md.template' },
  'Warp': { file: 'CLAUDE.md', template: 'CLAUDE.md.template' },
  'Other': { file: 'CLAUDE.md', template: 'CLAUDE.md.template' },
};

// Stack → which skill files to copy into stacks/
const STACK_MAP = {
  'Next.js + Supabase': ['nextjs.md', 'supabase.md'],
  'Next.js + other': ['nextjs.md'],
  'React + Node': [],
  'Python': [],
  'Other': [],
};

// Stack → display name for templates
const STACK_LABEL = {
  'Next.js + Supabase': 'Next.js, Supabase',
  'Next.js + other': 'Next.js',
  'React + Node': 'React, Node.js',
  'Python': 'Python',
  'Other': '',
};

module.exports = { IDE_MAP, STACK_MAP, STACK_LABEL };
