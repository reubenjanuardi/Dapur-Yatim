/**
 * Component: ProgressBar
 * Bar progress animasi untuk menampilkan persentase alokasi atau pencapaian target
 */
import { useEffect, useRef, useState } from 'react'

/** @param {{ value: number, color?: 'primary'|'secondary'|'tertiary', label?: string, showPercentage?: boolean, size?: 'sm'|'md' }} props */
export default function ProgressBar({
  value = 0,
  color = 'primary',
  label,
  showPercentage = true,
  size = 'md',
  className = '',
}) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const hasAnimated = useRef(false)
  const containerRef = useRef(null)

  // Clamp value ke 0-100
  const clampedValue = Math.min(100, Math.max(0, value))

  // Animasi saat pertama kali visible (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          // Animasi dari 0 ke nilai target
          const duration = 800
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Easing: ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            setAnimatedValue(Math.round(clampedValue * easedProgress))
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [clampedValue])

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary-container',
  }

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
  }

  const trackColor = {
    primary: 'bg-primary/15',
    secondary: 'bg-secondary/15',
    tertiary: 'bg-tertiary/15',
  }

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-on-surface">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-on-surface-variant ml-auto">
              {animatedValue}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full rounded-full ${trackColor[color] || trackColor.primary} ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full ${colorClasses[color] || colorClasses.primary} transition-none`}
          style={{ width: `${animatedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || `Progress ${clampedValue}%`}
        />
      </div>
    </div>
  )
}
