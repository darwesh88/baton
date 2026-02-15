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

  // Always copy domains/
  copyDir(path.join(skillsSrc, 'domains'), path.join(skillsDest, 'domains'));

  // Copy stack-specific skills (each is a directory with SKILL.md)
  const stackSkills = STACK_MAP[stack] || [];
  fs.mkdirSync(path.join(skillsDest, 'stacks'), { recursive: true });
  for (const skillDir of stackSkills) {
    const src = path.join(skillsSrc, 'stacks', skillDir);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(skillsDest, 'stacks', skillDir));
    }
  }

  const coreCount = fs.readdirSync(path.join(skillsDest, 'core')).filter(
    f => fs.statSync(path.join(skillsDest, 'core', f)).isDirectory()
  ).length;
  const stackCount = stackSkills.length;
  const patternCount = fs.readdirSync(path.join(skillsDest, 'patterns')).filter(
    f => fs.statSync(path.join(skillsDest, 'patterns', f)).isDirectory()
  ).length;
  const domainCount = fs.readdirSync(path.join(skillsDest, 'domains')).filter(
    f => fs.statSync(path.join(skillsDest, 'domains', f)).isDirectory()
  ).length;
  results.push(`Copied skills/ (${coreCount} core + ${stackCount} stack + ${patternCount} pattern + ${domainCount} domain)`);

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
  const stackLabel = STACK_LABEL[stack] || '';

  if (ide.template) {
    // Template-based IDE config (Claude Code, Cursor, Windsurf, etc.)
    const templatePath = path.join(TEMPLATES_DIR, 'ide', ide.template);
    let templateContent = fs.readFileSync(templatePath, 'utf-8');

    templateContent = templateContent
      .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
      .replace(/\{\{STACK\}\}/g, stackLabel)
      .replace(/\{\{CURRENT_SESSION\}\}/g, '1')
      .replace(/\{\{NEXT_SESSION\}\}/g, '2')
      .replace(/\{\{BUILD_COMMAND\}\}/g, 'npm run build')
      .replace(/\{\{DEV_COMMAND\}\}/g, 'npm run dev')
      .replace(/\{\{TYPECHECK_COMMAND\}\}/g, 'npx tsc --noEmit')
      .replace(/\{\{PROJECT_RULES\}\}/g, '<!-- AI will add project-specific rules here -->');

    const idePath = path.join(dest, ide.file);
    if (fs.existsSync(idePath)) {
      const altIdeFile = getNextBatonFilename(dest, ide.file);
      fs.writeFileSync(path.join(dest, altIdeFile), templateContent);
      results.push(`${ide.file} exists - created ${altIdeFile} (review and merge manually if needed)`);
    } else {
      fs.writeFileSync(idePath, templateContent);
      results.push(`Created ${ide.file}`);
    }
  } else {
    // Codex — uses AGENTS.md directly (already generated in step 6)
    results.push('Using AGENTS.md as IDE config (Codex)');
  }

  // 6. Generate AGENTS.md (universal standard for AI coding agents)
  const agentsMd = generateAgentsMd(projectName, stackLabel);
  const agentsPath = path.join(dest, 'AGENTS.md');
  if (fs.existsSync(agentsPath)) {
    const altAgentsFile = getNextAgentsFilename(dest);
    fs.writeFileSync(path.join(dest, altAgentsFile), agentsMd);
    results.push(`AGENTS.md exists - created ${altAgentsFile} (review and merge manually if needed)`);
  } else {
    fs.writeFileSync(agentsPath, agentsMd);
    results.push('Generated AGENTS.md');
  }

  // 7. Create PROGRESS.md, BACKLOG.md, FEATURES.md (non-destructive)
  const docsToCreate = {
    'PROGRESS.md': `# Progress — ${projectName}\n\n## Sessions\n\n_No sessions yet. AI will log progress here._\n`,
    'BACKLOG.md': `# Backlog — ${projectName}\n\n_Deferred items go here. AI adds items during sessions._\n`,
    'FEATURES.md': `# Features — ${projectName}\n\n_User-facing feature documentation. AI updates this as features ship._\n`,
  };

  for (const [file, content] of Object.entries(docsToCreate)) {
    const filePath = path.join(dest, file);
    if (fs.existsSync(filePath)) {
      const altFile = getNextBatonFilename(dest, file);
      fs.writeFileSync(path.join(dest, altFile), content);
      results.push(`${file} exists - created ${altFile} (review and merge manually if needed)`);
    } else {
      fs.writeFileSync(filePath, content);
      results.push(`Created ${file}`);
    }
  }

  return results;
}

function generateAgentsMd(projectName, stack) {
  const stackLine = stack ? `- **Stack:** ${stack}` : '- **Stack:** (to be determined during Session Zero)';
  return `# AGENTS.md

This file provides guidance to AI coding agents working with this repository.

## Project Overview

${projectName} — bootstrapped with the Baton protocol.

${stackLine}
- **Protocol:** Baton v3.1 (AI orchestration protocol)
- **Architecture:** See \`.ai-rules/\` for project context (generated during Session Zero)

## Getting Started

This project uses the Baton protocol for AI-assisted development.

1. Read \`BATON_v3.1.md\` — the orchestration protocol
2. Read \`.ai-rules/\` — project context files (AI-generated)
3. Read \`skills/\` — curated best practices for this stack
4. Check \`handoff/\` — session handoff files for continuity

## Build & Development Commands

\`\`\`bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build
\`\`\`

## Code Style & Conventions

See \`.ai-rules/patterns.md\` for project-specific patterns.
See \`skills/core/\` for universal rules (security, testing, anti-overengineering).

## Project Structure

\`\`\`
BATON_v3.1.md          # AI orchestration protocol
.ai-rules/             # Project context (AI-generated)
skills/                # Best practice skills
  core/                # Universal rules
  stacks/              # Stack-specific patterns
  patterns/            # Implementation patterns
handoff/               # Session handoff files
PROGRESS.md            # Session progress log
BACKLOG.md             # Deferred items
\`\`\`

## Agent Boundaries

This project follows the Baton protocol. Key rules:
- Read BATON_v3.1.md before starting work
- Check skills/ before web searching
- Document discoveries in .ai-rules/patterns.md
- Create handoff files at session end
- Update PROGRESS.md after each session
`;
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

function getNextAgentsFilename(dest) {
  let index = 2;
  let name = `AGENTS${index}.md`;
  while (fs.existsSync(path.join(dest, name))) {
    index += 1;
    name = `AGENTS${index}.md`;
  }
  return name;
}

function getNextBatonFilename(dest, baseFile) {
  let index = 1;
  let name = `${baseFile}.baton.new`;
  while (fs.existsSync(path.join(dest, name))) {
    index += 1;
    name = `${baseFile}.baton${index}.new`;
  }
  return name;
}

module.exports = { scaffold };
