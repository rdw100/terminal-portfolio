/* Entry point for the terminal portfolio application. 
   Sets up event listeners and dispatches the initial command. */

import { initializeTerminal, dispatchCommand } from './core/terminal.js';

/** Registers an event listener to load the welcome page 
 * on DOMContentLoaded and dispatch the command inside it */
window.addEventListener('DOMContentLoaded', () => {
  // Wires input handler to the terminal input box
  initializeTerminal();
});
