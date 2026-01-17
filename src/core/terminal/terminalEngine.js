/* Process and execute a command input string */

import { commandRegistry } from "./commandRegistry.js";

export async function executeCommand(rawInput, context) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  const [baseCmd, ...args] = trimmed.split(/\s+/);
  const entry = commandRegistry[baseCmd];

  window.__telemetry?.trackEvent("CommandStart", {
    raw: rawInput,
    baseCmd,
    args
  });

  if (!entry) {
    context.print('<div>Command not found</div>');
    window.__telemetry?.trackEvent("CommandNotFound", { baseCmd, args });
    return;
  }

  const start = performance.now();

  if (entry.page) {
    window.__telemetry?.trackPage(entry.page, { baseCmd, args });
  }

  try {
    const handlerContext = { ...context, baseCmd, args };
    const module = await entry.loader();

    let handler = module.handler || module.default;
    if (!handler) {
      for (const key in module) {
        handler = module[key];
        break;
      }
    }

    const result = await handler(handlerContext);

    window.__telemetry?.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration: performance.now() - start,
      success: true
    });

    return result;
  } catch (err) {
    window.__telemetry?.trackException(err, {
      baseCmd,
      args,
      duration: performance.now() - start,
      success: false
    });

    window.__telemetry?.trackEvent("CommandEnd", {
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