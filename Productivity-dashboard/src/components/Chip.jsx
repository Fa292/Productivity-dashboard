const Chip = ({ tone = 'neutral', size = 'md', className = '', children }) => {
  const tones = {
    neutral: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
    brand:   'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300',
    success: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    warn:    'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300',
    danger:  'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300',
    info:    'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300',
  }

  const sizes = {
    sm: 'h-5 px-1.5 text-[11px]',
    md: 'h-8 px-2 text-[10px]',
  }

  return (
    <span className={`inline-flex items-center justify-center gap-1 rounded-md font-medium ${tones[tone]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Chip
