import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Button from '../components/Button.jsx'
import { Icons } from '../components/Icons.jsx'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    login()
    navigate('/')
  }

  return (
    <AuthLayout title="Welcome back" description="Your next productive day starts here.">
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <Icons.Dashboard aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Your workspace, all together</p>
          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">Tasks, projects, and progress in one place.</p>
        </div>
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleLogin}
        trailing={<Icons.ArrowRight aria-hidden="true" className="h-4 w-4" />}
        className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
      >
        Continue to workspace
      </Button>
    </AuthLayout>
  )
}
