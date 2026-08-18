import Chip from './Chip'
import Avatar from './Avatar'
import { Icons } from './Icons'

const PRIORITY = {
  high:   { label: 'High',   tone: 'danger', dot: '#EF4444' },
  medium: { label: 'Medium', tone: 'warn',   dot: '#F59E0B' },
  low:    { label: 'Low',    tone: 'info',   dot: '#0EA5E9' },
}

export default function TodoCard({ todo, onToggle }) {
  const p = PRIORITY[todo.priority]

  return (
    <li className={`flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-sm transition-all duration-150 ${todo.done ? 'opacity-60' : ''}`}>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
          todo.done
            ? 'bg-indigo-600 border-indigo-600 text-white'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
        }`}
      >
        {todo.done && (
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium leading-snug text-gray-900 dark:text-white ${todo.done ? 'line-through' : ''}`}>
          {todo.title}
        </div>
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          <Chip tone={p.tone} size="sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.dot }} />
            {p.label}
          </Chip>
          <span className="text-xs text-gray-400 dark:text-gray-500 inline-flex items-center gap-1">
            <Icons.Clock className="w-3 h-3" /> Due {todo.due}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">· {todo.project}</span>
        </div>

        {/* Progress bar */}
        {todo.progress != null && (
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${todo.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 tabular-nums shrink-0">{todo.progress}%</span>
          </div>
        )}
      </div>

      {/* Assignee avatars */}
      <div className="flex -space-x-2 shrink-0">
        {todo.assignees.map(name => (
          <Avatar key={name} name={name} size={22} />
        ))}
      </div>
    </li>
  )
}
