import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Chip from '../components/Chip'
import Input from '../components/Input'
import Tabs from '../components/Tabs'
import TodoCard from '../components/TodoCard'
import { Icons } from '../components/Icons'

const FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'high',   label: 'High' },
  { id: 'done',   label: 'Completed' },
]

// Fixed display order so buckets always render top-to-bottom the same way.
const BUCKETS = ['Today', 'This week', 'Later']

// No Grid/List glyphs in the Icons set, so these two live here — they're only used by this page.
const IconList = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
)
const IconGrid = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export default function Todos() {
  const { todos, toggleTodo, openTask } = useOutletContext()

  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('list')          // 'list' | 'grid'

  const activeCount = todos.filter(t => !t.done).length
  const doneCount = todos.filter(t => t.done).length

  // Apply the active tab filter + search box. Recomputes only when an input changes.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return todos.filter(t => {
      if (filter === 'active' && t.done) return false
      if (filter === 'high' && t.priority !== 'high') return false
      if (filter === 'done' && !t.done) return false
      if (q && !t.title.toLowerCase().includes(q)) return false
      return true
    })
  }, [todos, filter, query])

  // Split the visible list into buckets, dropping any bucket that ends up empty.
  const groups = useMemo(
    () =>
      BUCKETS
        .map(bucket => ({ bucket, items: visible.filter(t => t.bucket === bucket) }))
        .filter(g => g.items.length > 0),
    [visible]
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
            Todos
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <Chip tone="brand" size="sm">{activeCount} active</Chip>
            <Chip tone="success" size="sm">{doneCount} completed</Chip>
          </div>
        </div>
        <Button variant="primary" leading={<Icons.Plus className="w-4 h-4" />} onClick={openTask}>
          New task
        </Button>
      </div>

      {/* Toolbar: filter tabs · search · view toggle */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="overflow-x-auto -mx-1 px-1">
            <Tabs tabs={FILTERS} active={filter} onChange={setFilter} />
          </div>

          <div className="lg:ml-auto w-full sm:w-64">
            <Input
              leading={<Icons.Search className="w-4 h-4" />}
              placeholder="Search todos…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 self-start">
            {[
              { id: 'list', Icon: IconList },
              { id: 'grid', Icon: IconGrid },
            ].map(({ id, Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-label={`${id} view`}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-150 ${
                  view === id
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* List, grouped by bucket — or the empty state */}
      {visible.length === 0 ? (
        <Card className="py-16 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Icons.Check className="w-6 h-6" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">All clear</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No todos match this filter{query.trim() && <> for “<span className="font-medium">{query.trim()}</span>”</>}.
          </p>
        </Card>
      ) : (
        groups.map(group => (
          <div key={group.bucket}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{group.bucket}</h2>
              <span className="text-xs font-medium text-gray-400 tabular-nums">{group.items.length}</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>
            <ul className={view === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-3' : 'space-y-2.5'}>
              {group.items.map(t => (
                <TodoCard key={t.id} todo={t} onToggle={toggleTodo} />
              ))}
            </ul>
          </div>
        ))
      )}

    </div>
  )
}