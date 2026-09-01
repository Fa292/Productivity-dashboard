import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Chip from '../components/Chip'
import Tabs from '../components/Tabs'
import Avatar from '../components/Avatar'
import TodoCard from '../components/TodoCard'
import ProductExplorer from '../components/ProductExplorer'
import StatCard from '../components/StatCard'
import AreaChart from '../components/charts/AreaChart'
import Ring from '../components/charts/Ring'
import { Icons } from '../components/Icons'

const ACTIVITY = [
  { who: 'Aiden Chen',  did: 'completed',   obj: 'API rate-limit polish',      when: '2m'  },
  { who: 'Sofia Reyes', did: 'created',     obj: 'Mobile onboarding spec',     when: '21m' },
  { who: 'Helix AI',    did: 'summarized',  obj: 'Weekly progress report',     when: '1h'  },
  { who: 'Daniel Park', did: 'commented on',obj: '"Audit auth flow"',          when: '3h'  },
  { who: 'Jordan Liu',  did: 'shared',      obj: 'Customer Research board',    when: '5h'  },
]

const STAT_CARDS = [
  {
    label: 'Completed tasks',
    value: 142,
    delta: '+12.4%',
    up: true,
    color: '#4F46E5',
    spark: [18,22,19,24,28,26,33,31,38,36,42,46,44,52,50],
  },
  {
    label: 'Pending tasks',
    value: 28,
    delta: '-3.1%',
    up: false,
    color: '#F59E0B',
    spark: [40,42,38,36,40,34,32,33,29,30,28,30,27,28,28],
  },
  {
    label: 'Productivity score',
    value: 87,
    suffix: '/100',
    delta: '+5.2%',
    up: true,
    color: '#10B981',
    spark: [62,64,66,65,70,72,71,74,76,78,80,83,82,85,87],
  },
  {
    label: 'Weekly progress',
    value: 76,
    suffix: '%',
    delta: '+8.0%',
    up: true,
    color: '#EC4899',
    spark: [40,46,44,52,55,58,60,62,67,65,68,70,72,74,76],
  },
]

// StatCard moved to ../components/StatCard.jsx (now shared with the Analytics page)

const TodoPreview = ({ todos, onToggle, onSeeAll }) => (
  <Card className="p-5 lg:p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Today's todos</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {todos.filter(t => !t.done).length} pending · {todos.filter(t => t.done).length} done
        </p>
      </div>
      <button
        onClick={onSeeAll}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1"
      >
        View all <Icons.ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
    <ul className="space-y-2.5">
      {todos.slice(0, 4).map(t => (
        <TodoCard key={t.id} todo={t} onToggle={onToggle} />
      ))}
    </ul>
  </Card>
)

const ActivityCard = () => (
  <Card className="p-5 lg:p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Activity</h3>
      <Chip tone="neutral" size="sm">Last 24h</Chip>
    </div>
    <ul className="space-y-4">
      {ACTIVITY.map((item, i) => (
        <li key={i} className="flex gap-3">
          <Avatar name={item.who} size={32} />
          <div className={`flex-1 min-w-0 pb-4 ${i < ACTIVITY.length - 1 ? 'border-b border-gray-100 dark:border-gray-700/60' : ''}`}>
            <div className="text-sm leading-snug text-gray-900 dark:text-white">
              <span className="font-semibold">{item.who}</span>{' '}
              <span className="text-gray-500 dark:text-gray-400">{item.did}</span>{' '}
              <span className="font-medium">{item.obj}</span>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.when} ago</div>
          </div>
        </li>
      ))}
    </ul>
  </Card>
)

const ACTIVITY_BARS = [
  { label: 'Focus',    value: 92, color: '#4F46E5' },
  { label: 'Meetings', value: 64, color: '#06B6D4' },
  { label: 'Comms',   value: 78, color: '#F59E0B' },
  { label: 'Breaks',  value: 41, color: '#EC4899' },
]

const ProductivityCard = () => {
  const [range, setRange] = useState('7d')

  const labels = range === '7d'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']

  const completed = range === '7d'
    ? [14, 18, 12, 22, 26, 9, 11]
    : [86, 92, 88, 104, 118, 124, 131, 142]

  const planned = range === '7d'
    ? [18, 20, 18, 24, 28, 12, 14]
    : [100, 108, 110, 120, 128, 134, 140, 150]

  return (
    <Card className="p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Productivity</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Completed vs planned across the period</p>
        </div>
        <Tabs
          tabs={[{ id: '7d', label: '7d' }, { id: '8w', label: '8w' }]}
          active={range}
          onChange={setRange}
        />
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Completed</span>
          <span className="text-gray-400 tabular-nums">{completed.reduce((a, b) => a + b, 0)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-sm bg-gray-300 dark:bg-gray-600" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Planned</span>
          <span className="text-gray-400 tabular-nums">{planned.reduce((a, b) => a + b, 0)}</span>
        </div>
      </div>

      <div className="mt-3">
        <AreaChart
          labels={labels}
          series={[
            { label: 'Completed', data: completed },
            { label: 'Planned',   data: planned },
          ]}
          height={240}
        />
      </div>
    </Card>
  )
}

const ScoreCard = () => (
  <Card className="p-5 lg:p-6">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Today's score</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Calculated from focus, breaks and meetings</p>
      </div>
      <Chip tone="success" size="md">+4 from yesterday</Chip>
    </div>

    <div className="mt-5 flex items-center justify-center">
      <Ring value={87} size={156} stroke={14} color="#4F46E5" sub="DAILY" />
    </div>

    <div className="mt-5 space-y-3.5">
      {ACTIVITY_BARS.map(a => (
        <div key={a.label}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500 dark:text-gray-400">{a.label}</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-white">{a.value}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${a.value}%`, background: a.color }}
            />
          </div>
        </div>
      ))}
    </div>
  </Card>
)

export default function Dashboard() {
  const { todos, toggleTodo, openTask } = useOutletContext()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">

      {/* Greeting */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Monday, August 24</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
            Good evening, Fawaz 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You're <span className="font-semibold text-gray-900 dark:text-white">3 tasks</span> ahead of pace this week. Keep it going.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leading={<Icons.Filter className="w-4 h-4" />}>Filters</Button>
          <Button variant="primary" leading={<Icons.Plus className="w-4 h-4"/>} onClick={openTask}>New task</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(s => <StatCard key={s.label} s={s} />)}
      </div>

      {/* Productivity + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProductivityCard />
        </div>
        <ScoreCard />
      </div>

      {/* Todos + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TodoPreview
            todos={todos}
            onToggle={toggleTodo}
            onSeeAll={() => navigate('/todos')}
          />
        </div>
        <ActivityCard />
      </div>

      {/* Products */}
      <ProductExplorer compact />

    </div>
  )
}
