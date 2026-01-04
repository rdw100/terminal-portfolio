// shared/ui/scroll.js
export function scrollToBottom(el) {
  if (!el) return;
  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
  });
}