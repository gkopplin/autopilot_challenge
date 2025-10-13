import { useEffect } from 'react'
import usePortfolioStore from '../store/portfolioStore'
import { updatePrices, initialStocks } from '../data/mockStocks'
import PortfolioChart from '../components/PortfolioChart'
import StockCard from '../components/StockCard'
import TopStocksList from '../components/TopStocksList'
import PortfolioDetails from '../components/PortfolioDetails'
import StockHistory from '../components/StockHistory'

export default function Dashboard() {
  const { stocks, setStocks, portfolioHistory, cash, holdings } = usePortfolioStore()

useEffect(() => {
  setStocks(initialStocks)

  const interval = setInterval(() => {
    const { stocks: currentStocks, holdings, cash, addHistory } =
      usePortfolioStore.getState()

    const updated = updatePrices(currentStocks)
    setStocks(updated)

    // compute portfolio value for history
    const portfolioValue = holdings.reduce((acc, h) => {
      const s = updated.find(st => st.symbol === h.symbol)
      return acc + (s?.price ?? 0) * h.quantity
    }, 0)

    addHistory(portfolioValue + cash)
  }, 2000)

  return () => clearInterval(interval)
}, [setStocks])


  const portfolioValue = holdings.reduce((acc, h) => {
    const s = stocks.find(st => st.symbol === h.symbol)
    return acc + (s?.price ?? 0) * h.quantity
  }, 0)

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Overview</h1>

      {/* Portfolio value + cash */}
      <div className="flex space-x-6">
        <div className="p-4 bg-white rounded-2xl shadow-md w-1/2">
          <h2 className="font-semibold">Current Portfolio Value</h2>
          <p className="text-xl font-bold">${(portfolioValue + cash).toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md w-1/2">
          <h2 className="font-semibold">Cash Balance</h2>
          <p className="text-xl font-bold">${cash.toFixed(2)}</p>
        </div>
      </div>

      <TopStocksList stocks={stocks} />
      <PortfolioDetails />
      <PortfolioChart data={portfolioHistory} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map(stock => (
          <div key={stock.symbol} className="space-y-4">
            <StockCard stock={stock} />
            <StockHistory history={stock.history} />
          </div>
        ))}
      </div>
    </div>
  )
}
