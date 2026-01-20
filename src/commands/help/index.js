// import { loadAndRender } from '../../core/runtime/pageLoader.js';

// export async function handle(ctx) {
//   await loadAndRender('help', 'Help', ctx.args);
// }
// src/commands/help/index.js
export async function handler(ctx) {
  const html = await fetch('/src/content/help.html').then(r => r.text());
  ctx.print(html);
}
