import { forwardRef, useId, useState } from 'react'
import Input from '../Input.jsx'
import { Icons } from '../Icons.jsx'

const AuthField = forwardRef(function AuthField({
  id: providedId,
  label,
  labelAction,
  hint,
  error,
  type = 'text',
  autoComplete,
  required,
  disabled,
  className = '',
  trailing,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...inputProps
}, ref) {
  const generatedId = useId()
  const id = providedId || `auth-field-${generatedId}`
  const [passwordVisible, setPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const descriptionIds = [describedBy, hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          {required && <><span aria-hidden="true" className="ml-1 text-rose-500">*</span><span className="sr-only"> (required)</span></>}
        </label>
        {labelAction}
      </div>
      <Input
        {...inputProps}
        ref={ref}
        id={id}
        type={isPassword && passwordVisible ? 'text' : type}
        autoComplete={autoComplete ?? (isPassword ? 'current-password' : type === 'email' ? 'email' : undefined)}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : invalid}
        aria-describedby={descriptionIds}
        inputClassName={`h-12 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 aria-invalid:border-rose-500 aria-invalid:focus:border-rose-500 aria-invalid:focus:ring-rose-500 dark:disabled:bg-gray-900 dark:aria-invalid:border-rose-400 ${isPassword ? 'pr-14' : ''}`}
        trailing={isPassword ? (
          <button
            type="button"
            onClick={() => setPasswordVisible(visible => !visible)}
            disabled={disabled}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-controls={id}
            aria-pressed={passwordVisible}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-gray-200"
          >
            {passwordVisible ? <Icons.EyeOff aria-hidden="true" className="h-5 w-5" /> : <Icons.Eye aria-hidden="true" className="h-5 w-5" />}
          </button>
        ) : trailing}
      />
      {hint && <p id={`${id}-hint`} className="text-xs leading-5 text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-xs leading-5 text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  )
})

export default AuthField
