/** 
 * Initializes the shell script that sets up the terminal interface
 * @param {Event} event - The DOMContentLoaded event object.
 * @return {void}
 */ 
import { initializeShellTerminal } from './shellTerminal.js';

window.addEventListener('DOMContentLoaded', () => {
  initializeShellTerminal();
});
