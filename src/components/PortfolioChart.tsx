import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PortfolioEntry {
  date: string
  value: number
}

interface Props {
  data: PortfolioEntry[]
}

// export default function PortfolioChart({ data }: Props) {
//   // Map data into the shape Recharts expects
//   const chartData = data.map((entry, i) => ({
//     name: i, // optional index for X axis
//     date: entry.date,
//     value: entry.value,
//   }))

//   return (
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={chartData}>
//         <XAxis dataKey="name" hide />
//         <YAxis hide />
//         <Tooltip
//           formatter={(val: number) => [`$${val.toFixed(2)}`, 'Portfolio']}
//           labelFormatter={(idx: number) => `Date: ${chartData[idx]?.date}`}
//         />
//         <Line type="monotone" dataKey="value" stroke="#10b981" dot={false} />
//       </LineChart>
//     </ResponsiveContainer>
//   )
// }

export default function PortfolioChart({ data }: Props) {
  if (!Array.isArray(data)) return null

  const chartData = data.map((entry, i) => ({
    name: i, // optional index for X axis
    date: entry.date,
    value: typeof entry === 'number' ? entry : entry.value,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" hide />
        <YAxis domain={['auto', 'auto']} hide />
        <Tooltip
          formatter={(val: number) => [`$${val.toFixed(2)}`, 'Portfolio']}
          labelFormatter={(idx: number) => `Date: ${chartData[idx]?.date}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
