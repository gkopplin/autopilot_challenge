export const initialStocks = [
  { symbol: 'AAPL', name: 'Apple', price: 185, change: 0 },
  { symbol: 'TSLA', name: 'Tesla', price: 245, change: 0 },
  { symbol: 'MSFT', name: 'Microsoft', price: 310, change: 10 },
  { symbol: 'AMZN', name: 'Amazon', price: 130, change: -5 },
  { symbol: 'NVDA', name: 'Nvidia', price: 440, change: 0 },
]

export function updatePrices(stocks) {
  return stocks.map(s => ({
    ...s,
    change: (Math.random() - 0.5) * 2,
    price: Math.max(1, s.price + (Math.random() - 0.5) * 5),
  }))
}
