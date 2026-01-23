/**
 * Builds the about.html file from about.md by replacing placeholders
 * and converting Markdown to HTML.
 */
const fs = require('fs');
const path = require('path');
const marked = require('marked');

console.log("Running build-about.js...");

try {
  const configPath = path.resolve('./src/config/config.json');
  const aboutMdPath = path.resolve('./src/content/about.md');
  const asciiPath = path.resolve('./src/content/ascii.txt');
  const outputDir = path.resolve('./src/content');
  const outputPath = path.join(outputDir, 'about.html');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const markdown = fs.readFileSync(aboutMdPath, 'utf8');
  const ascii = fs.readFileSync(asciiPath, 'utf8');

  // Replace placeholders
  let processed = markdown
    .replace('${ascii}', `\`\`\`ascii\n${ascii}\n\`\`\``)
    .replace('${site.legacy_url}', config.site.legacy_url)
    .replace('${site.contact_email}', config.site.contact_email);

  // Convert markdown → HTML
  const html = marked.parse(processed, { mangle: false, headerIds: false });

  fs.writeFileSync(outputPath, html.trim(), 'utf8');

  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
