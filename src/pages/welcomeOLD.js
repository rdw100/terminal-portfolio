// src/pages/welcome.js
import { ensureMarked } from '../core/services/markdownService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = [], config) {
  const output = document.getElementById('output');

  await ensureMarked();

  // Load markdown
  let markdown = await fetch('/src/content/welcome.md').then(r => r.text());

  // Inject name ASCII
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('/src/content/name.txt').then(r => r.text());
    const fenced = `\`\`\`ansi\n${nameAscii}\n\`\`\``;
    markdown = markdown.replace('${name_ascii}', fenced);
  }

  // Apply placeholders
  markdown = applyTemplate(markdown, config);

  const html = marked.parse(markdown, { mangle: false, headerIds: false });
  output.insertAdjacentHTML('beforeend', html);
}
