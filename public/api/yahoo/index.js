module.exports = async function (context, req) {
  const ticker = (req.query.ticker || '').toUpperCase();

  if (!ticker) {
    context.res = {
      status: 400,
      body: { error: 'Missing ticker' }
    };
    return;
  }

  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    context.res = {
      status: 200,
      body: data
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: 'Yahoo request failed' }
    };
  }
};
