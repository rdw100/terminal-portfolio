/**
 * Loads the Marked library for Markdown parsing when needed.
 * @returns {Promise<void>} A promise that resolves when the Marked library is loaded.
 */
let markedReady = false;

export async function ensureMarked() {
  if (markedReady) return;

  await import('../../vendor/marked.umd.js');
  markedReady = true;
}
