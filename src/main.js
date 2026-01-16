/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";

// No top-level Telemetry import
// import { Telemetry } from "./core/terminal/telemetry.js";

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the terminal as soon as DOM is ready
  initializeTerminal();

  // Defer telemetry load + init until the browser is idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadTelemetry);
  } else {
    // Fallback for older browsers
    setTimeout(loadTelemetry, 2000);
  }
});

function loadTelemetry() {
  import("./core/terminal/telemetry.js")
    .then(({ Telemetry }) => {
      Telemetry.init("__TP_INSIGHTS_CONN__");
    })
    .catch((err) => {
      // Optional: log or ignore telemetry init failures
      console.warn("Telemetry failed to initialize", err);
    });
}
