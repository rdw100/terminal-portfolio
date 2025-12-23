import { ensureMarked } from '../services/markdownService.js';
/* import { scrollToBottom } from '../scripts/utils/scroll.js'; */

export async function render(arg = null) {
  const output = document.getElementById('output');
  await ensureMarked();
  // Fetch Markdown
  const markdown = await fetch('content/socials.md').then(r => r.text());

  // Render Markdown
  const html = marked.parse(markdown, { mangle: false, headerIds: false });
  output.insertAdjacentHTML('beforeend', html);

  // If "goto <number>" is provided, open the link
  if (arg && arg.startsWith('goto')) {
    const parts = arg.split(/\s+/);
    const number = parts[1];

    if (!number) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const links = tempDiv.querySelectorAll('a');

    const index = parseInt(number, 10) - 1;
    if (links[index]) {
      window.open(links[index].href, '_blank', 'noopener');
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Opening ${links[index].textContent}…</div>`
      );
    } else {
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Invalid selection: ${number}</div>`
      );
    }
  }

  /* scrollToBottom(true); */
  /* requestAnimationFrame(() => scrollToBottom(true)); */
}
