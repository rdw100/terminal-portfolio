/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */
import { initializeTerminal } from "./core/terminal/terminal.js";
import { Telemetry } from "./core/terminal/telemetry.js";

Telemetry.init("__TP_INSIGHTS_CONN__");

/** Registers an event listener to load the welcome page 
 * on DOMContentLoaded and dispatch the command inside it */
window.addEventListener('DOMContentLoaded', () => {
  // Wires input handler to the terminal input box
  initializeTerminal();
});
