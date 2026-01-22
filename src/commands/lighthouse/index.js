/* Handles the 'lighthouse' command, displaying Lighthouse audit information. */
export async function handler(ctx) {
  const html = await fetch('/src/content/lighthouse/lighthouse.html').then(r => r.text());
  ctx.print(html);
}
