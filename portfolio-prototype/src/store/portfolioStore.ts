import {create} from 'zustand'
import type { Stock } from '../data/mockStocks'

interface PortfolioStore {
  stocks: Stock[]
  portfolioHistory: { date: string; value: number }[]
  cash: number
  holdings: { symbol: string; quantity: number }[]
  setStocks: (stocks: Stock[]) => void
  buyStock: (symbol: string, quantity: number) => void
  sellStock: (symbol: string, quantity: number) => void
  addHistory: (value: number) => void
}

const usePortfolioStore = create<PortfolioStore>(set => ({
  stocks: [],
  portfolioHistory: [],
  cash: 10000,
  // holdings: [],
  holdings: [
  { symbol: 'AAPL', quantity: 10 },
  { symbol: 'GOOGL', quantity: 5 },
],

  setStocks: (stocks) => set({ stocks }),
  buyStock: (symbol, quantity) =>
    set(state => {
      const stock = state.stocks.find(s => s.symbol === symbol)
      if (!stock || state.cash < stock.price * quantity) return state
      const newHolding = { symbol, quantity }
      const holdings = [...state.holdings.filter(h => h.symbol !== symbol), newHolding]
      return { holdings, cash: state.cash - stock.price * quantity }
    }),
  sellStock: (symbol, quantity) =>
    set(state => {
      const holding = state.holdings.find(h => h.symbol === symbol)
      if (!holding || holding.quantity < quantity) return state
      const stock = state.stocks.find(s => s.symbol === symbol)!
      const newHolding = { symbol, quantity: holding.quantity - quantity }
      const holdings = [...state.holdings.filter(h => h.symbol !== symbol), newHolding].filter(h => h.quantity > 0)
      return { holdings, cash: state.cash + stock.price * quantity }
    }),
  addHistory: (value) => set(state => ({ portfolioHistory: [...state.portfolioHistory, { date: new Date().toISOString(), value }] })),
}))

export default usePortfolioStore
