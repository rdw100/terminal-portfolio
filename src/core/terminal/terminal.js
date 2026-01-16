/* Main terminal initialization and event handling */
import { renderLivePrompt, renderPrompt } from "./prompt.js";
import { executeCommand } from "./terminalEngine.js";
import { registerScrollContainer, scrollToBottom } from "../../shared/ui/scroll.js";
// import { commandRegistry } from "./commandRegistry.js";
import { getRegistry } from "./getRegistry.js";

export function initializeTerminal() {
  const terminal = document.getElementById("terminal");
  const output = document.getElementById("output");
  const live = document.getElementById("live");

  if (!terminal || !output || !live) {
    console.error("Terminal elements not found");
    return;
  }

  // Cache static prompt
  const staticPrompt = renderPrompt();

  // Lazy-loaded command list (populated on first Tab press)
  let commandList = null;

  // Render prompt and get input
  live.innerHTML = renderLivePrompt();
  const input = document.getElementById("terminal-input");

  if (!input) {
    console.error("terminal-input not found after renderLivePrompt");
    return;
  }

  safeFocus(input);

  const commandHistory = [];
  let historyIndex = -1;

  const context = {
    terminal,
    output,
    print: (html) => output.insertAdjacentHTML("beforeend", html),
    printCommand: (cmd) => {
      output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${staticPrompt} ${cmd}</div>`
      );
    }
  };

/*   // --- PRESS ANY KEY TO BEGIN ---
  const hint = document.getElementById("welcome-hint");

  async function startWelcome(e) {
    // Ignore non-printable keys
    if (e.key.length !== 1) return;

    // Prevent the main key handler from firing on this first key
    e.stopImmediatePropagation();

    hint.remove();
    input.removeEventListener("keydown", startWelcome);

    const cmd = "welcome";
    context.printCommand(cmd);
    await executeCommand(cmd, context);
    queueMicrotask(scrollToBottom);
  }

  // Attach AFTER focus settles
  setTimeout(() => {
    input.addEventListener("keydown", startWelcome);
  }, 0); */

  // --- PRESS ANY KEY OR CLICK ANYWHERE TO BEGIN ---
// function removeWelcomeHint() {
//   const hint = document.getElementById("welcome-hint");
//   if (hint) hint.remove();
// }

// async function runWelcome() {
//   removeWelcomeHint();

//   // Remove both listeners so welcome only fires once
//   input.removeEventListener("keydown", startWelcomeKey);
//   terminal.removeEventListener("click", startWelcomeClick);

//   const cmd = "welcome";
//   context.printCommand(cmd);
//   await executeCommand(cmd, context);

//   queueMicrotask(scrollToBottom);
//   safeFocus(input);
// }

// // Keypress version (only printable keys)
// async function startWelcomeKey(e) {
//   const hint = document.getElementById("welcome-hint");
//   if (!hint) return; // already triggered

//   if (e.key.length !== 1) return; // ignore arrows, shift, ctrl, etc.
//   e.stopImmediatePropagation();

//   runWelcome();
// }

// // Click‑anywhere version
// async function startWelcomeClick() {
//   const hint = document.getElementById("welcome-hint");
//   if (!hint) return; // already triggered

//   runWelcome();
// }

// // Attach AFTER focus settles to avoid synthetic key events
// setTimeout(() => {
//   input.addEventListener("keydown", startWelcomeKey);
//   terminal.addEventListener("click", startWelcomeClick);
// }, 0);


  // Auto-run welcome AFTER first paint, during idle time
  /* Perf 96; TBT 210 ms*/
  requestIdleCallback(() => {
    const cmd = "welcome";
    context.printCommand(cmd);
    executeCommand(cmd, context).finally(() => {
      safeFocus(input);
      queueMicrotask(scrollToBottom);
    });
  });

/*   requestAnimationFrame(() => {
    requestIdleCallback(() => {
      const initialCmd = "welcome";

      context.printCommand(initialCmd);

      executeCommand(initialCmd, context)
        .finally(() => {
          safeFocus(input);
          queueMicrotask(scrollToBottom);
        });
    });
  }); */

  // Focus terminal on click
  terminal.addEventListener("click", () => safeFocus(input));

  // --- KEY HANDLING ---
  input.addEventListener("keydown", async (e) => {

    // Reset tab state
    if (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") {
      input._tabIndex = null;
      input._tabBase = null;
    }

    // TAB completion
    if (e.key === "Tab") {
      e.preventDefault();

      const raw = input.value;
      const current = raw.trim();
      if (!current) return;

      // Lazy-load registry on first Tab press
      if (!commandList) {
        const registry = await getRegistry();
        commandList = Object.keys(registry);
      }

      const matches = commandList.filter(cmd => cmd.startsWith(current));
      if (matches.length === 0) return;

      if (matches.length === 1) {
        input.value = matches[0] + " ";
        return;
      }

      if (!input._tabIndex || input._tabBase !== current) {
        input._tabIndex = 0;
        input._tabBase = current;
      } else {
        input._tabIndex = e.shiftKey
          ? (input._tabIndex - 1 + matches.length) % matches.length
          : (input._tabIndex + 1) % matches.length;
      }

      input.value = matches[input._tabIndex];
      return;
    }

    // HISTORY navigation
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

      if (historyIndex === -1) return;

      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }

      return;
    }

    // ESC = clear
    if (e.key === "Escape") {
      e.preventDefault();

      const raw = "clear";
      const cmd = "clear";

      context.printCommand(cmd);

      try {
        await executeCommand(raw, context);
      } finally {
        input.value = "";
        historyIndex = -1;
        safeFocus(input);
        queueMicrotask(scrollToBottom);
      }

      return;
    }

    // ENTER = execute
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
        safeFocus(input);
        queueMicrotask(scrollToBottom);
      }

      return;
    }
  });

  // --- SCROLL BUTTON ---
  const scrollBtn = document.getElementById("scroll-to-bottom");

  registerScrollContainer(output);

  output.addEventListener("scroll", () => {
    const atBottom =
      output.scrollTop + output.clientHeight >= output.scrollHeight - 10;

    scrollBtn.classList.toggle("visible", !atBottom);
  }, { passive: true });

  scrollBtn.addEventListener("click", scrollToBottom);
}

function safeFocus(el) {
  if (document.activeElement !== el) el.focus();
}