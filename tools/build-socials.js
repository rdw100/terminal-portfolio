/**
 * Builds the socials.html file from config.json by generating an HTML list of social links.
 */
const fs = require('fs');
const path = require('path');

console.log("Running build-socials.js...");

try {
  const configPath = path.resolve('./src/config/config.json');
  const outputDir = path.resolve('./src/content');
  const outputPath = path.join(outputDir, 'socials.html');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const socials = config.socials;

  const entries = Object.entries(socials).map(([key, url]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url
  }));

  const listHtml = entries
    .map((entry, i) => {
      return `<div>&nbsp;&nbsp;&nbsp;&nbsp;${i + 1}. <a href="${entry.url}" target="_blank" rel="noopener">${entry.name}</a></div>`;
    })
    .join('');

  const html = `
<div class="section-title"><h2>Socials</h2></div>
<div class="social-list">
  ${listHtml}
</div>
`;

  fs.writeFileSync(outputPath, html.trim(), 'utf8');

  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
