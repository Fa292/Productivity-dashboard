import { forwardRef } from 'react'

const Input = forwardRef(({ className = '', leading, trailing, ...rest }, ref) => (
  <div className={`relative flex items-center ${className}`}>
    {leading && (
      <span className="absolute left-3 text-gray-400 pointer-events-none">
        {leading}
      </span>
    )}
    <input
      ref={ref}
      className={`
        w-full h-10 rounded-xl bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-sm text-gray-900 dark:text-white
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        ${leading ? 'pl-10' : 'pl-3.5'}
        ${trailing ? 'pr-10' : 'pr-3.5'}
      `}
      {...rest}
    />
    {trailing && (
      <span className="absolute right-3 text-gray-400">
        {trailing}
      </span>
    )}
  </div>
))

Input.displayName = 'Input'

export default Input
