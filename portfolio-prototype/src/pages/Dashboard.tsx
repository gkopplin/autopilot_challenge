import { useEffect } from 'react'
import usePortfolioStore from '../store/portfolioStore'
import { updatePrices, initialStocks } from '../data/mockStocks'
import PortfolioChart from '../components/PortfolioChart'
import StockCard from '../components/StockCard'

export default function Dashboard() {
  const { stocks, setStocks, portfolioHistory } = usePortfolioStore()

  useEffect(() => {
    setStocks(initialStocks)
    const interval = setInterval(() => {
      setStocks(updatePrices(stocks))
    }, 2000)
    return () => clearInterval(interval)
  }, [setStocks, stocks])

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Overview</h1>
      <PortfolioChart data={portfolioHistory} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stocks.map(stock => <StockCard key={stock.symbol} stock={stock} />)}
      </div>
    </div>
  )
}
