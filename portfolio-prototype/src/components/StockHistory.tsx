import { useCallback, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'

interface PriceEntry {
  date: string
  price: number
}

interface StockHistoryProps {
  history: PriceEntry[]
  visibleRows?: number // number of rows visible in viewport
  bufferSize?: number // number of rows to load per scroll
}

export default function StockHistory({
  history,
  visibleRows = 5,
  bufferSize = 10,
}: StockHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [buffer, setBuffer] = useState<PriceEntry[]>([])
  const [offset, setOffset] = useState(0) // index of oldest row in buffer
  const [loading, setLoading] = useState(false)

  const rowHeight = 40 // approximate row height in px

  // --- snapshot initial history once ---
  useEffect(() => {
    if (history.length === 0 || buffer.length > 0) return

    const sorted = [...history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const start = Math.max(sorted.length - bufferSize, 0)
    const end = sorted.length
    setBuffer(sorted.slice(start, end))
    setOffset(start)

    // scroll to bottom to show most recent rows
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }, 0)
  }, [history, buffer.length, bufferSize])

  // --- load older data when scrolling to top ---
  const loadOlderData = useCallback(() => {
    if (offset === 0 || loading) return

    setLoading(true)
    setTimeout(() => {
      const sorted = [...history].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      const nextEnd = offset
      const nextStart = Math.max(offset - bufferSize, 0)
      const olderChunk = sorted.slice(nextStart, nextEnd)

      if (olderChunk.length > 0) {
        setBuffer(prev => [...olderChunk, ...prev])
        setOffset(nextStart)

        // maintain scroll position roughly
        if (containerRef.current) {
          containerRef.current.scrollTop = rowHeight * olderChunk.length
        }
      }

      setLoading(false)
    }, 200)
  }, [history, offset, bufferSize, loading])

  // --- handle scroll ---
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    if (container.scrollTop <= 5) {
      loadOlderData()
    }
  }, [loadOlderData])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto border rounded-md"
      style={{ height: `${rowHeight * visibleRows}px` }}
    >
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-gray-50 border-b">
          <tr>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-right">Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {buffer.map((entry, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2">{format(new Date(entry.date), 'PPpp')}</td>
              <td className="px-3 py-2 text-right">{entry.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="text-center text-gray-500 p-2">Loading older data...</div>
      )}
    </div>
  )
}
