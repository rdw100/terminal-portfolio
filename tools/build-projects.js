// tools/build-projects.js
const fs = require('fs');
const path = require('path');

const configPath = path.resolve('./src/config/config.json');
const outputPath = path.resolve('./src/content/projects.html');

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const username = config.github.username;
const projects = config.github.projects;

const html = `
<div class="section-title">Projects</div>
<ul class="project-list">
  ${projects
    .map(
      (name) => `
    <li>
      <strong>${name}</strong><br />
      GitHub: https://github.com/${username}/${name}
    </li>`
    )
    .join('')}
</ul>
`;

fs.writeFileSync(outputPath, html.trim(), 'utf8');

console.log(`Generated: ${outputPath}`);
