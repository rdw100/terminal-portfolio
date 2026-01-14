/* Process and execute a command input string */
 

import { commandRegistry } from "./commandRegistry.js";
import { Telemetry } from "./telemetry.js";

export async function executeCommand(rawInput, context) {
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return;
  }

  const [baseCmd, ...args] = trimmed.split(/\s+/);
  const entry = commandRegistry[baseCmd];

  // Track the raw command event (like old CommandExecuted)
  Telemetry.trackEvent("CommandExecuted", {
    raw: rawInput,
    baseCmd,
    args
  });

  if (!entry) {
    context.print(`<div>Command not found</div><br/>`);
    Telemetry.trackEvent("CommandNotFound", { baseCmd, args });
    return;
  }

  const start = performance.now();
  Telemetry.trackEvent("CommandStart", { baseCmd, args });

  if (entry.page) {
    Telemetry.trackPage(entry.page, { baseCmd, args });
  }

  try {
    const handlerContext = {
      ...context,
      baseCmd,
      args
    };

    // Dynamically import the command module
    const module = await entry.loader();

    // Support both:
    // export function handleX() {}
    // export default function() {}
    // Resolve handler function
    const handler =
      module.handler ||
      module.default ||
      Object.values(module)[0];

    const result = await handler(handlerContext);

    const duration = performance.now() - start;

    Telemetry.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration,
      success: true
    });

    return result;
  } catch (err) {
    const duration = performance.now() - start;

    Telemetry.trackException(err, {
      baseCmd,
      args,
      duration,
      success: false
    });

    Telemetry.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration,
      success: false
    });

    context.print(
      `<div class="error">An error occurred while executing <code>${baseCmd}</code>.</div>`
    );

    throw err;
  }
}
