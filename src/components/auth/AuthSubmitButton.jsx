import Button from '../Button.jsx'

export default function AuthSubmitButton({ pending = false, pendingLabel = 'Please wait…', disabled, children, className = '', ...props }) {
  return (
    <Button
      {...props}
      type="submit"
      variant="primary"
      size="lg"
      disabled={pending || disabled}
      aria-busy={pending}
      className={`w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 ${className}`}
    >
      {pending && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />}
      {pending ? pendingLabel : children}
    </Button>
  )
}
