import { scrollToBottom } from '../shared/ui/scroll.js';

let currentPage = null;

export function resetPageState() {
  currentPage = null;
}

export async function loadAndRender(page, name, args = null) {
  const { render } = await import(`../pages/${page}.js`);
  await render(args);
  scrollToBottom();
}