import usePortfolioStore from '../store/portfolioStore'
import { format } from 'date-fns'

export default function TransactionHistory() {
  const transactions = usePortfolioStore(state => state.transactions)

  if (transactions.length === 0) {
    return <div className="p-4 text-gray-500">No transactions yet.</div>
  }

  return (
    <div className="p-4 border rounded-md max-h-72 overflow-y-auto">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-gray-50 border-b z-10">
          <tr>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Ticker</th>
            <th className="px-3 py-2 text-right">Type</th>
            <th className="px-3 py-2 text-right">Quantity</th>
            <th className="px-3 py-2 text-right">Price ($)</th>
            <th className="px-3 py-2 text-right">Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .slice()
            .reverse() // show newest first
            .map((tx, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{format(new Date(tx.date), 'PPpp')}</td>
                <td className="px-3 py-2">{tx.symbol}</td>
                <td className="px-3 py-2 text-right">{tx.type}</td>
                <td className="px-3 py-2 text-right">{tx.quantity}</td>
                <td className="px-3 py-2 text-right">{tx.price.toFixed(2)}</td>
                <td className="px-3 py-2 text-right">{tx.total.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
