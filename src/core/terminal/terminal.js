/* Version 3 FINAL terminal.js (with global terminal + working scroll) */
/* import { commandRegistry } from './commandRegistry.js';
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
} */
/* Revised terminal.js with integrated scrolling and command execution */
/* import { renderLivePrompt, renderPrompt } from "./prompt.js";
import { executeCommand } from "./terminalEngine.js";
import { scrollToBottom } from "../../shared/ui/scroll.js"; // adjust path if needed

export function initializeTerminal() {
  const terminal = document.getElementById("terminal");
  const output = document.getElementById("output");
  const live = document.getElementById("live");

  if (!terminal || !output || !live) {
    console.error("Terminal elements not found");
    return;
  }

  live.innerHTML = renderLivePrompt();
  const input = document.getElementById("terminal-input");
  if (!input) {
    console.error("terminal-input not found after renderLivePrompt");
    return;
  }

  input.focus();

  const commandHistory = [];
  let historyIndex = -1;

  const context = {
    terminal,
    output,
    print: (html) => {
      output.insertAdjacentHTML("beforeend", html);
      requestAnimationFrame(() => scrollToBottom());
    },
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${renderPrompt()} ${cmd}</div>`
      );
      requestAnimationFrame(() => scrollToBottom());
    }
  };

  terminal.addEventListener("click", () => {
    input.focus();
  });

  input.addEventListener("keydown", async (e) => {
    // history navigation
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (commandHistory.length === 0) return;

      if (e.key === "ArrowUp") {
        if (historyIndex === -1) historyIndex = commandHistory.length - 1;
        else if (historyIndex > 0) historyIndex--;
      } else if (e.key === "ArrowDown") {
        if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
        } else {
          historyIndex = -1;
        }
      }

      if (historyIndex !== -1) {
        input.value = commandHistory[historyIndex];
      } else {
        input.value = "";
      }

      setTimeout(() => {
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }, 0);

      e.preventDefault();
      return;
    }

    // tab completion (using availableCommands if you want it here)
    // if you still want this, we can rewire it to use availableCommands
    // for now, keep it out or re-add later.

    if (e.key === "Enter") {
      e.preventDefault();

      const raw = input.value;
      const cmd = raw.trim();

      if (cmd) {
        commandHistory.push(cmd);
        if (commandHistory.length > 100) commandHistory.shift();
      }

      input.value = "";
      historyIndex = -1;

      context.printCommand(cmd);

      try {
        await executeCommand(raw, context);
      } finally {
        input.focus();
      }

      return;
    }
  });

  // initial welcome
  requestAnimationFrame(() => {
    const initialCmd = "welcome";
    context.printCommand(initialCmd);
    executeCommand(initialCmd, context).finally(() => {
      input.focus();
    });
  });
} */
// src/core/terminal/terminal.js
import { renderLivePrompt, renderPrompt } from "./prompt.js";
import { executeCommand } from "./terminalEngine.js";
import { registerScrollContainer, scrollToBottom } from "../../shared/ui/scroll.js";

export function initializeTerminal() {
  const terminal = document.getElementById("terminal");
  const output = document.getElementById("output");
  const live = document.getElementById("live");

  if (!terminal || !output || !live) {
    console.error("Terminal elements not found");
    return;
  }

  // 🔹 Register scroll container ONCE
  registerScrollContainer(terminal);

  live.innerHTML = renderLivePrompt();
  const input = document.getElementById("terminal-input");
  if (!input) {
    console.error("terminal-input not found after renderLivePrompt");
    return;
  }

  input.focus();

  const commandHistory = [];
  let historyIndex = -1;

  const context = {
    terminal,
    output,
    print: (html) => {
      output.insertAdjacentHTML("beforeend", html);
      // ❌ no scrollToBottom here
    },
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${renderPrompt()} ${cmd}</div>`
      );
      // ❌ no scrollToBottom here
    }
  };

  terminal.addEventListener("click", () => {
    input.focus();
  });

  input.addEventListener("keydown", async (e) => {
    // history handling unchanged ...

    if (e.key === "Enter") {
      e.preventDefault();

      const raw = input.value;
      const cmd = raw.trim();

      if (cmd) {
        commandHistory.push(cmd);
        if (commandHistory.length > 100) commandHistory.shift();
      }

      input.value = "";
      historyIndex = -1;

      context.printCommand(cmd);

      try {
        await executeCommand(raw, context);
      } finally {
        input.focus();
        // 🔹 This is the pattern that worked yesterday
        Promise
          .resolve()
          .then(() => scrollToBottom());
      }

      return;
    }
  });

  // initial welcome
  requestAnimationFrame(() => {
    const initialCmd = "welcome";
    context.printCommand(initialCmd);
    executeCommand(initialCmd, context)
      .finally(() => {
        input.focus();
        Promise
          .resolve()
          .then(() => scrollToBottom());
      });
  });
}