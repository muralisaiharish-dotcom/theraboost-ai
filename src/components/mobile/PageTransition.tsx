import { ReactNode, useEffect, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
  screenKey: string
  direction?: 'up' | 'right'
}

/**
 * Wraps a screen with a slide-up or slide-right entrance animation
 * triggered whenever `screenKey` changes.
 */
export function PageTransition({ children, screenKey, direction = 'up' }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cls = direction === 'right' ? 'animate-slideInRight' : 'animate-slideUp'
    el.classList.remove('animate-slideUp', 'animate-slideInRight')
    // Trigger reflow
    void el.offsetWidth
    el.classList.add(cls)

    const onEnd = () => {
      el.classList.remove(cls)
    }
    el.addEventListener('animationend', onEnd, { once: true })
    return () => el.removeEventListener('animationend', onEnd)
  }, [screenKey, direction])

  return (
    <div ref={ref} className="min-h-full" style={{ opacity: 1 }}>
      {children}
    </div>
  )
}
