/* Display help information for available commands from markdown 
 * template and config */

import { ensureMarked } from '../services/markdownService.js';
import { getConfig } from '../services/configService.js';
import { applyTemplate } from '../services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();
  const config = await getConfig();

  // Load markdown
  let markdown = await fetch('/src/content/help.md').then(r => r.text());

  // Inject face ASCII if referenced
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('/src/content/ascii.txt').then(r => r.text());
    markdown = markdown.replace('${ascii}', `\`\`\`\n${ascii}\n\`\`\``);
  }

  // Inject name ASCII if referenced
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('/src/content/name.txt').then(r => r.text());
    markdown = markdown.replace('${name_ascii}', `\`\`\`\n${nameAscii}\n\`\`\``);
  }

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  // Convert to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  // Insert into terminal
  output.insertAdjacentHTML('beforeend', html);
}