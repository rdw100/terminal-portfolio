export async function getCoinPrice(symbol) {
  const res = await fetch(`/api/coin?symbol=${symbol}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.usage || data.error || 'Invalid coin command');
  }

  return data;
}