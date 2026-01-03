/* --- Coin Service ---
 *
 * This service provides functions to fetch cryptocurrency prices
 * and render a static list of top coins. The command dispatcher/executor  
 * uses config.yaml → coinServices → coin.js → executor/dispatcher
 * 
 */

/* Static list of top 10 coins by market cap */
export const STATIC_TOP_COINS = [
  { symbol: "BTC",  name: "Bitcoin" },
  { symbol: "ETH",  name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "BNB",  name: "BNB" },
  { symbol: "XRP",  name: "XRP" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "ADA",  name: "Cardano" },
  { symbol: "DOGE", name: "Dogecoin" },
  { symbol: "MATIC", name: "Polygon" },
  { symbol: "SOL",  name: "Solana" },
];

/* Fetch coin price from backend API */
export async function getCoinPrice(symbol) {
  const res = await fetch(`/api/coin?symbol=${symbol}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.usage || data.error || 'Invalid coin command');
  }

  return data;
}

/* Render static list of top coins */
export function renderCoinList() {
  return STATIC_TOP_COINS
    .map((coin, index) => {
      // Simple numbered list, adjust formatting as you like
      return `<div class="indent">${index + 1}. ${coin.symbol}</div>`;
    })
    .join("");
}