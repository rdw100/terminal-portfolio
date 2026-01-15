/* Scroll utility module to manage scrolling behavior in the terminal UI */

let scrollContainer;

export function registerScrollContainer(element) {
  scrollContainer = element;
}

export function scrollToBottom() {
  if (!scrollContainer) return;

  const height = scrollContainer.scrollHeight;

  requestAnimationFrame(() => {
    scrollContainer.scrollTop = height;
  });
}
