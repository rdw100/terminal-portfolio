import { ensureMarked } from '../services/markdownService.js';
import { getConfig } from '../services/configService.js';
import { applyTemplate } from '../services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  const config = await getConfig();

  let markdown = await fetch('content/welcome.md').then(r => r.text());

  // Inject face ASCII
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('content/ascii.txt').then(r => r.text());
    const fenced = `\`\`\`\n${ascii}\n\`\`\``;
    markdown = markdown.replace('${ascii}', fenced);
  }

  // Inject name ASCII
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('content/name.txt').then(r => r.text());
    const fenced = `\`\`\`\n${nameAscii}\n\`\`\``;
    markdown = markdown.replace('${name_ascii}', fenced);
  }

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}