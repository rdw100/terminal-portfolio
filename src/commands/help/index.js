import { loadAndRender } from '../../core/pageLoader.js';

export async function handleHelp(ctx) {
  await loadAndRender('help', 'Help', ctx.args);
}