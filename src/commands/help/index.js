/* Handles the 'help' command, displaying help information to the user. */
export async function handler(ctx) {
  const html = await fetch('/src/content/help.html').then(r => r.text());
  ctx.print(html);
}
