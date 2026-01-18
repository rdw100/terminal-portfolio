import { renderLivePrompt, renderPrompt } from '../core/terminal/prompt.js';
import { scrollToBottom, registerScrollContainer } from '../shared/ui/scroll.js';

export function initializeShellTerminal() {
  const terminal = document.getElementById("terminal");
  const output = document.getElementById("output");
  const live = document.getElementById("live");

  if (!terminal || !output || !live) return;

  const staticPrompt = renderPrompt();
  //live.innerHTML = renderLivePrompt();

  const input = document.getElementById("terminal-input");
  if (!input) return;

  safeFocus(input);

  const ctx = {
    terminal,
    output,
    print: html => output.insertAdjacentHTML("beforeend", html),
    printCommand: cmd => {
      output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${staticPrompt} ${cmd}</div>`
      );
    }
  };

  ctx.print(`<div class="terminal-output">Type <strong>boot</strong> or <strong>welcome</strong> to begin.</div>`);

  async function executeShellCommand(raw) {
    const cmd = raw.trim();

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    if (cmd === "boot" || cmd === "welcome") {
      ctx.printCommand(cmd);
      const { handleBoot } = await import('../boot/index.js');
      await handleBoot(ctx);
      return;
    }

    ctx.print(`<div class="terminal-output">Unknown command: ${cmd}</div>`);
  }

  input.onkeydown = async (e) => { 

    if (e.key === "Enter") {
      e.preventDefault();
      const raw = input.value;
      input.value = "";
      if (!raw.trim()) return;

      await executeShellCommand(raw);
      safeFocus(input);
      queueMicrotask(scrollToBottom);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      output.innerHTML = "";
      input.value = "";
      safeFocus(input);
      queueMicrotask(scrollToBottom);
    }
  };

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
