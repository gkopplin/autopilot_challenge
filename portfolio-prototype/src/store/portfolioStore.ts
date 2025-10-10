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

const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  stocks: [],
  portfolioHistory: [],
  cash: 10000,
  holdings: [
  { symbol: 'AAPL', quantity: 10 },
  { symbol: 'GOOGL', quantity: 5 },
],

  setStocks: (stocks) => set({ stocks }),
  buyStock: (symbol, quantity) => {
    const state = get()
    const stock = state.stocks.find(s => s.symbol === symbol)
    if (!stock) {
      console.warn('buyStock: stock not found', symbol)
      return
    }

    const qty = Number(quantity)
    if (!qty || qty <= 0) {
      console.warn('buyStock: invalid quantity', quantity)
      return
    }

    const cost = +(stock.price * qty)
    if (state.cash < cost) {
      console.warn('buyStock: insufficient cash', { cash: state.cash, cost })
      return
    }

    const existing = state.holdings.find(h => h.symbol === symbol)
    const newHoldings = existing
      ? state.holdings.map(h => h.symbol === symbol ? { ...h, quantity: h.quantity + qty } : h)
      : [...state.holdings, { symbol, quantity: qty }]

    set({
      holdings: newHoldings,
      cash: +(state.cash - cost),
    })

    console.log('buyStock success', { symbol, qty, cost, newCash: get().cash })
  },

  sellStock: (symbol, quantity) => {
    const state = get()
    const holding = state.holdings.find(h => h.symbol === symbol)
    if (!holding || holding.quantity < quantity) {
      console.warn('sellStock: not enough shares to sell', { symbol, requested: quantity, have: holding?.quantity })
      return
    }

    const stock = state.stocks.find(s => s.symbol === symbol)
    if (!stock) {
      console.warn('sellStock: stock not found', symbol)
      return
    }

    const qty = Number(quantity)
    if (!qty || qty <= 0) {
      console.warn('sellStock: invalid quantity', quantity)
      return
    }

    const revenue = +(stock.price * qty)
    const newHoldings = holding.quantity - qty > 0
      ? state.holdings.map(h => h.symbol === symbol ? { ...h, quantity: h.quantity - qty } : h)
      : state.holdings.filter(h => h.symbol !== symbol)

    set({
      holdings: newHoldings,
      cash: +(state.cash + revenue),
    })

    console.log('sellStock success', { symbol, qty, revenue, newCash: get().cash })
  },
  addHistory: (value) => set(state => ({ portfolioHistory: [...state.portfolioHistory, { date: new Date().toISOString(), value }] })),
}))

export default usePortfolioStore
