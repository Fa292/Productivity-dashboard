import Card from './Card'
import Sparkline from './charts/Sparkline.jsx'
import { Icons } from './Icons'

// Compact KPI card: label, big value, up/down delta badge, sparkline trend, footer note.
// Driven by a single `s` object so pages can declare their metrics as data.
// s: { label, value, suffix?, delta, up, color, spark, note?, windowLabel? }
export default function StatCard({ s }) {
  return (
    <Card className="p-5 hover:shadow-lg hover:-translate-y-px cursor-default transition-all duration-150">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</div>
          <div className="mt-2 text-[30px] font-bold leading-none tracking-tight tabular-nums text-gray-900 dark:text-white">
            {s.value}
            {s.suffix && (
              <span className="text-lg text-gray-400 dark:text-gray-500 font-semibold">{s.suffix}</span>
            )}
          </div>
        </div>
        <span className={`inline-flex items-center gap-0.5 h-6 px-2 rounded-md text-xs font-semibold tabular-nums shrink-0 ${
          s.up
            ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300'
        }`}>
          {s.up
            ? <Icons.ArrowUp className="w-3 h-3" />
            : <Icons.ArrowDown className="w-3 h-3" />
          }
          {s.delta}
        </span>
      </div>

      <div className="mt-4 -mx-1 -mb-1">
        <Sparkline data={s.spark} h={44} color={s.color} w={260} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>{s.note ?? 'vs. last week'}</span>
        <span className="tabular-nums">{s.windowLabel ?? '7d window'}</span>
      </div>
    </Card>
  )
}
