// src/commands/projects/index.js
import { loadAndRender } from '../../core/pageLoader.js';

export async function handleProjects(ctx) {
  await loadAndRender('projects', 'Projects', ctx.args);
}