import { loadAndRender } from '../../core/runtime/pageLoader.js';

export async function handle(ctx) {
  await loadAndRender('projects', 'Projects', ctx.args);
}
