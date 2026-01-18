import { loadAndRender } from '../../core/runtime/pageLoader.js';

export async function handle(ctx) {
  await loadAndRender('welcome', 'Welcome', ctx.args);
}
