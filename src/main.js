/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";

window.addEventListener("DOMContentLoaded", () => {
  // Defer terminal initialization until the browser is idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => initializeTerminal());
  } else {
    // Fallback for older browsers
    setTimeout(() => initializeTerminal(), 0);
  }

  // Defer telemetry load + init until idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadTelemetry);
    requestIdleCallback(preloadCommandRegistry);
  } else {
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

function preloadCommandRegistry() {
  import("./core/terminal/getRegistry.js")
    .then(mod => mod.getRegistry())
    .catch(err => console.warn("Registry preload failed", err));
}