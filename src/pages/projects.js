// src/pages/projects.js
import { ensureMarked } from '../core/services/markdownService.js';
import { getConfig } from '../core/services/configService.js';
import { applyTemplate } from '../core/services/templateService.js';

export async function render(args = []) {
  const output = document.getElementById('output');

  await ensureMarked();

  const config = await getConfig();

  // Load markdown template
  let markdown = await fetch('/src/content/projects.md').then(r => r.text());

  // Inject face ASCII if referenced
  if (markdown.includes('${ascii}')) {
    const ascii = await fetch('/src/content/ascii.txt').then(r => r.text());
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
  // DYNAMIC PROJECT LIST
  // -----------------------------------------
  const username = config.github.username;
  const projects = config.github.projects;

  const listHtml = projects
    .map((name, i) => {
      const url = `https://github.com/${username}/${name}`;
      return `<div>&nbsp;&nbsp;&nbsp;&nbsp;${i + 1}. <a href="${url}" target="_blank" rel="noopener">${name}</a></div>`;
    })
    .join('');

  output.insertAdjacentHTML('beforeend', listHtml + '<br/>');

  // -----------------------------------------
  // GOTO LOGIC
  // -----------------------------------------
  if (args.length >= 2 && args[0] === "goto") {
    const number = parseInt(args[1], 10) - 1;

    if (number >= 0 && number < projects.length) {
      const projectName = projects[number];
      const url = `https://github.com/${username}/${projectName}`;

      window.open(url, '_blank', 'noopener');
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Opening ${projectName}…</div><br/>`
      );
    } else {
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Invalid selection: ${args[1]}</div><br/>`
      );
    }
  }
}