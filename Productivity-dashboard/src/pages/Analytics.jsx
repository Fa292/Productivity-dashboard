import { useState } from 'react'
import Card from '../components/Card'
import Tabs from '../components/Tabs'
import BarChart from '../components/charts/BarChart'
import Ring from '../components/charts/Ring'
import StatCard from '../components/StatCard'

// KPI metrics for the top row. Same `s` shape the Dashboard uses, plus optional
// note/windowLabel to relabel the card footer for this 30-day view.
const KPIS = [
  {
    label: 'Total tasks',
    value: 486,
    delta: '+9.2%',
    up: true,
    color: '#4F46E5',
    spark: [280, 300, 315, 330, 352, 360, 378, 390, 405, 418, 430, 447, 458, 470, 486],
    note: 'vs. last month',
    windowLabel: '30d window',
  },
  {
    label: 'Completion rate',
    value: 78,
    suffix: '%',
    delta: '+4.3%',
    up: true,
    color: '#10B981',
    spark: [64, 66, 65, 68, 70, 69, 71, 72, 74, 73, 75, 76, 77, 77, 78],
    note: 'vs. last month',
    windowLabel: '30d window',
  },
  {
    label: 'Avg. daily score',
    value: 84,
    suffix: '/100',
    delta: '+2.1%',
    up: true,
    color: '#06B6D4',
    spark: [72, 74, 73, 76, 78, 77, 79, 80, 81, 80, 82, 83, 82, 83, 84],
    note: 'vs. last month',
    windowLabel: '30d window',
  },
  {
    label: 'Active projects',
    value: 12,
    delta: '-1',
    up: false,
    color: '#EC4899',
    spark: [15, 15, 14, 14, 16, 15, 14, 13, 14, 13, 13, 12, 13, 12, 12],
    note: 'vs. last month',
    windowLabel: '30d window',
  },
]

// Bars per range: daily for the last week, weekly for the last quarter.
const TREND = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data:   [12, 18, 9, 22, 26, 14, 7],
  },
  '12w': {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    data:   [72, 80, 68, 88, 95, 84, 102, 110, 98, 118, 124, 131],
  },
}

// Same card skeleton as the Dashboard's ProductivityCard (header + range toggle
// + summary), but rendering the BarChart primitive instead of the AreaChart.
function TrendCard() {
  const [range, setRange] = useState('12w')
  const { labels, data } = TREND[range]
  const total = data.reduce((a, b) => a + b, 0)

  return (
    <Card className="p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tasks completed</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{total}</span> completed in this period
          </p>
        </div>
        <Tabs
          tabs={[{ id: '7d', label: '7d' }, { id: '12w', label: '12w' }]}
          active={range}
          onChange={setRange}
        />
      </div>

      <div className="mt-4">
        <BarChart data={data} labels={labels} color="#4F46E5" height={240} />
      </div>
    </Card>
  )
}

const PROJECTS = [
  { label: 'Engineering', count: 168, color: '#4F46E5' },
  { label: 'Design',      count: 118, color: '#06B6D4' },
  { label: 'Marketing',   count: 82,  color: '#F59E0B' },
  { label: 'Operations',  count: 68,  color: '#EC4899' },
  { label: 'Research',    count: 50,  color: '#10B981' },
]

// Horizontal progress bars = composition. Bar width is share of the busiest
// project (count / max) so the leader fills the track; the count is the honest value.
function ByProjectCard() {
  const total = PROJECTS.reduce((a, p) => a + p.count, 0)
  const max = Math.max(...PROJECTS.map(p => p.count))

  return (
    <Card className="p-5 lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tasks by project</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {total} tasks across {PROJECTS.length} projects
      </p>
      <div className="mt-5 space-y-4">
        {PROJECTS.map(p => (
          <div key={p.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-gray-700 dark:text-gray-300">{p.label}</span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-white">{p.count}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(p.count / max) * 100}%`, background: p.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const RATES = [
  { label: 'Completion rate', value: 78, color: '#4F46E5', note: '379 of 486 tasks' },
  { label: 'On-time rate',    value: 91, color: '#10B981', note: '345 hit deadline' },
]

// Rings = single proportions out of 100%. No `sub` passed — the metric name lives
// below each ring, so the center just shows the percentage.
function RatesCard() {
  return (
    <Card className="p-5 lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Rates</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quality of throughput this month</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {RATES.map(r => (
          <div key={r.label} className="flex flex-col items-center text-center">
            <Ring value={r.value} size={104} stroke={11} color={r.color} />
            <div className="mt-3 text-sm font-medium text-gray-900 dark:text-white">{r.label}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{r.note}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function Analytics() {
  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How your workspace is trending over the last 30 days
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPIS.map(s => <StatCard key={s.label} s={s} />)}
      </div>

      {/* Trend */}
      <TrendCard />

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ByProjectCard />
        </div>
        <RatesCard />
      </div>

    </div>
  )
}
