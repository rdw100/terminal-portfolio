/* Display theme information from markdown template */

import { ensureMarked } from '../core/services/markdownService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  // Load theme.md
  const markdown = await fetch('/src/content/theme.md').then(r => r.text());

  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  output.insertAdjacentHTML('beforeend', html);
}