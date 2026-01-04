/* --- Shared user interface helper for cooldown timers using color coding and 
* animated spinner --- */

/* --- Spinner frames for animation --- */
const SPINNER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

/* --- Function to start a cooldown timer in the terminal output element --- */
export function startCooldownTimer(outputEl, seconds) {
  let remaining = seconds;
  let frame = 0;

  /* Create a line in the terminal to update */
  const line = document.createElement("div");
  line.style.color = "yellow"; // cooldown color
  outputEl.appendChild(line);

  /* --- Update the line every second with spinner and remaining time --- */
  const interval = setInterval(() => {
    const spinner = SPINNER_FRAMES[frame % SPINNER_FRAMES.length];
    frame++;

    line.innerHTML = `${spinner} Waiting… ${remaining}s remaining`;
    remaining--;

    if (remaining < 0) {
      clearInterval(interval);
      line.style.color = "lightgreen"; // cooldown complete color
      line.innerHTML = `✔ Cooldown complete. You may retry the command.`;
    }
  }, 1000);
}