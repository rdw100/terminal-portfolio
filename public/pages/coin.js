import { getCoinPrice } from '../services/coinService.js';

const output = document.getElementById('output');

export async function render(args = []) {
  if (args.length !== 1) {
    output.insertAdjacentHTML(
      'beforeend',
      `<h2>Coin Price</h2><p>Usage: <b>coin <symbol></b><br><p>Example: coin btc</p></p>`
    );
    return;
  }

  const symbol = args[0].toLowerCase();

  try {
    const data = await getCoinPrice(symbol);

    output.insertAdjacentHTML(
      'beforeend',
      `<div>${data.symbol.toUpperCase()} USD: $${data.price}</div>`
    );
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>${err.message}</div>`
    );
  }
}
