const { askQuestions } = require('./prompts');
const { scaffold } = require('./scaffold');

async function main() {
  // Banner
  console.log('');
  console.log('  Baton — AI Orchestration Protocol v3.1');
  console.log('');

  // Prompts
  const answers = await askQuestions();
  console.log('');
  console.log('  Setting up Baton...');
  console.log('');

  // Scaffold
  const dest = process.cwd();
  const results = scaffold(dest, answers);

  // Success
  for (const r of results) {
    console.log(`  \u2713 ${r}`);
  }

  console.log('');
  console.log('  Done! Next steps:');
  console.log('    1. Open this folder in your AI coding tool');
  console.log('    2. Tell the AI: "Read BATON_v3.1.md and begin"');
  console.log('');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
