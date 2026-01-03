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
      `<h2>Coin Price</h2><p>Usage: <b>coin <symbol></b><br>Example: coin btc</p>` + '<br/>'
    );
    return;
  }

  // 3. Handle "coin <symbol>"
  const symbol = args[0].toLowerCase();

  try {
    const data = await getCoinPrice(symbol);

    output.insertAdjacentHTML(
      'beforeend',
      `<div>${data.symbol.toUpperCase()} USD: $${data.price}</div>` + '<br/>'
    );
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>${err.message}</div>` + '<br/>'
    );
  }
}