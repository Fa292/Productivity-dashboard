import { useState, useEffect, useRef, useMemo } from 'react'

const AreaChart = ({ series, labels, height = 220 }) => {
  const containerRef = useRef(null)
  const [w, setW] = useState(600)

  useEffect(() => {
    const ro = new ResizeObserver(entries => setW(entries[0].contentRect.width))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const colors = ['#4F46E5', '#94A3B8']
  const padL = 36, padR = 12, padT = 12, padB = 28
  const innerW = Math.max(0, w - padL - padR)
  const innerH = height - padT - padB

  const allValues = series.flatMap(s => s.data)
  const max = Math.ceil(Math.max(...allValues) / 10) * 10

  const xPos = (i, total) => padL + (i / (total - 1)) * innerW
  const yPos = (v) => padT + innerH - (v / max) * innerH

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: padT + t * innerH,
    label: Math.round(max - t * max),
  }))

  const gradientId = useMemo(() => `area-${Math.random().toString(36).slice(2)}`, [])
  const [hover, setHover] = useState(null)

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const idx = Math.max(0, Math.min(
      labels.length - 1,
      Math.round(((x - padL) / innerW) * (labels.length - 1))
    ))
    setHover(idx)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg width={w} height={height} className="block">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={padL} x2={w - padR} y1={g.y} y2={g.y}
              stroke="#E5E7EB" strokeDasharray="3 3" strokeWidth="1"
            />
            <text x={padL - 8} y={g.y + 4} textAnchor="end" fontSize="11" fill="#9CA3AF">
              {g.label}
            </text>
          </g>
        ))}

        {/* X labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={xPos(i, labels.length)} y={height - 6}
            textAnchor="middle" fontSize="11" fill="#9CA3AF"
          >
            {label}
          </text>
        ))}

        {/* Series */}
        {series.map((s, si) => {
          const pts = s.data.map((v, i) => [xPos(i, s.data.length), yPos(v)])
          const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
          const areaPath = `${path} L${pts[pts.length - 1][0]},${padT + innerH} L${pts[0][0]},${padT + innerH} Z`

          return (
            <g key={si}>
              {si === 0 && <path d={areaPath} fill={`url(#${gradientId})`} />}
              <path
                d={path}
                fill="none"
                stroke={colors[si]}
                strokeWidth={si === 0 ? 2.4 : 1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={si === 0 ? '' : '4 4'}
              />
            </g>
          )
        })}

        {/* Hover indicator */}
        {hover != null && (
          <g>
            <line
              x1={xPos(hover, labels.length)} x2={xPos(hover, labels.length)}
              y1={padT} y2={padT + innerH}
              stroke={colors[0]} strokeOpacity="0.3" strokeWidth="1"
            />
            {series.map((s, si) => (
              <circle
                key={si}
                cx={xPos(hover, labels.length)} cy={yPos(s.data[hover])}
                r="4" fill="white" stroke={colors[si]} strokeWidth="2"
              />
            ))}
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hover != null && (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: xPos(hover, labels.length), top: padT - 4 }}
        >
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap">
            <div className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
              {labels[hover]}
            </div>
            {series.map((s, si) => (
              <div key={si} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors[si] }} />
                <span>{s.label}: {s.data[hover]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AreaChart
