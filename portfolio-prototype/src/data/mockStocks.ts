export const initialStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: 185,
    change: 0,
    history: [
      { date: '2025-10-01T09:00:00.000Z', price: 180 },
      { date: '2025-10-02T09:00:00.000Z', price: 181 },
      { date: '2025-10-03T09:00:00.000Z', price: 182 },
      { date: '2025-10-04T09:00:00.000Z', price: 183 },
      { date: '2025-10-05T09:00:00.000Z', price: 184 },
      { date: '2025-10-06T09:00:00.000Z', price: 184.5 },
      { date: '2025-10-07T09:00:00.000Z', price: 185 },
      { date: '2025-10-08T09:00:00.000Z', price: 185.2 },
      { date: '2025-10-09T09:00:00.000Z', price: 185.1 },
      { date: '2025-10-10T09:00:00.000Z', price: 185 },
    ],
  },
  { symbol: 'TSLA', name: 'Tesla', price: 245, change: 0, history: [] },
  { symbol: 'MSFT', name: 'Microsoft', price: 310, change: 10, history: [] },
  { symbol: 'AMZN', name: 'Amazon', price: 130, change: -5, history: [] },
  { symbol: 'NVDA', name: 'Nvidia', price: 440, change: 0, history: [] },
]

export const updatePrices = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    const change = (Math.random() - 0.5) * 2
    const newPrice = Math.max(stock.price + change, 0)
    const newEntry = { date: new Date().toISOString(), price: newPrice }
    return {
      ...stock,
      price: newPrice,
      history: [...stock.history, newEntry],
    }
  })
}


export interface Stock {
  symbol: string      
  name: string         
  price: number       
  change?: number      
  history: { date: string; price: number }[]
}

