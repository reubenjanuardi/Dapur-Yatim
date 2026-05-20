/**
 * Component: Card
 * Container card reusable dengan shadow, padding, dan optional clickable
 */

/** @param {{ children: React.ReactNode, className?: string, onClick?: Function, padding?: 'sm'|'md'|'lg' }} props */
export default function Card({ children, className = '', onClick, padding = 'md' }) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const paddingClass = paddingClasses[padding] || paddingClasses.md
  const isClickable = typeof onClick === 'function'

  const handleKeyDown = (e) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-card ${paddingClass} transition-shadow duration-200 hover:shadow-card-hover ${
        isClickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40' : ''
      } ${className}`}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  )
}
