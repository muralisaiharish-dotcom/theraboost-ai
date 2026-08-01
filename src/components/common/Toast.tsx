import { useEffect } from 'react'

export interface ToastProps {
  message: string
  type?: 'error' | 'success' | 'info'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'error', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const typeStyles = {
    error: {
      bg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
      border: '#FECDD3',
      color: '#9F1239',
      icon: '🚨',
    },
    success: {
      bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      border: '#A7F3D0',
      color: '#065F46',
      icon: '🎉',
    },
    info: {
      bg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
      border: '#BAE6FD',
      color: '#075985',
      icon: 'ℹ️',
    },
  }

  const current = typeStyles[type]

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-toastSlideUp"
      style={{
        background: current.bg,
        border: `1.5px solid ${current.border}`,
        color: current.color,
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        maxWidth: '380px',
      }}
    >
      <span className="text-xl shrink-0">{current.icon}</span>
      <p className="text-xs font-bold leading-tight flex-1">{message}</p>
      <button
        onClick={onClose}
        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer text-xs font-black shrink-0"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  )
}
