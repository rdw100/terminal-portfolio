/* Handles the 'socials' command, displaying social media links and handling navigation. */
export async function handler(ctx) {
  // Load static HTML (Lighthouse-safe)
  const html = await fetch('/src/content/socials.html').then(r => r.text());
  ctx.print(html);

  // Load config lazily (after user input)
  const cfg = await fetch('/src/config/config.json').then(r => r.json());
  const socials = cfg.socials;

  const entries = Object.entries(socials).map(([key, url]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url
  }));

  const args = ctx.args;

  // Handle "goto <number>"
  if (args.length >= 2 && args[0] === "goto") {
    const number = parseInt(args[1], 10) - 1;

    if (number >= 0 && number < entries.length) {
      const entry = entries[number];
      window.open(entry.url, '_blank', 'noopener');
      ctx.print(`<div>Opening ${entry.name}…</div><br/>`);
    } else {
      ctx.print(`<div>Invalid selection: ${args[1]}</div><br/>`);
    }
  }
}

