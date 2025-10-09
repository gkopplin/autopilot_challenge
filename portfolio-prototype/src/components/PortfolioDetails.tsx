import usePortfolioStore from '../store/portfolioStore'

export default function PortfolioDetails() {
  const { holdings, stocks } = usePortfolioStore()
  const enrichedHoldings = holdings.map(h => {
    const stock = stocks.find(s => s.symbol === h.symbol)
    return { ...h, price: stock?.price ?? 0, total: (stock?.price ?? 0) * h.quantity }
  })

  const totalValue = enrichedHoldings.reduce((acc, h) => acc + h.total, 0)

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Portfolio Details</h2>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Stock</th>
            <th className="border-b p-2">Quantity</th>
            <th className="border-b p-2">Price</th>
            <th className="border-b p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {enrichedHoldings.map(h => (
            <tr key={h.symbol}>
              <td className="p-2">{h.symbol}</td>
              <td className="p-2">{h.quantity}</td>
              <td className="p-2">${h.price.toFixed(2)}</td>
              <td className="p-2">${h.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="p-2" colSpan={3}>Total</td>
            <td className="p-2">${totalValue.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
