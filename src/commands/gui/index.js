import { getConfig } from '../../services/configService.js';

export async function handleGui(ctx) {
  const config = await getConfig();
  const legacyUrl = config.site?.legacy_url;

  if (!legacyUrl) {
    ctx.print(`<div>Legacy URL not configured.</div><br/>`);
    return;
  }

  window.open(legacyUrl, '_blank', 'noopener');
}