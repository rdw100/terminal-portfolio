import { getRegistry } from './getRegistry.js';
import { executeCommand } from './terminalEngine.js';

export async function initRuntime(ctx) {
  const input = document.getElementById("terminal-input");
  const output = ctx.output;

  const registry = await getRegistry();
  const commandList = Object.keys(registry);

  const history = [];
  let historyIndex = -1;

  // RUNTIME KEY HANDLER (replaces shell handler)
  input.onkeydown = async (e) => {
    
    // TAB completion
    if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim();
      if (!current) return;

      const matches = commandList.filter(cmd => cmd.startsWith(current));
      if (matches.length === 1) {
        input.value = matches[0] + " ";
        return;
      }

      if (!input._tabIndex || input._tabBase !== current) {
        input._tabIndex = 0;
        input._tabBase = current;
      } else {
        input._tabIndex = (input._tabIndex + 1) % matches.length;
      }

      input.value = matches[input._tabIndex];
      return;
    }

    // HISTORY
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIndex === -1) {
        historyIndex = history.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }

      input.value = history[historyIndex];
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }
      return;
    }

    // ESC
    if (e.key === "Escape") {
      e.preventDefault();
      output.innerHTML = "";
      input.value = "";
      return;
    }

    // ENTER
    if (e.key === "Enter") {
      e.preventDefault();

      const raw = input.value;
      input.value = "";

      const trimmed = raw.trim();
      if (!trimmed) return;

      // HISTORY
      history.push(trimmed);
      if (history.length > 100) history.shift();
      historyIndex = -1;

      // PARSE COMMAND + ARGS  ⭐ FIX
      const parts = trimmed.split(/\s+/);
      const commandName = parts[0];
      const args = parts.slice(1);

      ctx.args = args;

      ctx.printCommand(trimmed);

      try {
        await executeCommand(trimmed, ctx);
      } finally {
        queueMicrotask(() => {
          output.scrollTop = output.scrollHeight;
        });
      }
    }
  };
}