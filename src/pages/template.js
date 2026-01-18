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