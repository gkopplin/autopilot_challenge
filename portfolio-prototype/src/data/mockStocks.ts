export const initialStocks = [
  { symbol: 'AAPL', name: 'Apple', price: 185 },
  { symbol: 'TSLA', name: 'Tesla', price: 245 },
  { symbol: 'MSFT', name: 'Microsoft', price: 310 },
  { symbol: 'AMZN', name: 'Amazon', price: 130 },
  { symbol: 'NVDA', name: 'Nvidia', price: 440 },
]

export function updatePrices(stocks) {
  return stocks.map(s => ({
    ...s,
    change: (Math.random() - 0.5) * 2,
    price: Math.max(1, s.price + (Math.random() - 0.5) * 5),
  }))
}
