import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { format } from 'date-fns'

interface PriceEntry {
  date: string
  price: number
}

interface StockHistoryProps {
  history: PriceEntry[]
  visibleRows?: number
  bufferSize?: number
}

export default function StockHistory({
  history,
  visibleRows = 5,
  bufferSize = 10,
}: StockHistoryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [buffer, setBuffer] = useState<PriceEntry[]>([])
  const [offset, setOffset] = useState(0)
  const [pendingNewCount, setPendingNewCount] = useState(0)
  const [loadingBottom, setLoadingBottom] = useState(false)
  const [loadingTop, setLoadingTop] = useState(false)
  const [noMoreOlder, setNoMoreOlder] = useState(false)

  const mountedRef = useRef(false)
  const userScrolledRef = useRef(false)

  const sorted = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [history])

  const lastSeenTotalRef = useRef<number>(0)

  // --- Initialize buffer once on first mount ---
  useEffect(() => {
    if (mountedRef.current || sorted.length === 0) return

    const end = Math.min(bufferSize, sorted.length)
    setBuffer(sorted.slice(0, end))
    setOffset(end)
    lastSeenTotalRef.current = sorted.length
    mountedRef.current = true

    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0
    })
  }, [sorted, bufferSize])

  // --- Detect newer data available ---
  useEffect(() => {
    if (!mountedRef.current) return

    const currentTotal = sorted.length
    const last = lastSeenTotalRef.current
    if (currentTotal > last) {
      setPendingNewCount(currentTotal - last)
    }
    lastSeenTotalRef.current = currentTotal
  }, [sorted])

  // --- Load older data (scrolling down) ---
  const loadOlder = useCallback(() => {
    if (loadingBottom || noMoreOlder) return
    if (offset >= sorted.length) {
      setNoMoreOlder(true)
      return
    }

    setLoadingBottom(true)
    setTimeout(() => {
      const nextEnd = Math.min(offset + bufferSize, sorted.length)
      const chunk = sorted.slice(offset, nextEnd)

      if (chunk.length > 0) {
        setBuffer(prev => {
          const newRows = chunk.filter(
            entry => !prev.some(p => p.date === entry.date)
          )
          return [...prev, ...newRows]
        })
        setOffset(nextEnd)
        if (nextEnd >= sorted.length) setNoMoreOlder(true)
      } else {
        setNoMoreOlder(true)
      }

      setLoadingBottom(false)
    }, 350)
  }, [loadingBottom, noMoreOlder, offset, sorted, bufferSize])

  // --- Load newer data (scrolling up) ---
  const loadNewer = useCallback(() => {
    if (loadingTop || pendingNewCount <= 0) return

    setLoadingTop(true)
    setTimeout(() => {
      const take = Math.min(pendingNewCount, bufferSize)
      const newestChunk = sorted.slice(0, take)
      if (newestChunk.length > 0) {
        setBuffer(prev => [...newestChunk, ...prev])
        setOffset(prevOffset => prevOffset + newestChunk.length)
        setPendingNewCount(prev => prev - newestChunk.length)
      }

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollTop + take * 40
      }

      setLoadingTop(false)
    }, 300)
  }, [loadingTop, pendingNewCount, sorted, bufferSize])

  // --- Scroll handler ---
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!userScrolledRef.current) userScrolledRef.current = true

    const nearTop = el.scrollTop <= 5
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5

    if (nearTop && userScrolledRef.current && pendingNewCount > 0) {
      loadNewer()
      return
    }

    if (nearBottom && !loadingBottom) {
      loadOlder()
    }
  }, [loadNewer, loadOlder, pendingNewCount, loadingBottom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const rowHeight = 40

  return (
    <div className="flex flex-col border rounded-md">
      {pendingNewCount > 0 && (
        <div className="px-3 py-1 text-sm text-center bg-yellow-50 text-yellow-800">
          {pendingNewCount} newer {pendingNewCount === 1 ? 'entry' : 'entries'} available — scroll to top to load
        </div>
      )}

      <div
        ref={containerRef}
        className="overflow-y-auto"
        style={{ height: `${rowHeight * visibleRows}px` }}
      >
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 border-b z-10">
            <tr>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-right">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {buffer.map((entry, idx) => (
              <tr key={`${entry.date}-${idx}`} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{format(new Date(entry.date), 'PPpp')}</td>
                <td className="px-3 py-2 text-right">{entry.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(loadingTop || loadingBottom) && (
          <div className="text-center text-gray-500 p-2">
            {loadingTop ? 'Loading newer data...' : 'Loading older data...'}
          </div>
        )}

        {noMoreOlder && !loadingBottom && (
          <div className="text-center text-gray-400 p-2">No more older data.</div>
        )}
      </div>
    </div>
  )
}
