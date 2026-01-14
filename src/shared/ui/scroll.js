/* Scroll utility module to manage scrolling behavior in 
the terminal UI */
let scrollContainer = null;

export function registerScrollContainer(element) {
  scrollContainer = element;
}

export function scrollToBottom() {
  if (!scrollContainer) return;

  requestAnimationFrame(() => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  });
}