// src/commands/gui/index.js

export async function handleGui(ctx, config) {
  // Fallback in case config wasn't passed (shouldn't happen)
  const cfg = config || window.__config;

  const legacyUrl = cfg?.site?.legacy_url;

  if (!legacyUrl) {
    ctx.print(`<div>Legacy URL not configured.</div><br/>`);
    return;
  }

  window.open(legacyUrl, '_blank', 'noopener');
}
