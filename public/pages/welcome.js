import { ensureMarked } from '../services/markdownService.js';
/* import { scrollToBottom } from '../scripts/utils/scroll.js'; */

export async function render() {
  const output = document.getElementById('output');

  await ensureMarked();

  try {
    const md = await fetch('content/welcome.md')
      .then(res => res.text());

    const html = marked.parse(md);

    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Error loading welcome: ${err.message}</div>`
    );
  }

  /* scrollToBottom(true); */
}
