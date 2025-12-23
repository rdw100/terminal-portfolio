import { scrollToBottom } from 'scroll.js';

export function print(html, smooth = false) {
  const output = document.getElementById('output');
  output.insertAdjacentHTML('beforeend', html);
  scrollToBottom(smooth);
}
