/* import { resetPageState } from '../../core/pageLoader.js';
import { handleWelcome } from '../welcome/index.js';

export async function handleClear(ctx) {
  const output = ctx.output;

  // Clear terminal
  output.innerHTML = '';

  // Reset page state
  resetPageState();

  // Re-run welcome page
  await handleWelcome(ctx);
} */
export async function handle(ctx) {
  ctx.output.innerHTML = '';
}
