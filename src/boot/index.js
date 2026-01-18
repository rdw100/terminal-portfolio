export async function handleBoot(ctx) {
  const output = ctx.output;

  // 1. Load static welcome HTML
  const html = await fetch('/src/boot/welcome.html').then(r => r.text());
  output.insertAdjacentHTML('beforeend', html);

  // 2. Load config (optional here)
  const { getConfig } = await import('../core/services/configService.js');
  const config = await getConfig();
  window.__config = config;

  // 3. Load runtime layer
  const { initRuntime } = await import('../core/runtime/initRuntime.js');
  await initRuntime(ctx);
}
