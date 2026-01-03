module.exports = async function (context, req) {
  const symbol = (req.query.symbol || '').toLowerCase();

  if (!symbol) {
    context.res = {
      status: 400,
      body: {
        error: "Missing coin symbol",
        usage: "Usage: coin <symbol> (e.g., coin btc)"
      }
    };
    return;
  }

  /* Whitelist of supported coins */
  const map = {
    btc: 'bitcoin',
    eth: 'ethereum',
    usdt: 'tether',
    bnb: 'binancecoin',
    xrp: 'ripple',
    usdc: 'usd-coin',
    ada: 'cardano',
    doge: 'dogecoin',
    matic: 'polygon',
    sol: 'solana'
  };

  const coinId = map[symbol];

  if (!coinId) {
    context.res = {
      status: 400,
      body: {
        error: `Unsupported coin '${symbol}'`,
        supported: Object.keys(map),
        usage: "Usage: coin <symbol> (e.g., coin btc)"
      }
    };
    return;
  }

  try {
    const url =
      `https://api.coingecko.com/api/v3/simple/price` +
      `?ids=${coinId}&vs_currencies=usd`;

    const response = await fetch(url);
    const data = await response.json();

    context.res = {
      status: 200,
      body: {
        symbol,
        price: data[coinId].usd
      }
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
