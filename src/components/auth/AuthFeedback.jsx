import { Icons } from '../Icons.jsx'

const TONES = {
  error: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  loading: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300',
}

export default function AuthFeedback({ tone = 'error', children, id, className = '' }) {
  return (
    <div
      id={id}
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-6 ${TONES[tone]} ${className}`}
    >
      {tone === 'loading' ? (
        <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
      ) : tone === 'success' ? (
        <Icons.Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      ) : <Icons.X aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
      <div>{children}</div>
    </div>
  )
}
