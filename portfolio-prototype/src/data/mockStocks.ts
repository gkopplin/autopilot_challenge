export const initialStocks = [
  { symbol: 'AAPL', name: 'Apple', price: 185, change: 0, history: [] },
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

