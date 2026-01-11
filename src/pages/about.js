/* Renders UI for the "about" page of the portfolio 
    by loading markdown content, injecting ASCII art,
    applying templates, and converting to HTML. */
import { ensureMarked } from '../core/services/markdownService.js';
import { getConfig } from '../core/services/configService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  const config = await getConfig();

  // Load markdown
  let markdown = await fetch('../src/content/about.md').then(r => r.text());

  // Inject face ASCII if referenced
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('../src/content/ascii.txt').then(r => r.text());
    const fenced = `\`\`\`\n${ascii}\n\`\`\``;
    markdown = markdown.replace('${ascii}', fenced);
  }

  // Inject name ASCII if referenced
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('../src/content/name.txt').then(r => r.text());
    const fenced = `\`\`\`\n${nameAscii}\n\`\`\``;
    markdown = markdown.replace('${name_ascii}', fenced);
  }

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  // Convert to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}