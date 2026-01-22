/* Handles the 'welcome' command, displaying the welcome page and initializing the runtime. */
export async function handler(ctx) {
  // 1. Clear hint + output BEFORE runtime starts
  const hint = document.getElementById("preboot-hint");
  if (hint) hint.remove();

  // 2. Print welcome page
  const html = await fetch('/src/content/welcome.html').then(r => r.text());
  ctx.print(html);

  // 3. Load registry
  const { commandRegistry } = await import('/src/core/runtime/commandRegistry.js');
  ctx.commandList = Object.keys(commandRegistry);

  // 4. Initialize runtime (prints prompt)
  const { initializeRuntime } = await import('/src/core/runtime/initRuntime.js');
  await initializeRuntime(ctx);
}
