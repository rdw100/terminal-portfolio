import { loadAndRender } from '../../core/runtime/pageLoader.js';

export async function handle(ctx) {
  const cfg = window.__config;
  const [action, index] = ctx.args || [];

  // socials goto <n>
  if (action === 'goto' && index) {
    const socials = cfg.socials || {};

    const entries = Object.entries(socials).map(([key, url]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      url
    }));

    const num = parseInt(index, 10) - 1;

    if (num >= 0 && num < entries.length) {
      const entry = entries[num];
      window.open(entry.url, '_blank', 'noopener');
      ctx.print(`<div>Opening ${entry.name}…</div><br/>`);
      return;
    }

    ctx.print(`<div>Invalid selection: ${index}</div><br/>`);
    return;
  }

  // default: render socials page
  await loadAndRender('socials', 'Socials', ctx.args, cfg);
}
