/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";
import { getConfig } from './core/services/configService.js';

window.addEventListener("DOMContentLoaded", () => {
  // 1. Terminal init ASAP
  initializeTerminal();

  // 2. Idle work: preload registry + load config + maybe load telemetry
  if ("requestIdleCallback" in window) {
    requestIdleCallback(async () => {
      // Preload registry (cheap, safe)
      preloadCommandRegistry();

      // Load config (lazy JSON)
      const cfg = await getConfig();
      window.__config = cfg;

      // Conditionally load telemetry
      if (cfg.telemetry === true) {
        setTimeout(loadTelemetry, 2000);
      }

      // ⭐ Schedule welcome loader AFTER config idle work
      scheduleWelcomeLoader();
    });
  } else {
    // Fallback for older browsers
    setTimeout(async () => {
      preloadCommandRegistry();

      const cfg = await getConfig();
      window.__config = cfg;

      if (cfg.telemetry === true) {
        setTimeout(loadTelemetry, 2000);
      }

      scheduleWelcomeLoader();
    }, 500);
  }
});

function scheduleWelcomeLoader() {
  // Phase 1: Wait for first paint
  requestAnimationFrame(() => {
    // Phase 2: Guaranteed post-LCP delay
    setTimeout(async () => {
      const { render } = await import('./pages/welcome.js');
      await render([], window.__config);
    }, 1500); // Safe for throttled CPUs
  });
}

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
