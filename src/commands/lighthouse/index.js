// import { loadAndRender } from '../../core/runtime/pageLoader.js';

// export async function handle(ctx) {
//   await loadAndRender('lighthouse', 'Lighthouse', ctx.args);
// }
export async function handler(ctx) {
  const html = await fetch('/src/content/lighthouse/lighthouse.html').then(r => r.text());
  ctx.print(html);
}
