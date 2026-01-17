/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";
import { getConfig, isTelemetryEnabled } from './core/services/configService.js';

window.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize terminal immediately
  initializeTerminal();

  // 2. Preload registry during idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(async () => {
      await getConfig();

      if (isTelemetryEnabled()) {
        setTimeout(loadTelemetry, 2000);
      }
    });
  } else {
    setTimeout(async () => {
      await getConfig();

      if (isTelemetryEnabled()) {
        setTimeout(loadTelemetry, 2000);
      }
    }, 500);
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
