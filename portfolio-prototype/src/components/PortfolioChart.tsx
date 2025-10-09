import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function PortfolioChart({ data }) {
  const chartData = data.map((v, i) => ({ name: i, value: v }))
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#10b981" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
