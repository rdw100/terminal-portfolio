import { getConfig } from '../services/configService.js';

export async function render(args = []) {
  const output = document.getElementById('output');
  const config = await getConfig();

  const username = config.github?.username;
  const projects = config.github?.projects || [];

  if (!username || projects.length === 0) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>No projects configured.</div>`
    );
    return;
  }

  // Instructions (always rendered)
  output.insertAdjacentHTML(
    'beforeend',
    `
    <p>
      Usage: <code>projects goto &lt;project+no&gt;</code><br>
      Example: <code>projects goto 2</code>
    </p>
    `
  );

  // Numbered list
  const listHtml = projects
    .map((name, i) => {
      const url = `https://github.com/${username}/${name}`;
      return `<li><a href="${url}" target="_blank" rel="noopener">${name}</a></li>`;
    })
    .join('');

  output.insertAdjacentHTML(
    'beforeend',
    `<ol>${listHtml}</ol>`
  );

  // Handle: projects goto N
  if (args[0] === 'goto') {
    const index = parseInt(args[1], 10) - 1;

    if (Number.isNaN(index) || !projects[index]) {
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Invalid project number.</div>`
      );
      return;
    }

    const projectUrl = `https://github.com/${username}/${projects[index]}`;
    window.open(projectUrl, '_blank', 'noopener');

    output.insertAdjacentHTML(
      'beforeend',
      `<div>Opening ${projects[index]}…</div>`
    );
  }

  // Scroll to bottom of terminal, after async rendering
  document.getElementById('terminal').scrollTop =
    document.getElementById('terminal').scrollHeight;
}