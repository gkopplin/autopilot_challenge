import { useState } from 'react'
import PortfolioChart from './PortfolioChart'
import usePortfolioStore from '../store/portfolioStore'

export default function StockHistory() {
  const { portfolioHistory } = usePortfolioStore()
  const [visibleData, setVisibleData] = useState(portfolioHistory.slice(-20))
  const [startIndex, setStartIndex] = useState(Math.max(portfolioHistory.length - 20, 0))

  const loadMore = () => {
    const newStart = Math.max(startIndex - 20, 0)
    setVisibleData(portfolioHistory.slice(newStart, visibleData.length + startIndex))
    setStartIndex(newStart)
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Stock Price History</h2>
      <PortfolioChart data={visibleData} />
      {startIndex > 0 && (
        <button onClick={loadMore} className="py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
          Load More
        </button>
      )}
    </div>
  )
}
