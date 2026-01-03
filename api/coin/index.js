/* --- Coin API Azure Function ---
 *
 * This function handles requests for cryptocurrency prices.
 * It supports rate limiting and in-memory caching.
 * 
 */

// ===============================
// JSON response helper
// ===============================
function json(body, status = 200) {
  return {
    status,
    headers: { "Content-Type": "application/json" },
    body
  };
}

// ===============================
// Whitelist of allowed symbols
// ===============================
const map = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  ada: "cardano",
  usdt: "tether",
  bnb: "binancecoin",
  xrp: "ripple",
  usdc: "usd-coin",
  doge: "dogecoin",
  matic: "polygon"
};

// ===============================
// Rate limiting buckets
// ===============================
const rateLimits = {
  simple: { count: 0, limit: 30, windowMs: 60000, lastReset: Date.now() },
  coins:  { count: 0, limit: 10, windowMs: 60000, lastReset: Date.now() }
};

function checkAndReset(bucket) {
  const now = Date.now();
  if (now - bucket.lastReset >= bucket.windowMs) {
    bucket.count = 0;
    bucket.lastReset = now;
  }
}

function allowRequest(endpoint) {
  const bucket = rateLimits[endpoint];
  checkAndReset(bucket);

  if (bucket.count >= bucket.limit) {
    return false;
  }

  bucket.count++;
  return true;
}

function getCooldownSeconds(endpoint) {
  const bucket = rateLimits[endpoint];
  const now = Date.now();
  const elapsed = now - bucket.lastReset;
  const remaining = bucket.windowMs - elapsed;
  return Math.ceil(remaining / 1000);
}

// ===============================
// In-memory cache
// ===============================
const cache = {};
const CACHE_TTL = 10000; // 10 seconds

function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) return null;
  return entry.data;
}

function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}

// ===============================
// Azure Function entry point
// ===============================
module.exports = async function (context, req) {
  try {
    const symbol = (req.query.symbol || "").toLowerCase();
    const endpoint = (req.query.endpoint || "simple").toLowerCase();

    // ===============================
    // 400: Missing symbol
    // ===============================
    if (!symbol) {
      context.res = json({
        error: "Missing coin symbol",
        usage: "Usage: coin <symbol> (e.g., coin btc)"
      }, 400);
      return;
    }

    // ===============================
    // 400: Unsupported symbol
    // ===============================
    if (!map[symbol]) {
      context.res = json({
        error: `Unsupported coin '${symbol}'`,
        supported: Object.keys(map),
        usage: "Usage: coin <symbol> (e.g., coin btc)"
      }, 400);
      return;
    }

    // ===============================
    // Validate endpoint
    // ===============================
    if (!rateLimits[endpoint]) {
      context.res = json({
        error: `Unsupported endpoint '${endpoint}'`,
        supported: Object.keys(rateLimits)
      }, 400);
      return;
    }

    const coinId = map[symbol];
    const cacheKey = `${endpoint}:${symbol}`;

    // ===============================
    // Cache hit
    // ===============================
    const cached = getCache(cacheKey);
    if (cached) {
      context.res = json({
        symbol,
        price: cached[coinId]?.usd,
        cached: true
      });
      return;
    }

    // ===============================
    // Rate limit check
    // ===============================
    if (!allowRequest(endpoint)) {
      const cooldownSeconds = getCooldownSeconds(endpoint);

      context.res = json({
        error: `Rate limit exceeded for endpoint '${endpoint}'`,
        cooldownSeconds,
        message: `Please wait ${cooldownSeconds} seconds before trying again.`
      }, 429);
      return;
    }

    // ===============================
    // Build URL
    // ===============================
    let url = "";
    if (endpoint === "simple") {
      url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    } else if (endpoint === "coins") {
      url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    }

    // ===============================
    // Fetch from CoinGecko
    // ===============================
    const response = await fetch(url);
    const data = await response.json();

    // Detect provider rate limit or malformed response
    if (!data || !data[coinId] || typeof data[coinId].usd === "undefined") {
      const cooldownSeconds = getCooldownSeconds(endpoint);

      context.res = json({
        error: "Provider rate limit reached",
        cooldownSeconds,
        message: `CoinGecko is rate limiting. Try again in ${cooldownSeconds} seconds.`
      }, 429);
      return;
    }

    // Cache result
    setCache(cacheKey, data);

    // ===============================
    // 200: Success
    // ===============================
    context.res = json({
      symbol,
      price: data[coinId].usd,
      cached: false
    });

  } catch (err) {
    // ===============================
    // 500: Server error
    // ===============================
    context.res = json({ error: err.message }, 500);
  }
};