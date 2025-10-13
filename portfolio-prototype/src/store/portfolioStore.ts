import {create} from 'zustand'
import type { Stock } from '../data/mockStocks'

interface Transaction {
  date: string
  type: 'BUY' | 'SELL'
  symbol: string
  quantity: number
  price: number
  total: number
}

interface PortfolioStore {
  stocks: Stock[]
  portfolioHistory: { date: string; value: number }[]
  cash: number
  holdings: { symbol: string; quantity: number }[]
  transactions: Transaction[]
  setStocks: (stocks: Stock[]) => void
  buyStock: (symbol: string, quantity: number) => void
  sellStock: (symbol: string, quantity: number) => void
  addHistory: (value: number) => void
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  stocks: [],
  portfolioHistory: [],
  cash: 10000,
  holdings: [
  { symbol: 'AAPL', quantity: 10 },
  { symbol: 'GOOGL', quantity: 5 },
],
  transactions: [],
  setStocks: (stocks) => set({ stocks }),
  buyStock: (symbol, quantity) =>
    set(state => {
      const stock = state.stocks.find(s => s.symbol === symbol)
      if (!stock) return state

      const cost = stock.price * quantity
      if (state.cash < cost) return state

      const existing = state.holdings.find(h => h.symbol === symbol)
      const newHoldings = existing
        ? state.holdings.map(h =>
            h.symbol === symbol ? { ...h, quantity: h.quantity + quantity } : h
          )
        : [...state.holdings, { symbol, quantity }]

      const newTransaction: Transaction = {
        date: new Date().toISOString(),
        type: 'BUY',
        symbol,
        quantity,
        price: stock.price,
        total: cost,
      }

      return {
        ...state,
        holdings: newHoldings,
        cash: state.cash - cost,
        transactions: [...state.transactions, newTransaction],
      }
    }),

   sellStock: (symbol, quantity) =>
    set(state => {
      const holding = state.holdings.find(h => h.symbol === symbol)
      const stock = state.stocks.find(s => s.symbol === symbol)
      if (!holding || holding.quantity < quantity || !stock) return state

      const newQuantity = holding.quantity - quantity
      const newHoldings =
        newQuantity > 0
          ? state.holdings.map(h =>
              h.symbol === symbol ? { ...h, quantity: newQuantity } : h
            )
          : state.holdings.filter(h => h.symbol !== symbol)

      const total = stock.price * quantity
      const newTransaction: Transaction = {
        date: new Date().toISOString(),
        type: 'SELL',
        symbol,
        quantity,
        price: stock.price,
        total,
      }

      return {
        ...state,
        holdings: newHoldings,
        cash: state.cash + total,
        transactions: [...state.transactions, newTransaction],
      }
    }),
  addHistory: (value) => set(state => ({ portfolioHistory: [...state.portfolioHistory, { date: new Date().toISOString(), value }] })),
}))

export default usePortfolioStore
