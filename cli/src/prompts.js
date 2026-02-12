const prompts = require('prompts');
const path = require('path');

async function askQuestions() {
  // Exit gracefully on Ctrl+C
  const onCancel = () => {
    console.log('\nAborted.');
    process.exit(0);
  };

  const answers = await prompts([
    {
      type: 'select',
      name: 'tool',
      message: 'What AI coding tool are you using?',
      choices: [
        { title: 'Claude Code', value: 'Claude Code' },
        { title: 'Cursor', value: 'Cursor' },
        { title: 'Windsurf', value: 'Windsurf' },
        { title: 'Kiro', value: 'Kiro' },
        { title: 'Warp', value: 'Warp' },
        { title: 'Other', value: 'Other' },
      ],
    },
    {
      type: 'select',
      name: 'stack',
      message: "What's your primary stack?",
      choices: [
        { title: 'Next.js + Supabase', value: 'Next.js + Supabase' },
        { title: 'Next.js + other', value: 'Next.js + other' },
        { title: 'React + Node', value: 'React + Node' },
        { title: 'Python', value: 'Python' },
        { title: 'Other', value: 'Other' },
      ],
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name?',
      initial: path.basename(process.cwd()),
    },
  ], { onCancel });

  // If prompts were cancelled (empty object), exit
  if (!answers.tool && answers.tool !== 0) {
    process.exit(0);
  }

  return answers;
}

module.exports = { askQuestions };
