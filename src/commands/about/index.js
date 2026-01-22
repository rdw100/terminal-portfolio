/* Handles the 'about' command, displaying information about the application. */
export async function handler(ctx) {
  const html = await fetch('/src/content/about.html').then(r => r.text());
  ctx.print(html);
}
