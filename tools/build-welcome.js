// tools/build-welcome.js
const fs = require('fs');
const path = require('path');
const marked = require('marked');

console.log("Running build-welcome.js...");

try {
  const mdPath = path.resolve('src/content/welcome.md');
  const asciiPath = path.resolve('src/content/name.txt');
  const outputDir = path.resolve('src/content');
  const outputPath = path.join(outputDir, 'welcome.html');

  let markdown = fs.readFileSync(mdPath, 'utf8');
  const ascii = fs.readFileSync(asciiPath, 'utf8');

  // Inject ASCII
  const fenced = `\`\`\`ansi\n${ascii}\n\`\`\``;
  markdown = markdown.replace('${name_ascii}', fenced);

  // Convert markdown → HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  fs.writeFileSync(outputPath, html.trim(), 'utf8');
  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
