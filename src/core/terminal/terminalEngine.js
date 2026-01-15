/* Process and execute a command input string */

import { commandRegistry } from "./commandRegistry.js";
import { Telemetry } from "./telemetry.js";

export async function executeCommand(rawInput, context) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  const [baseCmd, ...args] = trimmed.split(/\s+/);
  const entry = commandRegistry[baseCmd];

  // Combined event: CommandExecuted + CommandStart
  Telemetry.trackEvent("CommandStart", {
    raw: rawInput,
    baseCmd,
    args
  });

  if (!entry) {
    context.print('<div>Command not found</div>');
    Telemetry.trackEvent("CommandNotFound", { baseCmd, args });
    return;
  }

  const start = performance.now();

  if (entry.page) {
    Telemetry.trackPage(entry.page, { baseCmd, args });
  }

  try {
    const handlerContext = { ...context, baseCmd, args };

    // Dynamic import
    const module = await entry.loader();

    // Fastest handler resolution
    let handler = module.handler || module.default;
    if (!handler) {
      for (const key in module) {
        handler = module[key];
        break;
      }
    }

    const result = await handler(handlerContext);

    Telemetry.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration: performance.now() - start,
      success: true
    });

    return result;
  } catch (err) {
    Telemetry.trackException(err, {
      baseCmd,
      args,
      duration: performance.now() - start,
      success: false
    });

    Telemetry.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration: performance.now() - start,
      success: false
    });

    context.print(
      `<div class="error">An error occurred while executing <code>${baseCmd}</code>.</div>`
    );

    throw err;
  }
}
