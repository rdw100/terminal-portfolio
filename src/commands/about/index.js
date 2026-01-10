import { loadAndRender } from '../../core/pageLoader.js';

export async function handleAbout(ctx) {
  await loadAndRender('about', 'About');
}