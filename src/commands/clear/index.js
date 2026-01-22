/* Handles the 'clear' command, clearing the terminal output area. */
export async function handle(ctx) {
  ctx.output.innerHTML = '';
}
