import { useState, useEffect, useRef } from 'react'

const BarChart = ({ data, labels, color = '#4F46E5', height = 180 }) => {
  const containerRef = useRef(null)
  const [w, setW] = useState(400)

  useEffect(() => {
    const ro = new ResizeObserver(entries => setW(entries[0].contentRect.width))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const padL = 28, padR = 8, padT = 8, padB = 22
  const innerW = Math.max(0, w - padL - padR)
  const innerH = height - padT - padB
  const max = Math.max(...data) * 1.15
  const gap = innerW / data.length
  const barW = gap * 0.55

  return (
    <div ref={containerRef} className="w-full">
      <svg width={w} height={height} className="block">
        {[0, 0.5, 1].map((t, i) => (
          <line
            key={i}
            x1={padL} x2={w - padR}
            y1={padT + innerH - t * innerH} y2={padT + innerH - t * innerH}
            stroke="#E5E7EB" strokeDasharray="3 3" strokeWidth="1"
          />
        ))}
        {data.map((v, i) => {
          const x = padL + i * gap + (gap - barW) / 2
          const barH = (v / max) * innerH
          return (
            <g key={i}>
              <rect
                x={x} y={padT + innerH - barH}
                width={barW} height={barH}
                rx="6" fill={color} fillOpacity="0.9"
              />
              <text
                x={x + barW / 2} y={height - 6}
                textAnchor="middle" fontSize="11" fill="#9CA3AF"
              >
                {labels[i]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default BarChart
