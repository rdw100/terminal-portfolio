/* Display socials information from markdown template and config */
import { ensureMarked } from '../core/services/markdownService.js';
import { getConfig } from '../core/services/configService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();
  const config = await getConfig();

  // Load markdown template
  let markdown = await fetch('/src/content/socials.md').then(r => r.text());

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  // Convert Markdown to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  // Insert Markdown portion
  output.insertAdjacentHTML('beforeend', html);

  // -----------------------------------------
  // DYNAMIC SOCIAL LINKS LIST
  // -----------------------------------------
  const socials = config.socials || {};

  const entries = Object.entries(socials).map(([key, url]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url
  }));

  const listHtml = entries
    .map((entry, i) => {
      return `<div class="hlinkList">&nbsp;&nbsp;&nbsp;&nbsp;${i + 1}. <a href="${entry.url}" target="_blank" rel="noopener">${entry.name}</a></div>`;
    })
    .join('');

  output.insertAdjacentHTML('beforeend', listHtml);
}