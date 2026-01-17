import { scrollToBottom } from '../shared/ui/scroll.js';

let currentPage = null;

export function resetPageState() {
  currentPage = null;
}

export async function loadAndRender(page, name, args = null) {
  const { render } = await import(`../pages/${page}.js`);

  // Pull config from global (set by main.js after idle)
  const cfg = window.__config;

  await render(args, cfg);

  scrollToBottom();
}
