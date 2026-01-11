/* // src/core/terminal.js
import { commandRegistry } from './commandRegistry.js';
import { addToHistory, getPrev, getNext } from './terminal/history.js';

// --- Consistent prompt rendering ---
function renderPrompt(output) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="prompt">guest@dustywright.me:~$></div>`
  );
}

export async function initializeTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  // 1. Run welcome FIRST, and wait for it to finish
  await dispatchCommand("welcome", {
    output,
    print: (html) => output.insertAdjacentHTML('beforeend', html),
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        'beforeend',
        `<div class="cmd">guest@dustywright.me:~$> ${cmd}</div>`
      );
      scrollToBottom();
    },
    args: [],
    skipFinalPrompt: true
  });

  // 2. Do NOT print the prompt AFTER welcome content
  input.focus();

  // 3. Wire input handler
  input.addEventListener('keydown', async (e) => {

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

    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      addToHistory(raw);

      await dispatchCommand(raw, {
        output,
        print: (html) => output.insertAdjacentHTML('beforeend', html),
        printCommand: (cmd) => {
          output.insertAdjacentHTML(
            'beforeend',
            `<div class="terminal">guest@dustywright.me:~$> ${cmd}</div>`
          );
        },
        args: [],
        skipFinalPrompt: true
      });
    }
  });
}

export async function dispatchCommand(rawInput, ctx) {
  const [command, ...args] = rawInput.trim().split(/\s+/);

  ctx.printCommand(rawInput);

  const entry = commandRegistry[command];

  if (!entry) {
    ctx.print(`<div>Unknown command: ${command}</div><br/>`);
    if (!ctx.skipFinalPrompt) renderPrompt(ctx.output);
    return;
  }

  // WAIT for the handler to finish
  await entry.handler({ ...ctx, args });

/*   if (!ctx.skipFinalPrompt) {
    renderPrompt(ctx.output);
  } 
}
*/
/*
function scrollToBottom() {
  const terminal = document.getElementById('terminal');
  terminal.scrollTop = terminal.scrollHeight;
} */
/* // src/core/terminal.js
import { commandRegistry } from './commandRegistry.js';
import { addToHistory, getPrev, getNext } from './terminal/history.js';

// Smooth, reliable scroll-to-bottom
function scrollToBottom() {
  const terminal = document.getElementById('output');
  setTimeout(() => {
    terminal.scrollTop = terminal.scrollHeight;
  }, 0);
}

export async function initializeTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  // --- 1. Run welcome FIRST ---
  await dispatchCommand("welcome", {
    output,
    print: (html) => {
      output.insertAdjacentHTML('beforeend', html);
      scrollToBottom();
    },
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        'beforeend',
        `<div class="terminal">guest@dustywright.me:~$> ${cmd}</div>`
      );
      scrollToBottom();
    },
    args: [],
    skipFinalPrompt: true
  });

  // --- 2. Focus input ---
  input.focus();

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
          scrollToBottom();
        },
        printCommand: (cmd) => {
          output.insertAdjacentHTML(
            'beforeend',
            `<div class="terminal">guest@dustywright.me:~$> ${cmd}</div>`
          );
          scrollToBottom();
        },
        args: [],
        skipFinalPrompt: true
      });
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
} */

/* Version 3 FINAL terminal.js (with global terminal + working scroll) */
// src/core/terminal.js
import { commandRegistry } from './commandRegistry.js';
import { addToHistory, getPrev, getNext } from './terminal/history.js';

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
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  // Assign the global scroll container (this is the missing piece)
  terminal = document.getElementById('terminal');

  // --- 1. Run welcome FIRST ---
  await dispatchCommand("welcome", {
    output,
    print: (html) => {
      //scrollToBottom();
      output.insertAdjacentHTML('beforeend', html);
      scrollToBottom();
    },
    printCommand: (cmd) => {
      //scrollToBottom();
      output.insertAdjacentHTML(
        'beforeend',
        `<div class="terminal">guest@dustywright.me:~$> ${cmd}</div>`
      );
      scrollToBottom();
    },
    args: [],
    skipFinalPrompt: true
  });

  // --- 2. Focus input ---
  input.focus();

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
            `<div class="terminal">guest@dustywright.me:~$> ${cmd}</div>`
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