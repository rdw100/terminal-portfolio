/* Handles the 'projects' command, displaying a list of projects and allowing navigation to them. */
export async function handler(ctx) {
  // Load static HTML (Lighthouse-safe)
  const html = await fetch('/src/content/projects.html').then(r => r.text());
  ctx.print(html);

  // Load config lazily (after user input)
  const cfg = await fetch('/src/config/config.json').then(r => r.json());
  const username = cfg.github.username;
  const projects = cfg.github.projects;

  const args = ctx.args;

  // Handle "goto <number>"
  if (args.length >= 2 && args[0] === "goto") {
    const number = parseInt(args[1], 10) - 1;

    if (number >= 0 && number < projects.length) {
      const projectName = projects[number];
      const url = `https://github.com/${username}/${projectName}`;

      window.open(url, '_blank', 'noopener');
      ctx.print(`<div>Opening ${projectName}…</div><br/>`);
    } else {
      ctx.print(`<div>Invalid selection: ${args[1]}</div><br/>`);
    }
  }
}

