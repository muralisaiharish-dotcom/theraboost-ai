export function TheraMascot({ message, className = '' }: { message?: string; className?: string }) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      {/* Cat / Robot Mascot Graphic */}
      <div className="relative group cursor-pointer">
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg transition-transform duration-300 hover:scale-110">
          {/* Ears */}
          <path d="M 22 35 L 12 10 L 38 25 Z" fill="#8B5CF6" />
          <path d="M 24 32 L 17 14 L 35 24 Z" fill="#DDD6FE" />

          <path d="M 78 35 L 88 10 L 62 25 Z" fill="#8B5CF6" />
          <path d="M 76 32 L 83 14 L 65 24 Z" fill="#DDD6FE" />

          {/* Head */}
          <rect x="18" y="22" width="64" height="54" rx="26" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="4" />
          <rect x="24" y="28" width="52" height="42" rx="20" fill="#7C5FE6" />

          {/* Face Screen */}
          <ellipse cx="50" cy="49" rx="22" ry="16" fill="#1E1B4B" />

          {/* Glowing Eyes */}
          <ellipse cx="40" cy="48" rx="5" ry="7" fill="#38BDF8" />
          <ellipse cx="60" cy="48" rx="5" ry="7" fill="#38BDF8" />
          <circle cx="41" cy="45" r="2" fill="white" />
          <circle cx="61" cy="45" r="2" fill="white" />

          {/* Cute Winking Cheek / Mouth */}
          <path d="M 46 54 Q 50 58 54 54" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="34" cy="53" r="3" fill="#F472B6" opacity="0.7" />
          <circle cx="66" cy="53" r="3" fill="#F472B6" opacity="0.7" />

          {/* Paws */}
          <ellipse cx="32" cy="74" rx="10" ry="7" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="2" />
          <ellipse cx="68" cy="74" rx="10" ry="7" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="2" />
        </svg>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="relative bg-white text-purple-900 px-4 py-2 rounded-2xl rounded-bl-none shadow-md border border-purple-100 flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '3s' }}>
          <span className="font-extrabold text-sm">{message}</span>
        </div>
      )}
    </div>
  )
}
