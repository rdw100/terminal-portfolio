// src/pages/welcome.js
import { ensureMarked } from '../core/services/markdownService.js';
import { getConfig } from '../core/services/configService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  const config = await getConfig();

  // Load markdown
  let markdown = await fetch('/src/content/welcome.md').then(r => r.text());

  // Inject name ASCII
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('/src/content/name.txt').then(r => r.text());
    const fenced = `\`\`\`ansi\n${nameAscii}\n\`\`\``;
    markdown = markdown.replace('${name_ascii}', fenced);
  }

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}