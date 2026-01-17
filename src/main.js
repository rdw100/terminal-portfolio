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

    // Make config globally available to all pages
    window.__config = cfg;

    // Lazy-load welcome UI 
    loadWelcomeUI();

    // Conditionally load telemetry
    if (cfg.telemetry === true) {
      setTimeout(loadTelemetry, 2000);
    }
  });
} else {
  // Fallback for older browsers
  setTimeout(async () => {
    preloadCommandRegistry();

    const cfg = await getConfig();

    // Lazy-load welcome UI 
    loadWelcomeUI();

    // Make config globally available to all pages
    window.__config = cfg;

    if (cfg.telemetry === true) {
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

async function loadWelcomeUI() {
  const { render } = await import('./pages/welcome.js');

  // Render welcome page into the terminal
  await render([], window.__config);

  // Optional: scroll after render
  requestAnimationFrame(() => {
    const live = document.getElementById('live');
    live?.scrollIntoView({ behavior: 'smooth' });
  });
}