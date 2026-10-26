import { useMemo } from 'react'

const Sparkline = ({ data, w = 120, h = 36, color = '#4F46E5', fill = true }) => {
  const points = useMemo(() => {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const span = Math.max(1, max - min)
    const pad = 2

    return data.map((v, i) => ({
      x: pad + (i / (data.length - 1)) * (w - pad * 2),
      y: h - pad - ((v - min) / span) * (h - pad * 2),
    }))
  }, [data, w, h])

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ')

  const fillPath = fill
    ? `${linePath} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`
    : ''

  const gradientId = useMemo(() => `spk-${Math.random().toString(36).slice(2)}`, [])

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
      {fill && (
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && <path d={fillPath} fill={`url(#${gradientId})`} />}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Sparkline
