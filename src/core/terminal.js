/* Handles command dispatching in the terminal application. 
   Parses input, looks up command handlers, and executes them. */

import { commandRegistry } from './commandRegistry.js';

export function initializeTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      dispatchCommand(raw, {
        output,
        print: (html) => {
          output.insertAdjacentHTML('beforeend', html);
        },
        printCommand: (cmd) => {
          // Print the prompt + command the user typed
          output.insertAdjacentHTML(
            'beforeend',
            `<div class="cmd">guest@dustywright.me:~$> ${raw}</div>`
          );
        },
        args: []
      });
    }
  });
}

export function dispatchCommand(rawInput, ctx) {
  const [command, ...args] = rawInput.trim().split(/\s+/);

  const entry = commandRegistry[command];

  if (!entry) {
    ctx.print(`<div>Unknown command: ${command}</div><br/>`);
    return;
  }

  entry.handler({ ...ctx, args });
  ctx.print(`<div class="prompt">guest@dustywright.me:~$> ${command}</div>`);
}