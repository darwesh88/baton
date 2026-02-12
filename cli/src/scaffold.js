const fs = require('fs');
const path = require('path');
const { IDE_MAP, STACK_MAP, STACK_LABEL } = require('./constants');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function scaffold(dest, { tool, stack, projectName }) {
  const results = [];

  // 1. Check for existing BATON_v3.1.md
  const batonDest = path.join(dest, 'BATON_v3.1.md');
  if (fs.existsSync(batonDest)) {
    console.log('\n  ! BATON_v3.1.md already exists — skipping (delete it first to overwrite)');
  } else {
    fs.copyFileSync(path.join(TEMPLATES_DIR, 'BATON_v3.1.md'), batonDest);
    results.push('Copied BATON_v3.1.md');
  }

  // 2. Copy skills/
  const skillsSrc = path.join(TEMPLATES_DIR, 'skills');
  const skillsDest = path.join(dest, 'skills');

  // Always copy core/ and patterns/
  copyDir(path.join(skillsSrc, 'core'), path.join(skillsDest, 'core'));
  copyDir(path.join(skillsSrc, 'patterns'), path.join(skillsDest, 'patterns'));

  // Create domains/ (empty, for user to add)
  fs.mkdirSync(path.join(skillsDest, 'domains'), { recursive: true });

  // Copy stack-specific skills
  const stackSkills = STACK_MAP[stack] || [];
  if (stackSkills.length > 0) {
    fs.mkdirSync(path.join(skillsDest, 'stacks'), { recursive: true });
    for (const file of stackSkills) {
      const src = path.join(skillsSrc, 'stacks', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(skillsDest, 'stacks', file));
      }
    }
  } else {
    fs.mkdirSync(path.join(skillsDest, 'stacks'), { recursive: true });
  }

  const coreCount = fs.readdirSync(path.join(skillsDest, 'core')).length;
  const stackCount = stackSkills.length;
  const patternCount = fs.readdirSync(path.join(skillsDest, 'patterns')).length;
  results.push(`Copied skills/ (${coreCount} core + ${stackCount} stack + ${patternCount} pattern)`);

  // 3. Create .ai-rules/ with stub files
  const aiRulesDir = path.join(dest, '.ai-rules');
  fs.mkdirSync(aiRulesDir, { recursive: true });
  const stubs = {
    'project.md': `# Project Rules — ${projectName}\n\n> AI will fill this during discovery session.\n`,
    'tech-stack.md': `# Tech Stack — ${projectName}\n\n> AI will fill this during discovery session.\n`,
    'patterns.md': `# Patterns & Quirks — ${projectName}\n\n> AI adds entries here as it discovers gotchas and solutions.\n`,
    'structure.md': `# Project Structure — ${projectName}\n\n> AI will fill this once the project scaffolding is set up.\n`,
  };
  for (const [file, content] of Object.entries(stubs)) {
    fs.writeFileSync(path.join(aiRulesDir, file), content);
  }
  results.push('Created .ai-rules/ (4 stub files)');

  // 4. Create handoff/ with .gitkeep
  const handoffDir = path.join(dest, 'handoff');
  fs.mkdirSync(handoffDir, { recursive: true });
  fs.writeFileSync(path.join(handoffDir, '.gitkeep'), '');
  results.push('Created handoff/');

  // 5. Create IDE config file from template
  const ide = IDE_MAP[tool] || IDE_MAP['Other'];
  const templatePath = path.join(TEMPLATES_DIR, 'ide', ide.template);
  let templateContent = fs.readFileSync(templatePath, 'utf-8');

  // Replace template variables
  const stackLabel = STACK_LABEL[stack] || '';
  templateContent = templateContent
    .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
    .replace(/\{\{STACK\}\}/g, stackLabel)
    .replace(/\{\{CURRENT_SESSION\}\}/g, '1')
    .replace(/\{\{NEXT_SESSION\}\}/g, '2')
    .replace(/\{\{BUILD_COMMAND\}\}/g, 'npm run build')
    .replace(/\{\{DEV_COMMAND\}\}/g, 'npm run dev')
    .replace(/\{\{TYPECHECK_COMMAND\}\}/g, 'npx tsc --noEmit')
    .replace(/\{\{PROJECT_RULES\}\}/g, '<!-- AI will add project-specific rules here -->');

  fs.writeFileSync(path.join(dest, ide.file), templateContent);
  results.push(`Created ${ide.file}`);

  // 6. Create PROGRESS.md, BACKLOG.md, FEATURES.md
  fs.writeFileSync(path.join(dest, 'PROGRESS.md'),
    `# Progress — ${projectName}\n\n## Sessions\n\n_No sessions yet. AI will log progress here._\n`);
  fs.writeFileSync(path.join(dest, 'BACKLOG.md'),
    `# Backlog — ${projectName}\n\n_Deferred items go here. AI adds items during sessions._\n`);
  fs.writeFileSync(path.join(dest, 'FEATURES.md'),
    `# Features — ${projectName}\n\n_User-facing feature documentation. AI updates this as features ship._\n`);
  results.push('Created PROGRESS.md, BACKLOG.md, FEATURES.md');

  return results;
}

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

module.exports = { scaffold };
