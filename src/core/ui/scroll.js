/** 
 * Scroll utility module to manage scrolling behavior in the terminal UI 
 */

let container = null;

export function registerScrollContainer(el) {
  container = el;
}

export function scrollToBottom() {
  if (!container) return;
  container.scrollTop = container.scrollHeight;
}
