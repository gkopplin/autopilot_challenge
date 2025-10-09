import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface StockHistoryProps {
  stock: { symbol: string; history: { date: string; price: number }[] }
}

export default function StockHistory({ stock }: StockHistoryProps) {
  const chartData = stock.history.map(entry => ({
    date: new Date(entry.date).toLocaleTimeString(),
    price: entry.price,
  }))

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">{stock.symbol} Price History</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip formatter={(val: number) => `$${val.toFixed(2)}`} />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
