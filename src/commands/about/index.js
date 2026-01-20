/* import { loadAndRender } from '../../core/runtime/pageLoader.js';

export async function handle(ctx) {
  await loadAndRender('about', 'About', ctx.args);
} */
// src/commands/about/index.js
export async function handler(ctx) {
  const html = await fetch('/src/content/about.html').then(r => r.text());
  ctx.print(html);
}
