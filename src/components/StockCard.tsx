import usePortfolioStore from '../store/portfolioStore'
import { useState } from 'react'
import type { Stock } from '../data/mockStocks'

export default function StockCard({ stock }: { stock: Stock }) {
  const buyStock = usePortfolioStore(s => s.buyStock)
  const sellStock = usePortfolioStore(s => s.sellStock)
  const [shares, setShares] = useState(1)
  return (
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col gap-2 m-[20px]">
      <div className="font-bold">{stock.symbol}</div>
      <div>${stock.price.toFixed(2)}</div>
      {
        stock.change &&
        (<div className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
        </div>)
      }
      <div className="flex gap-2 mt-2">
        <input
          type="number"
          min="1"
          value={shares}
          onChange={e => setShares(Number(e.target.value))}
          className="w-16 border rounded px-2 text-sm"
        />
        <button onClick={() => buyStock(stock.symbol, shares)} className="bg-green-500 text-white px-2 rounded">
          Buy
        </button>
        <button onClick={() => sellStock(stock.symbol, shares)} className="bg-red-500 text-white px-2 rounded">
          Sell
        </button>
      </div>
    </div>
  )
}
