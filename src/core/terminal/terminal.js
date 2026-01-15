/* Main terminal initialization and event handling */
import { renderLivePrompt, renderPrompt } from "./prompt.js";
import { executeCommand } from "./terminalEngine.js";
import { registerScrollContainer, scrollToBottom } from "../../shared/ui/scroll.js";
import { commandRegistry } from "./commandRegistry.js";

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
    },
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${renderPrompt()} ${cmd}</div>`
      );
    }
  };

  // After the browser paints the static ASCII, initialize the terminal UI
  requestAnimationFrame(() => {
    input.focus();

    requestIdleCallback(() => {
      executeCommand("boot", context)
        .finally(() => {
          input.focus();
        });
    });
  });

/*   // After the browser paints the static ASCII, initialize the terminal UI
  requestAnimationFrame(() => {
    // Render the live prompt (the blinking cursor)
    live.innerHTML = renderLivePrompt();
    input.focus();

    // Defer the heavy welcome command until the browser is idle
    requestIdleCallback(() => {
      const initialCmd = "welcome";

      // Print the command for UX symmetry
      context.printCommand(initialCmd);

      executeCommand(initialCmd, context)
        .finally(() => {
          input.focus();
          Promise.resolve().then(() => scrollToBottom());
        });
    });
  }); */

  document.addEventListener("pointerdown", start, { once: true });
  document.addEventListener("keydown", start, { once: true });
  function start() {
    document.getElementById("press-any-key").remove();
    executeCommand("welcome");
  }

  terminal.addEventListener("click", () => {
    input.focus();
  });

  // --- KEYPRESS EVENTS ---
  input.addEventListener("keydown", async (e) => {

    // --- RESETS TAB STATE --- 
    if (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") {
      input._tabIndex = null;
      input._tabBase = null;
    }

    // --- TAB COMPLETION ---
    if (e.key === "Tab") {
      e.preventDefault();

      const current = input.value.trim();
      const commands = Object.keys(commandRegistry); // import needed at top
      
      // No input → do nothing
      if (!current) return;

      // Filter matches
      const matches = commands.filter(cmd => cmd.startsWith(current));
      if (matches.length === 0) return;

      // If only one match → autocomplete immediately
      if (matches.length === 1) {
        input.value = matches[0] + " ";
        return;
      }

      // Multiple matches → cycle through them
      if (!input._tabIndex || input._tabBase !== current) {
        input._tabIndex = 0;
        input._tabBase = current;
      } else {
        if (e.shiftKey) {
          input._tabIndex = (input._tabIndex - 1 + matches.length) % matches.length;
        } else {
          input._tabIndex = (input._tabIndex + 1) % matches.length;
        }
      }

      input.value = matches[input._tabIndex];
      return;
    }
    
    // --- HISTORY NAVIGATION ---
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (commandHistory.length === 0) return;

      if (historyIndex === -1) {
        historyIndex = commandHistory.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }

      input.value = commandHistory[historyIndex];
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (commandHistory.length === 0) return;

      if (historyIndex === -1) {
        return; // nothing to show
      }

      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }

      return;
    }

    // --- ESC EXECUTES CLEAR COMMAND ---
    if (e.key === "Escape") {
      e.preventDefault();

      const raw = "clear";
      const cmd = "clear";

      // Print the command itself (UX symmetry)
      context.printCommand(cmd);

      try {
        await executeCommand(raw, context);
      } finally {
        input.value = "";
        historyIndex = -1;
        input.focus();
        Promise.resolve().then(() => scrollToBottom());
      }

      return;
    }

    // --- ENTER EXECUTION ---
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
        Promise
          .resolve()
          .then(() => scrollToBottom());
      }

      return;
    }
  });

  // --- SCROLL BUTTON VISIBILITY ---
  const scrollBtn = document.getElementById('scroll-to-bottom');

  // Register the correct scroll container 
  registerScrollContainer(output);

  output.addEventListener('scroll', () => {
    const atBottom =
      output.scrollTop + output.clientHeight >= output.scrollHeight - 10;

    if (atBottom) {
      scrollBtn.classList.remove('visible');
    } else {
      scrollBtn.classList.add('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    scrollToBottom();
  });
}