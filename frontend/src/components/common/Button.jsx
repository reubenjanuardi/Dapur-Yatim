/**
 * Component: Button
 * Tombol reusable dengan varian, ukuran, dan loading state
 */

/** @param {{ children: React.ReactNode, variant?: 'primary'|'secondary'|'ghost'|'danger', size?: 'sm'|'md'|'lg', disabled?: boolean, loading?: boolean, onClick?: Function, type?: string, className?: string }} props */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost:
      'inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-on-surface-variant border border-outline-variant font-semibold rounded-lg transition-all duration-200 hover:bg-surface-container hover:text-on-surface active:scale-95',
    danger:
      'inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-sm transition-all duration-200 hover:bg-red-700 active:scale-95',
  }

  const sizeClasses = {
    sm: 'text-sm !px-4 !py-2',
    md: '',
    lg: 'text-lg !px-8 !py-4',
  }

  const baseClass = variantClasses[variant] || variantClasses.primary
  const sizeClass = sizeClasses[size] || ''
  const disabledClass = isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`${baseClass} ${sizeClass} ${disabledClass} ${className}`.trim()}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
