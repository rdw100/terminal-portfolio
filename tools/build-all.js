const { execSync } = require('child_process');
const path = require('path');

console.log("Running full build pipeline...\n");

function run(script) {
  const fullPath = path.join(__dirname, script);
  console.log(`➡️  Running ${script}...`);
  try {
    execSync(`node "${fullPath}"`, { stdio: 'inherit' });
    console.log(`✔️  Completed ${script}\n`);
  } catch (err) {
    console.error(`❌ Failed: ${script}`);
    process.exit(1);
  }
}

const scripts = [
  'build-command-registry.js',
  'build-about.js',
  'build-help.js',
  'build-welcome.js',
  'build-lighthouse.js',
  'build-resume.js',
  'build-projects.js',
  'build-socials.js'
];

scripts.forEach(run);

console.log("🎉 All build scripts completed successfully!");
