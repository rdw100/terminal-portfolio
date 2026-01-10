import { loadAndRender } from '../../core/pageLoader.js';
import { getConfig } from '../../services/configService.js';

export async function handleSocials(ctx) {
  const [action, index] = ctx.args;

  // Handle: socials goto <n>
  if (action === 'goto' && index) {
    const config = await getConfig();
    const socials = config.socials || {};

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

  // Default: render socials page
  await loadAndRender('socials', 'Socials', ctx.args);
}