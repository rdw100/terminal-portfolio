import { getCoinPrice, renderCoinList } from '../services/coinService.js';
import { startCooldownTimer } from '../shared/ui/Cooldown.js';

const output = document.getElementById('output');

export async function render(args = []) {

  // 1. Handle "coin list"
  if (args[0] === "list") {
    const html = renderCoinList();
    output.insertAdjacentHTML('beforeend', `<h2>Available Coins</h2>${html}<br/>`);
    return;
  }

  // 2. Handle incorrect usage
  if (args.length !== 1) {
    output.insertAdjacentHTML(
      'beforeend',
      `<h2>Coin Price</h2><p>Usage: <b>coin <symbol></b><br>Example: coin btc</p><br/>`
    );
    return;
  }

  // 3. Handle "coin <symbol>"
  const symbol = args[0].toLowerCase();

  try {
    const data = await getCoinPrice(symbol);

    output.insertAdjacentHTML(
      'beforeend',
      `<div>${data.symbol.toUpperCase()} USD: $${data.price}</div><br/>`
    );

  } catch (err) {
    // Print the backend error message
    output.insertAdjacentHTML(
      'beforeend',
      `<div>${err.message}</div>`
    );

    // Extract cooldown seconds from the message
    const match = err.message.match(/(\d+)\s*seconds?/i);
    if (match) {
      const seconds = parseInt(match[1], 10);
      startCooldownTimer(output, seconds);
    }

    output.insertAdjacentHTML('beforeend', '<br/>');
    return;
  }
}
