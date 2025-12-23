let markedReady = false;

export async function ensureMarked() {
  if (markedReady) return;

  await import('../scripts/vendor/marked.umd.js');
  markedReady = true;
}
