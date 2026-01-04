import { getCoinPrice, renderCoinList } from '../services/coinService.js';

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
    output.insertAdjacentHTML(
      'beforeend',
      `<div>${err.message}</div>`
    );

    // Extract seconds from the message if present
    const match = err.message.match(/(\d+)\s*seconds?/i);
    if (!match) {
      output.insertAdjacentHTML('beforeend', '<br/>');
      return;
    }

    let seconds = parseInt(match[1], 10);

    // Create a live-updating line
    const line = document.createElement('div');
    output.appendChild(line);

    const interval = setInterval(() => {
      line.innerHTML = `⏳ Waiting… ${seconds}s remaining`;
      seconds--;

      if (seconds < 0) {
        clearInterval(interval);
        line.innerHTML = `Cooldown complete. You may retry the command.`;
      }
    }, 1000);

    output.insertAdjacentHTML('beforeend', '<br/>');
    return;
  }
}