/* Version 3 FINAL terminal.js (with global terminal + working scroll) */
import { commandRegistry } from './commandRegistry.js';
import { addToHistory, getPrev, getNext } from './terminal/history.js';
import { renderPrompt, renderLivePrompt } from "./terminal/prompt.js";

// Global reference to the scroll container (this is what made scrolling work before)
let terminal = null;

// Smooth, reliable scroll-to-bottom
function scrollToBottom() {
  if (!terminal) return;
  setTimeout(() => {
    terminal.scrollTop = terminal.scrollHeight;
  }, 0);
  console.log("Scrolled to bottom:  " + terminal.scrollTop + "/" + terminal.scrollHeight);
}

export async function initializeTerminal() {
  const output = document.getElementById('output');

  // Render the live prompt
  const live = document.getElementById("live");
  live.innerHTML = renderLivePrompt();

  // Re-bind the input reference AFTER rendering
  const input = document.getElementById("terminal-input");
  input.focus();
  
  // Assign the global scroll container (this is the missing piece)
  terminal = document.getElementById('terminal');

  // --- 1. Run welcome FIRST ---
  await dispatchCommand("welcome", {
    output,
    print: (html) => {
      output.insertAdjacentHTML('beforeend', html);
      //scrollToBottom();
    },
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        'beforeend',
        `<div class="terminal">${renderPrompt()} ${cmd}</div>`
      );
      //scrollToBottom();
    },
    args: [],
    skipFinalPrompt: true
  });

  // --- 2. Focus input ---
  //input.focus();

  // --- 3. Input handler ---
  input.addEventListener('keydown', async (e) => {

    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      input.value = getPrev();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      input.value = getNext();
      return;
    }

    // Command execution
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      addToHistory(raw);

      await dispatchCommand(raw, {
        output,
        print: (html) => {
          output.insertAdjacentHTML('beforeend', html);
        },
        printCommand: (cmd) => {
          output.insertAdjacentHTML(
            'beforeend',
            `<div class="terminal">${renderPrompt()} ${cmd}</div>`
          );
        },
        args: [],
        skipFinalPrompt: true
      });
      
      Promise.resolve().then(() => scrollToBottom());
    }
  });
}

export async function dispatchCommand(rawInput, ctx) {
  const [command, ...args] = rawInput.trim().split(/\s+/);

  // Echo the command exactly like a real terminal
  ctx.printCommand(rawInput);

  const entry = commandRegistry[command];

  if (!entry) {
    ctx.print(`<div>Unknown command: ${command}</div>`);
    return;
  }

  // Run the handler
  await entry.handler({ ...ctx, args });
}