module.exports = async function (context, req) {
  const symbol = (req.query.symbol || '').toLowerCase();

  if (!symbol) {
    context.res = {
      status: 400,
      body: {
        error: "Missing coin symbol",
        usage: "Usage: coin btc"
      }
    };
    return;
  }

  const map = {
    btc: 'bitcoin',
    eth: 'ethereum',
    sol: 'solana',
    ada: 'cardano'
  };

  const coinId = map[symbol];

  if (!coinId) {
    context.res = {
      status: 400,
      body: {
        error: `Unsupported coin '${symbol}'`,
        supported: Object.keys(map),
        usage: "Usage: coin btc"
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
