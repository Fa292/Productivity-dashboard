import { useId } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Chip from '../components/Chip.jsx'
import { Icons } from '../components/Icons.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const PREVIEW_TASKS = [
  { title: 'Set your priorities', project: 'Weekly planning', done: true },
  { title: 'Move your project forward', project: 'Product launch', done: true },
  { title: 'Make room for focused work', project: 'Personal', done: false },
]

function WorkspacePreview() {
  return (
    <div aria-hidden="true" className="mt-8">
      <Card className="p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Today’s focus</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">A little structure. A lot more clarity.</p>
          </div>
          <Chip tone="brand" size="sm" className="shrink-0">3 tasks</Chip>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {PREVIEW_TASKS.map(({ title, project, done }) => (
            <div key={title} className="flex items-center gap-3 py-3.5">
              {done ? (
                <Icons.Check className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <span className="mx-0.5 h-4 w-4 shrink-0 rounded border border-gray-300 dark:border-gray-600" />
              )}
              <div className="min-w-0">
                <p className={`text-sm ${done ? 'text-gray-400 line-through dark:text-gray-500' : 'font-medium text-gray-800 dark:text-gray-200'}`}>
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{project}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-gray-600 dark:text-gray-300">Making progress</span>
            <span className="text-gray-500 dark:text-gray-400">2 of 3 complete</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div className="h-full w-2/3 rounded-full bg-indigo-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}

// Auth pages supply their own form and optional card footer. Only published
// policy/support destinations should be passed in footerLinks ({ label, to/href }).
export default function AuthLayout({ title, description, children, footer, footerLinks = [] }) {
  const { darkMode, Toggle } = useTheme()
  const id = useId()
  const mainId = `${id}-main`
  const titleId = `${id}-title`
  const introId = `${id}-intro`
  const themeLabel = darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  const linkClassName = 'rounded-sm transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:hover:text-indigo-400 dark:focus-visible:ring-offset-gray-950'

  return (
    <div className="flex min-h-dvh flex-col bg-gray-100 px-4 text-gray-900 transition-colors duration-300 sm:px-6 dark:bg-gray-950 dark:text-white">
      <a
        href={`#${mainId}`}
        className="sr-only z-50 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 py-6 sm:py-8">
          <Link to="/login" aria-label="Helix" className={`flex items-center gap-2.5 ${linkClassName}`}>
            <Icons.Logo aria-hidden="true" className="h-10 w-10" />
            <span className="text-xl font-bold tracking-tight">Helix</span>
          </Link>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={Toggle}
            aria-label={themeLabel}
            title={themeLabel}
            className="h-11 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
          >
            {darkMode ? <Icons.Sun aria-hidden="true" className="h-4 w-4" /> : <Icons.Moon aria-hidden="true" className="h-4 w-4" />}
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </Button>
        </header>

        <main id={mainId} tabIndex={-1} className="flex flex-1 items-center justify-center py-8 outline-none sm:py-12">
          <div className="grid w-full min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,484px)] lg:gap-16">
            <section aria-labelledby={introId} className="hidden min-w-0 lg:block">
              <Chip tone="brand" className="mb-5 gap-1.5 px-2.5 text-xs">
                <Icons.Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
                A calmer way to work
              </Chip>
              <h2 id={introId} className="text-5xl font-semibold leading-[1.12] tracking-tight">
                Plan your work.<br />
                <span className="text-indigo-600 dark:text-indigo-400">See your progress.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-gray-500 dark:text-gray-400">
                Bring your tasks, projects, and team together in one clear workspace. Make space for what matters.
              </p>
              <WorkspacePreview />
            </section>

            <section aria-labelledby={titleId} className="mx-auto w-full min-w-0 max-w-[484px]">
              <p className="mb-5 text-center text-sm font-medium leading-6 sm:text-base lg:hidden">
                Plan your work.{' '}
                <span className="text-indigo-600 dark:text-indigo-400">See your progress.</span>
              </p>
              <Card className="p-6 sm:p-8">
                <div className="mb-7">
                  <h1 id={titleId} className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
                  {description && <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
                {children}
                {footer && <div className="mt-6 border-t border-gray-100 pt-5 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">{footer}</div>}
              </Card>
            </section>
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-gray-200 py-5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>© Helix</p>
          {footerLinks.length > 0 ? (
            <nav aria-label="Policy and support" className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map(({ label, to, href }) => (
                to ? <Link key={label} to={to} className={linkClassName}>{label}</Link> : <a key={label} href={href} className={linkClassName}>{label}</a>
              ))}
            </nav>
          ) : <p>Less busywork. More momentum.</p>}
        </footer>
      </div>
    </div>
  )
}
