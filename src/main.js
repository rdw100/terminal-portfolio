/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the terminal as soon as DOM is ready
  initializeTerminal();

  // Defer telemetry load + init until the browser is idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadTelemetry);
    requestIdleCallback(preloadCommandRegistry);
  } else {
    // Fallback for older browsers
    setTimeout(loadTelemetry, 2000);
    setTimeout(preloadCommandRegistry, 2500);
  }
});

function loadTelemetry() {
  import("./core/terminal/telemetry.js")
    .then(({ Telemetry }) => {
      Telemetry.init("__TP_INSIGHTS_CONN__");
    })
    .catch((err) => {
      console.warn("Telemetry failed to initialize", err);
    });
}

// ⭐ Optional: Preload command registry during idle time
function preloadCommandRegistry() {
  import("./core/terminal/getRegistry.js")
    .then(mod => mod.getRegistry())
    .catch(err => console.warn("Registry preload failed", err));
}