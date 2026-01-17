/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";
import { isTelemetryEnabled } from './core/services/configService.js';

window.addEventListener("DOMContentLoaded", () => {
  // Terminal init ASAP after DOM is ready
  initializeTerminal();

  // Preload registry during idle (small, safe)
  if ("requestIdleCallback" in window) {
    requestIdleCallback(preloadCommandRegistry);
  } else {
    setTimeout(preloadCommandRegistry, 500);
  }

  // Telemetry much later (heavy)
  if (isTelemetryEnabled()) { 
    setTimeout(loadTelemetry, 2000);
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
