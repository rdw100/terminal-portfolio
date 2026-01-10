// src/commands/welcome/index.js
import { loadAndRender } from '../../core/pageLoader.js';

export async function handleWelcome(ctx) {
  await loadAndRender('welcome', 'Welcome', ctx.args);
}