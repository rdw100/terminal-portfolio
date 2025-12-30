import { ensureMarked } from '../services/markdownService.js';

export async function render() {
  const output = document.getElementById('output');
  await ensureMarked();
  const markdown = await fetch('content/help.md').then(r => r.text());
  const html = marked.parse(markdown, {
    mangle: false,
    headerIds: false
  });

  output.insertAdjacentHTML('beforeend', html);
}