import { loadAndRender } from '../../core/pageLoader.js';

export async function handleResume(ctx) {
  await loadAndRender('resume', 'Resume', ctx.args);
}