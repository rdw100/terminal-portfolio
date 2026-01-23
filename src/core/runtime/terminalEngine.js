/**
 * Executes a command based on user input, handling dynamic imports,
 * execution timing, and error reporting. 
 * @param {string} raw - The raw command input from the user.
 * @param {Object} ctx - Context object containing terminal state and output methods.
 * @returns {Promise<void>} A promise that resolves when the command has been executed.
 */
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
