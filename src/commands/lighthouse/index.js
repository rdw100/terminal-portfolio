import { loadAndRender } from '../../core/pageLoader.js';

export async function handleLighthouse(ctx) {
  await loadAndRender('lighthouse', 'Lighthouse', ctx.args);
}