// tools/build-help.js
const fs = require('fs');
const path = require('path');
const marked = require('marked');

console.log("Running build-help.js...");

try {
  const helpMdPath = path.resolve('src/content/help.md');
  const registryJsonPath = path.resolve('src/content/commandRegistry.json');
  const outputDir = path.resolve('src/content');
  const outputPath = path.join(outputDir, 'help.html');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load markdown template
  let markdown = fs.readFileSync(helpMdPath, 'utf8');

  // Load registry snapshot
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));

  // Group commands by category
  const groups = {};
  for (const [name, meta] of Object.entries(registry)) {
    const category = meta.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push([name, meta]);
  }

  const sortedCategories = Object.keys(groups).sort();

  // Build command list markdown
  let commandsMd = "";
  for (const category of sortedCategories) {
    commandsMd += `\n### ${category}\n\n`;

    const commands = groups[category].sort(([a], [b]) => a.localeCompare(b));

    for (const [name, meta] of commands) {
      commandsMd += `- **${name}** — ${meta.description || ""}\n`;
    }

    commandsMd += `\n`;
  }

  // Replace placeholder
  markdown = markdown.replace('{{commands}}', commandsMd);

  // Convert markdown → HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  fs.writeFileSync(outputPath, html.trim(), 'utf8');
  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
