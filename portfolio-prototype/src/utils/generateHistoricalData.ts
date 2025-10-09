export function generateHistoricalData(length = 100) {
  let value = 100
  return Array.from({ length }, () => {
    value += (Math.random() - 0.5) * 2
    return Math.max(1, parseFloat(value.toFixed(2)))
  })
}
