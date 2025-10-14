import type { Stock } from '../data/mockStocks'

interface Props {
  stocks: Stock[]
}

export default function TopStocksList({ stocks }: Props) {
  const topStocks = [...stocks].sort((a, b) => b.price - a.price).slice(0, 5)
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Top Stocks</h2>
      <ul className="space-y-1">
        {topStocks.map(stock => (
          <li key={stock.symbol} className="flex justify-between">
            <span>{stock.symbol}</span>
            <span>${stock.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
