import { getCoinPrice, renderCoinList } from '../services/coinService.js';
import { startCooldownTimer } from '../shared/ui/cooldown.js';
import { scrollToBottom } from '../shared/ui/scroll.js';

const output = document.getElementById('output');

export async function render(args = []) {

  // 1. Handle "coin list"
  if (args[0] === "list") {
    const html = renderCoinList();
    output.insertAdjacentHTML(
      'beforeend',
      `<h2>Available Coins</h2>${html}<br/>`
    );
    scrollToBottom(output);
    return;
  }

  // 2. Handle incorrect usage
  if (args.length !== 1) {
    output.insertAdjacentHTML(
      'beforeend',
      `<h2>Coin Price</h2>
       <p>Usage: <b>coin &lt;symbol&gt;</b><br>Example: coin btc</p><br/>`
    );
    scrollToBottom(output);
    return;
  }

  // 3. Handle "coin <symbol>"
  const symbol = args[0].toLowerCase();
  const cachedLabel = data.cached
    ? " <span style='color:yellow'>[cached]</span>"
    : "";

  try {
    const data = await getCoinPrice(symbol);

    output.insertAdjacentHTML(
      'beforeend',
      `<div>${data.symbol.toUpperCase()} USD: $${data.price}</div><br/>`
    );
    scrollToBottom(output);

  } catch (err) {
    // Print backend error message
    output.insertAdjacentHTML(
      'beforeend',
      `<div>${err.message}</div>`
    );
    scrollToBottom(output);

    // Extract cooldown seconds
    const match = err.message.match(/(\d+)\s*seconds?/i);
    if (match) {
      const seconds = parseInt(match[1], 10);
      startCooldownTimer(output, seconds);
      scrollToBottom(output);
    }

    output.insertAdjacentHTML(
      'beforeend',
      `<div>${data.symbol.toUpperCase()} USD: $${data.price}${cachedLabel}</div><br/>`
    );
    scrollToBottom(output);
    return;
  }
}