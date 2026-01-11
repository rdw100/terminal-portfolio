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

import { Telemetry } from "./telemetry.js";
import { commandRegistry } from "./commandRegistry.js";

export async function executeCommand(baseCmd, args, context) {
  const entry = commandRegistry[baseCmd];

  if (!entry) {
    Telemetry.trackEvent("CommandNotFound", { baseCmd, args });
    context.print(`<div>Command not found</div>`);
    return;
  }

  // --- Telemetry: Command Start ---
  const start = performance.now();
  Telemetry.trackEvent("CommandStart", { baseCmd, args });

  // --- Telemetry: Page View (if applicable) ---
  if (entry.page) {
    Telemetry.trackPage(entry.page, { baseCmd, args });
  }

  try {
    // --- Run the handler ---
    const result = await entry.handler(context);

    // --- Telemetry: Command End (success) ---
    const duration = performance.now() - start;
    Telemetry.trackEvent("CommandEnd", {
      baseCmd,
      args,
      duration,
      success: true
    });

    return result;

  } catch (err) {
    // --- Telemetry: Exception ---
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

    throw err;
  }
}