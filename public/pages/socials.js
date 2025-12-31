import { ensureMarked } from '../services/markdownService.js';

export async function render(args = []) {
  const output = document.getElementById('output');
  await ensureMarked();

  // Fetch Markdown
  const markdown = await fetch('content/socials.md').then(r => r.text());

  // Render Markdown
  const html = marked.parse(markdown, { mangle: false, headerIds: false });
  output.insertAdjacentHTML('beforeend', html);

  // Handle "goto <number>"
  if (args.length >= 2 && args[0] === "goto") {
    const number = args[1];

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
}