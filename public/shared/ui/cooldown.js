/* --- Shared user interface helper for cooldown timers using color coding and 
* animated spinner --- */

// /* --- Spinner frames for animation --- */
// const SPINNER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

// /* --- Function to start a cooldown timer in the terminal output element --- */
// export function startCooldownTimer(outputEl, seconds) {
//   let remaining = seconds;
//   let frame = 0;

//   /* Create a line in the terminal to update */
//   const line = document.createElement("div");
//   line.style.color = "yellow"; // cooldown color
//   outputEl.appendChild(line);

//   /* --- Update the line every second with spinner and remaining time --- */
//   const interval = setInterval(() => {
//     const spinner = SPINNER_FRAMES[frame % SPINNER_FRAMES.length];
//     frame++;

//     line.innerHTML = `${spinner} Waiting… ${remaining}s remaining`;
//     remaining--;

//     if (remaining < 0) {
//       clearInterval(interval);
//       line.style.color = "lightgreen"; // cooldown complete color
//       line.innerHTML = `✔ Cooldown complete. You may retry the command.`;
//     }
//   }, 1000);
// }

const SPINNER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

export function startCooldownTimer(outputEl, seconds) {
  let remaining = seconds;
  let frame = 0;

  // Create lines in the terminal
  const spinnerLine = document.createElement("div");
  spinnerLine.style.color = "yellow";

  const barLine = document.createElement("div");
  barLine.style.color = "yellow";

  outputEl.appendChild(spinnerLine);
  outputEl.appendChild(barLine);

  const interval = setInterval(() => {
    const spinner = SPINNER_FRAMES[frame % SPINNER_FRAMES.length];
    frame++;

    // Spinner + countdown
    spinnerLine.innerHTML = `${spinner} Waiting… ${remaining}s remaining`;

    // Progress bar
    const total = seconds;
    const percent = Math.max(0, Math.min(1, (total - remaining) / total));
    const barWidth = 12; // characters
    const filled = Math.round(percent * barWidth);
    const empty = barWidth - filled;

    const bar = `[${"█".repeat(filled)}${"░".repeat(empty)}] ${Math.round(percent * 100)}%`;
    barLine.innerHTML = bar;

    remaining--;

    if (remaining < 0) {
      clearInterval(interval);

      spinnerLine.style.color = "lightgreen";
      barLine.style.color = "lightgreen";

      spinnerLine.innerHTML = `✔ Cooldown complete. You may retry the command.`;
      barLine.innerHTML = `[${"█".repeat(barWidth)}] 100%`;
    }
  }, 1000);
}
