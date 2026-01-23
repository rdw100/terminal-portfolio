/** Display theme information from markdown template
 * @param {Array} args - Command-line arguments passed to the command.
 * @returns {Promise<void>} A promise that resolves when the page has been rendered.  
 */

import { ensureMarked } from '../core/services/markdownService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  // Load theme.md
  const markdown = await fetch('/src/content/theme.md').then(r => r.text());

  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}