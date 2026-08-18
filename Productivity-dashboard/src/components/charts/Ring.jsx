const Ring = ({ value = 70, size = 132, stroke = 12, color = '#4F46E5', sub }) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth={stroke}
          fill="none"
          className="text-gray-300 dark:text-gray-600"
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold tabular-nums leading-none">
          {value}<span className="text-base text-gray-400 font-medium">%</span>
        </div>
        {sub && <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{sub}</div>}
      </div>
    </div>
  )
}

export default Ring
