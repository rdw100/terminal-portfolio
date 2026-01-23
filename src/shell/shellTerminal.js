/** 
 * Initializes the shell terminal interface and handles user input. 
 * @returns {void}
*/
import { getPrompt } from '../core/terminal/prompt.js';

export function initializeShellTerminal() {
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("output");

  if (!terminal || !input || !output) return;

  input.onkeydown = async (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const raw = input.value.trim();
    input.value = "";
    if (!raw) return;

    const cmd = raw.toLowerCase();

    // Echo the command ONCE
    output.insertAdjacentHTML(
      "beforeend",
      `<div class="terminal-command">${getPrompt()} ${raw}</div>`
    );

    // Built-in clear
    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    // Boot or welcome
    if (cmd === "boot" || cmd === "welcome") {

      // Echo once
/*       output.insertAdjacentHTML(
        "beforeend",
        `<div class="terminal-command">${getPrompt()} ${raw}</div>`
      ); */

      // Build persistent ctx
      const runtimeCtx = {
        terminal,
        output,
        input,
        print: html => output.insertAdjacentHTML("beforeend", html),
        printCommand: cmd => {
          output.insertAdjacentHTML(
            "beforeend",
            `<div class="terminal-command">${getPrompt()} ${cmd}</div>`
          );
        }
      };

      const { handler } = await import(`/src/commands/${cmd}/index.js`);
      await handler(runtimeCtx);

      return;
    }

    // Unknown command
    output.insertAdjacentHTML(
      "beforeend",
      `<div class="terminal-output">Unknown command: ${raw}</div>`
    );
  };
}
