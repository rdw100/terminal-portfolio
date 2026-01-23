/**
 * Builds the lighthouse.html file from scores.json by generating an HTML table.
 */
const fs = require('fs');
const path = require('path');

console.log("Running build-lighthouse.js...");

try {
  const scoresPath = path.resolve('src/content/lighthouse/scores.json');
  const outputDir = path.resolve('src/content/lighthouse');
  const outputPath = path.join(outputDir, 'lighthouse.html');

  const scores = JSON.parse(fs.readFileSync(scoresPath, 'utf8'));

  const html = `
<h2>Lighthouse Scores</h2>
<table id="lighthouse-scores">
<thead>
  <tr><th style="text-align: left;">Category</th><th>Score</th></tr>
</thead>
<tbody>
  <tr><td>Performance</td><td class="lsData">${scores.performance}</td></tr>
  <tr><td>Accessibility</td><td class="lsData">${scores.accessibility}</td></tr>
  <tr><td>Best Practices</td><td class="lsData">${scores.bestPractices}</td></tr>
  <tr><td>SEO</td><td class="lsData">${scores.seo}</td></tr>
</tbody>
</table>
`;

  fs.writeFileSync(outputPath, html.trim(), 'utf8');
  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
