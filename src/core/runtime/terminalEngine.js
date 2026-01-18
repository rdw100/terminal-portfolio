// src/core/runtime/terminalEngine.js
import { getRegistry } from './getRegistry.js';

export async function executeCommand(raw, ctx) {
  const cmd = raw.trim().split(/\s+/)[0];
  const registry = await getRegistry();

  const entry = registry[cmd];
  if (!entry) {
    ctx.print(`<div class="terminal-output">Unknown command: ${cmd}</div>`);
    return;
  }

  const mod = await entry.loader();
  if (mod.handle) {
    await mod.handle(ctx);
  } else if (mod.handleCommand) {
    await mod.handleCommand(ctx);
  } else {
    ctx.print(`<div class="terminal-output">Command has no handler.</div>`);
  }
}
