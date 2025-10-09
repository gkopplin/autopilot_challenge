import { create } from 'zustand'
import { generateHistoricalData } from '../utils/generateHistoricalData'

const usePortfolioStore = create((set, get) => ({
  balance: 10000,
  holdings: [],
  portfolioHistory: generateHistoricalData(),
  stocks: [],
  setStocks: (stocks) => set({ stocks }),
  
  buyStock: (symbol, price, shares) => {
    const { holdings, balance } = get()
    const cost = price * shares
    if (balance < cost) return
    const existing = holdings.find(h => h.symbol === symbol)
    let newHoldings
    if (existing) {
      existing.avgPrice = (existing.avgPrice * existing.shares + cost) / (existing.shares + shares)
      existing.shares += shares
      newHoldings = [...holdings]
    } else {
      newHoldings = [...holdings, { symbol, shares, avgPrice: price }]
    }
    set({ holdings: newHoldings, balance: balance - cost })
  },

  sellStock: (symbol, price, shares) => {
    const { holdings, balance } = get()
    const existing = holdings.find(h => h.symbol === symbol)
    if (!existing || existing.shares < shares) return
    existing.shares -= shares
    const newHoldings = existing.shares === 0
      ? holdings.filter(h => h.symbol !== symbol)
      : [...holdings]
    set({ holdings: newHoldings, balance: balance + price * shares })
  },
}))

export default usePortfolioStore
