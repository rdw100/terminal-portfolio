import { ensureMarked } from '../services/markdownService.js';
import { getConfig } from '../services/configService.js';
import { applyTemplate } from '../services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  const config = await getConfig();

  // Load markdown template
  let markdown = await fetch('content/socials.md').then(r => r.text());

  // Inject face ASCII if referenced
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('content/ascii.txt').then(r => r.text());
    markdown = markdown.replace('${ascii}', `\`\`\`\n${ascii}\n\`\`\``);
  }

  // Inject name ASCII if referenced
  if (markdown.includes('${name_ascii}')) {
    const nameAscii = await fetch('content/name.txt').then(r => r.text());
    markdown = markdown.replace('${name_ascii}', `\`\`\`\n${nameAscii}\n\`\`\``);
  }

  // Apply YAML placeholders
  markdown = applyTemplate(markdown, config);

  // Convert Markdown to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  // Insert the Markdown portion
  output.insertAdjacentHTML('beforeend', html);

  // -----------------------------------------
  // DYNAMIC SOCIAL LINKS LIST
  // -----------------------------------------
  const socials = config.socials || {};

  // Convert object → array of { name, url }
  const entries = Object.entries(socials).map(([key, url]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url
  }));

  const listHtml = entries
    .map((entry, i) => {
      return `<div>&nbsp;&nbsp;&nbsp;&nbsp;${i + 1}. <a href="${entry.url}" target="_blank" rel="noopener">${entry.name}</a></div>`;
    })
    .join('');

  output.insertAdjacentHTML('beforeend', listHtml + '<br/>');

  // -----------------------------------------
  // GOTO LOGIC
  // -----------------------------------------
  if (args.length >= 2 && args[0] === "goto") {
    const number = parseInt(args[1], 10) - 1;

    if (number >= 0 && number < entries.length) {
      const entry = entries[number];

      window.open(entry.url, '_blank', 'noopener');
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Opening ${entry.name}…</div>` + '<br/>'
      );
    } else {
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Invalid selection: ${args[1]}</div>` + '<br/>'
      );
    }
  }
}