export const initialStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: 185,
    change: 0,
    history: [
      { date: '2025-09-21T09:00:00.000Z', price: 175 },
      { date: '2025-09-22T09:00:00.000Z', price: 176 },
      { date: '2025-09-23T09:00:00.000Z', price: 177 },
      { date: '2025-09-24T09:00:00.000Z', price: 178 },
      { date: '2025-09-25T09:00:00.000Z', price: 179 },
      { date: '2025-09-26T09:00:00.000Z', price: 180 },
      { date: '2025-09-27T09:00:00.000Z', price: 181 },
      { date: '2025-09-28T09:00:00.000Z', price: 182 },
      { date: '2025-09-29T09:00:00.000Z', price: 183 },
      { date: '2025-09-30T09:00:00.000Z', price: 184 },
      { date: '2025-10-01T09:00:00.000Z', price: 185 },
      { date: '2025-10-02T09:00:00.000Z', price: 186 },
      { date: '2025-10-03T09:00:00.000Z', price: 187 },
      { date: '2025-10-04T09:00:00.000Z', price: 186.5 },
      { date: '2025-10-05T09:00:00.000Z', price: 186.8 },
      { date: '2025-10-06T09:00:00.000Z', price: 187.2 },
      { date: '2025-10-07T09:00:00.000Z', price: 187.5 },
      { date: '2025-10-08T09:00:00.000Z', price: 187.3 },
      { date: '2025-10-09T09:00:00.000Z', price: 186.9 },
      { date: '2025-10-10T09:00:00.000Z', price: 185.5 },
    ],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    price: 245,
    change: 0,
    history: [
      { date: '2025-10-01T09:00:00.000Z', price: 240 },
      { date: '2025-10-02T09:00:00.000Z', price: 241 },
      { date: '2025-10-03T09:00:00.000Z', price: 243 },
      { date: '2025-10-04T09:00:00.000Z', price: 244 },
      { date: '2025-10-05T09:00:00.000Z', price: 245 },
      { date: '2025-10-06T09:00:00.000Z', price: 246 },
      { date: '2025-10-07T09:00:00.000Z', price: 247 },
      { date: '2025-10-08T09:00:00.000Z', price: 246.5 },
      { date: '2025-10-09T09:00:00.000Z', price: 245.8 },
      { date: '2025-10-10T09:00:00.000Z', price: 245 },
    ],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    price: 310,
    change: 10,
    history: [
      { date: '2025-10-01T09:00:00.000Z', price: 300 },
      { date: '2025-10-02T09:00:00.000Z', price: 301 },
      { date: '2025-10-03T09:00:00.000Z', price: 303 },
      { date: '2025-10-04T09:00:00.000Z', price: 304 },
      { date: '2025-10-05T09:00:00.000Z', price: 306 },
      { date: '2025-10-06T09:00:00.000Z', price: 307 },
      { date: '2025-10-07T09:00:00.000Z', price: 308 },
      { date: '2025-10-08T09:00:00.000Z', price: 309 },
      { date: '2025-10-09T09:00:00.000Z', price: 310 },
      { date: '2025-10-10T09:00:00.000Z', price: 310.5 },
    ],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    price: 130,
    change: -5,
    history: [
      { date: '2025-10-01T09:00:00.000Z', price: 135 },
      { date: '2025-10-02T09:00:00.000Z', price: 134 },
      { date: '2025-10-03T09:00:00.000Z', price: 133 },
      { date: '2025-10-04T09:00:00.000Z', price: 132 },
      { date: '2025-10-05T09:00:00.000Z', price: 131 },
      { date: '2025-10-06T09:00:00.000Z', price: 130.5 },
      { date: '2025-10-07T09:00:00.000Z', price: 130 },
      { date: '2025-10-08T09:00:00.000Z', price: 129.8 },
      { date: '2025-10-09T09:00:00.000Z', price: 129.5 },
      { date: '2025-10-10T09:00:00.000Z', price: 129.3 },
    ],
  },
  {
    symbol: 'NVDA',
    name: 'Nvidia',
    price: 440,
    change: 0,
    history: [
      { date: '2025-10-01T09:00:00.000Z', price: 430 },
      { date: '2025-10-02T09:00:00.000Z', price: 431 },
      { date: '2025-10-03T09:00:00.000Z', price: 433 },
      { date: '2025-10-04T09:00:00.000Z', price: 435 },
      { date: '2025-10-05T09:00:00.000Z', price: 436 },
      { date: '2025-10-06T09:00:00.000Z', price: 437 },
      { date: '2025-10-07T09:00:00.000Z', price: 438 },
      { date: '2025-10-08T09:00:00.000Z', price: 439 },
      { date: '2025-10-09T09:00:00.000Z', price: 440 },
      { date: '2025-10-10T09:00:00.000Z', price: 440.5 },
    ],
  },
]

export const updatePrices = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    const randomChange = (Math.random() - 0.5) * 2
    const newPrice = Math.max(stock.price + randomChange, 0)
    const change = newPrice - stock.price
    const newEntry = { date: new Date().toISOString(), price: newPrice }

    return {
      ...stock,
      price: newPrice,
      change,
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

