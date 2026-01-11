/*
import { dispatchCommand } from '../commandRegistry.js';
import { addToHistory, getPrev, getNext } from './history.js';
import { renderPrompt } from './prompt.js';
import { autoScroll } from './scroll.js';
import { trackCommand } from './telemetry.js';

export function initializeTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  renderPrompt(output);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      input.value = getPrev();
      return;
    }

    if (e.key === 'ArrowDown') {
      input.value = getNext();
      return;
    }

    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      addToHistory(raw);
      trackCommand(raw);

      output.insertAdjacentHTML(
        'beforeend',
        `<div class="cmd">guest@dustywright.me:~$> ${raw}</div>`
      );

      dispatchCommand(raw, { output });

      renderPrompt(output);
      autoScroll(output);
    }
  });
} 
*/
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

    const result = await entry.handler(handlerContext);

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
