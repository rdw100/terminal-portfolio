/* Handles the 'resume' command, displaying the user's resume. */
import { loadAndRender } from '../../core/runtime/pageLoader.js';

export async function handle(ctx) {
  await loadAndRender('resume', 'Resume', ctx.args);
}
