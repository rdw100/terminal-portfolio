/**
 * Renders a page using a Markdown template, applying configuration settings.
 * @param {Array} args - Command-line arguments passed to the command.  
 * @param {Object} config - Configuration object for template substitution.
 * @returns {Promise<void>} A promise that resolves when the page has been rendered.
 */

import { ensureMarked } from '../core/services/markdownService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args, config) {
  const output = document.getElementById('output');

  await ensureMarked();

  let md = await fetch('/src/content/PAGE.md').then(r => r.text());
  md = applyTemplate(md, config);

  const html = marked.parse(md, { mangle: false, headerIds: false });
  output.insertAdjacentHTML('beforeend', html);
}