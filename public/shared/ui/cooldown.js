/* --- Shared user interface helper for cooldown timers using color coding and 
* animated spinner --- */
import { scrollToBottom } from '.ui/scroll.js';

const SPINNER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

export function startCooldownTimer(outputEl, seconds) {
  let remaining = seconds;
  let frame = 0;

  const spinnerLine = document.createElement("div");
  spinnerLine.style.color = "yellow";

  const barLine = document.createElement("div");
  barLine.style.color = "yellow";

  outputEl.appendChild(spinnerLine);
  outputEl.appendChild(barLine);

  scrollToBottom(outputEl);

  const interval = setInterval(() => {
    const spinner = SPINNER_FRAMES[frame % SPINNER_FRAMES.length];
    frame++;

    spinnerLine.innerHTML = `${spinner} Waiting… ${remaining}s remaining`;

    const total = seconds;
    const percent = Math.max(0, Math.min(1, (total - remaining) / total));
    const barWidth = 12;
    const filled = Math.round(percent * barWidth);
    const empty = barWidth - filled;

    barLine.innerHTML = `[${"█".repeat(filled)}${"░".repeat(empty)}] ${Math.round(percent * 100)}%`;

    scrollToBottom(outputEl);

    remaining--;

    if (remaining < 0) {
      clearInterval(interval);

      spinnerLine.style.color = "lightgreen";
      barLine.style.color = "lightgreen";

      spinnerLine.innerHTML = `✔ Cooldown complete. You may retry the command.`;
      barLine.innerHTML = `[${"█".repeat(barWidth)}] 100%`;

      scrollToBottom(outputEl);
    }
  }, 1000);
}