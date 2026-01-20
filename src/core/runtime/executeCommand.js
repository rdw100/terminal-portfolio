// src/core/runtime/executeCommand.js

import { commandRegistry } from './commandRegistry.js';

export async function executeCommand(rawInput, ctx) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  const [baseCmd, ...args] = trimmed.split(/\s+/);
  const entry = commandRegistry[baseCmd];

  if (!entry) {
    ctx.print(`<div class="terminal-output">Command not found: ${baseCmd}</div>`);
    return;
  }

  const start = performance.now();

  try {
    // Load the command module lazily
    const module = await entry.loader();

    // Resolve handler
    let handler = module.handler || module.default;
    if (!handler) {
      for (const key in module) {
        handler = module[key];
        break;
      }
    }

    // Execute command
    const handlerContext = { ...ctx, baseCmd, args };
    await handler(handlerContext);

    return {
      success: true,
      duration: performance.now() - start
    };

  } catch (err) {
    ctx.print(
      `<div class="terminal-output error">Error executing <code>${baseCmd}</code>.</div>`
    );

    console.error(err);

    return {
      success: false,
      duration: performance.now() - start,
      error: err
    };
  }
}
