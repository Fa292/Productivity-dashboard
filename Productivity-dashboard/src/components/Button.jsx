

export default function Button({variant, size = "md", leading, trailing, className = "", children, ...rest}){
    const variants = {
        primary:   'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50',
        ghost:     'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
        danger:    'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
    }
    const sizes = {
        sm:     'h-8 px-3 text-sm',
        md:     'h-10 px-4 text-sm',
        lg:     'h-12 px-5 text-base',
        icon:   'h-10 w-10 p-0',
        iconSm: 'h-8 w-8 p-0',
    }
    return(
        <button className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
            {leading}
            {children}
            {trailing}
        </button>
    )
}
