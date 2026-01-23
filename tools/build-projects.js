/**
 * Builds the projects.html file from config.json by generating an HTML list.
 */
const fs = require('fs');
const path = require('path');

console.log("Running build-projects.js...");

try {
  const configPath = path.resolve('./src/config/config.json');
  const outputDir = path.resolve('./src/content');
  const outputPath = path.join(outputDir, 'projects.html');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const username = config.github.username;
  const projects = config.github.projects;

  const listHtml = projects
    .map((name, i) => {
      const url = `https://github.com/${username}/${name}`;
      return `<div>&nbsp;&nbsp;&nbsp;&nbsp;${i + 1}. <a href="${url}" target="_blank" rel="noopener">${name}</a></div>`;
    })
    .join('');

  const html = `
<div class="section-title"><h2>Projects</h2></div>
<div class="project-list">
  ${listHtml}
</div>
`;

  fs.writeFileSync(outputPath, html.trim(), 'utf8');

  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
