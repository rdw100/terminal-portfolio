/* Handles the 'gui' command, opening the legacy GUI in a new browser tab. */
export async function handle(ctx) {
  const cfg = window.__config;
  const legacyUrl = cfg?.site?.legacy_url;

  if (!legacyUrl) {
    ctx.print(`<div>Legacy URL not configured.</div><br/>`);
    return;
  }

  window.open(legacyUrl, '_blank', 'noopener');
}
