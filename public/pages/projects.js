import { getConfig } from '../services/configService.js';

export async function render() {
  const output = document.getElementById('output');

  try {
    const config = await getConfig();
    const username = config.github.username;
    const projects = config.github.projects || [];

    if (!projects.length) {
      output.insertAdjacentHTML('beforeend', '<div>No projects defined in config.</div>');
      return;
    }

    for (const repo of projects) {
      const res = await fetch(`https://api.github.com/repos/${username}/${repo}`);
      if (!res.ok) {
        output.insertAdjacentHTML('beforeend', `<div>Failed to load ${repo}</div>`);
        continue;
      }
      const data = await res.json();

      const topics = (data.topics || []).join(', ');
      const repoUrl = `https://github.com/${username}/${repo}`;

      output.insertAdjacentHTML('beforeend',
        `<p>
           <strong><a href="${repoUrl}" target="_blank" rel="noopener">${data.name}</a></strong><br>
           ${data.description || ''}<br>
           Topics: ${topics}
         </p>`);
    }
  } catch (err) {
    output.insertAdjacentHTML('beforeend', `<div>Error loading projects: ${err.message}</div>`);
  }
}