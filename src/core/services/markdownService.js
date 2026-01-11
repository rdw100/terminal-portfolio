let markedReady = false;

export async function ensureMarked() {
  if (markedReady) return;

  await import('../../vendor/marked.umd.js');
  markedReady = true;
}
