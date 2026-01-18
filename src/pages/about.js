/* Renders UI for the "about" page of the portfolio 
    by loading markdown content, injecting ASCII art,
    applying templates, and converting to HTML. */
import { ensureMarked } from '../core/services/markdownService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = [], config) {
  const cfg = config || window.__config;
  const output = document.getElementById('output');

  await ensureMarked();

  // Load markdown
  let markdown = await fetch('/src/content/about.md').then(r => r.text());

  // Inject face ASCII if referenced
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('/src/content/ascii.txt').then(r => r.text());
    const fenced = `\`\`\`ascii\n${ascii}\n\`\`\``;
    markdown = markdown.replace('${ascii}', fenced);
  }

  // Apply placeholders
  markdown = applyTemplate(markdown, cfg);

  // Convert to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}
/* src/pages/about.js
import { ensureMarked } from '../core/services/markdownService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args, config) {
  const output = document.getElementById('output');

  await ensureMarked();

  let md = await fetch('/src/content/about.md').then(r => r.text());
  md = applyTemplate(md, config);

  const html = marked.parse(md, { mangle: false, headerIds: false });
  output.insertAdjacentHTML('beforeend', html);
} */
