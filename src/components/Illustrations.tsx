export function ElephantIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-purple-200/80 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="relative z-10 drop-shadow-md">
        <rect x="70" y="125" width="22" height="42" rx="10" fill="#94A3B8" />
        <rect x="135" y="125" width="22" height="42" rx="10" fill="#94A3B8" />
        <ellipse cx="115" cy="115" rx="50" ry="42" fill="#CBD5E1" />
        <rect x="58" y="128" width="24" height="42" rx="10" fill="#CBD5E1" />
        <rect x="122" y="128" width="24" height="42" rx="10" fill="#CBD5E1" />
        <path d="M 58 162 H 82 V 170 H 58 Z" fill="#E2E8F0" rx="3" />
        <path d="M 122 162 H 146 V 170 H 122 Z" fill="#E2E8F0" rx="3" />

        {/* Big Floppy Ears */}
        <ellipse cx="60" cy="75" rx="28" ry="34" fill="#94A3B8" transform="rotate(-15 60 75)" />
        <ellipse cx="62" cy="75" rx="20" ry="26" fill="#F472B6" opacity="0.6" transform="rotate(-15 62 75)" />
        <circle cx="98" cy="80" r="42" fill="#CBD5E1" />
        <ellipse cx="138" cy="78" rx="28" ry="34" fill="#CBD5E1" transform="rotate(15 138 78)" />
        <ellipse cx="136" cy="78" rx="20" ry="26" fill="#F472B6" opacity="0.8" transform="rotate(15 136 78)" />

        {/* Eyes & Cheeks */}
        <circle cx="85" cy="74" r="5" fill="#1E293B" />
        <circle cx="83" cy="72" r="1.8" fill="white" />
        <circle cx="112" cy="74" r="5" fill="#1E293B" />
        <circle cx="110" cy="72" r="1.8" fill="white" />
        <circle cx="76" cy="84" r="6" fill="#F472B6" opacity="0.5" />
        <circle cx="120" cy="84" r="6" fill="#F472B6" opacity="0.5" />

        {/* Long Trunk */}
        <path d="M 96 90 Q 94 125 112 128 Q 124 130 120 115 Q 116 108 108 114" fill="none" stroke="#CBD5E1" strokeWidth="16" strokeLinecap="round" />
        <path d="M 96 90 Q 94 125 112 128 Q 124 130 120 115" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <path d="M 88 94 Q 82 102 90 106" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M 108 94 Q 114 102 106 106" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function LionIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-amber-200/80 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-md">
        <circle cx="100" cy="90" r="58" fill="#F59E0B" />
        <circle cx="100" cy="90" r="54" fill="#D97706" stroke="#B45309" strokeWidth="3" strokeDasharray="8 6" />
        <circle cx="100" cy="92" r="38" fill="#FCD34D" />
        <circle cx="70" cy="62" r="12" fill="#F59E0B" />
        <circle cx="70" cy="62" r="7" fill="#FEF3C7" />
        <circle cx="130" cy="62" r="12" fill="#F59E0B" />
        <circle cx="130" cy="62" r="7" fill="#FEF3C7" />
        <ellipse cx="100" cy="102" rx="16" ry="11" fill="#FEF3C7" />
        <path d="M 94 96 L 106 96 L 100 103 Z" fill="#78350F" />
        <path d="M 100 103 V 109 M 95 108 Q 100 113 105 108" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="86" cy="85" r="5" fill="#78350F" />
        <circle cx="84" cy="83" r="1.8" fill="white" />
        <circle cx="114" cy="85" r="5" fill="#78350F" />
        <circle cx="112" cy="83" r="1.8" fill="white" />
        <path d="M 75 125 C 70 165, 130 165, 125 125 Z" fill="#FCD34D" />
        <rect x="80" y="140" width="14" height="30" rx="6" fill="#F59E0B" />
        <rect x="106" y="140" width="14" height="30" rx="6" fill="#F59E0B" />
      </svg>
    </div>
  )
}

export function DogIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-amber-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-md">
        <ellipse cx="60" cy="85" rx="16" ry="32" fill="#92400E" transform="rotate(15 60 85)" />
        <ellipse cx="140" cy="85" rx="16" ry="32" fill="#92400E" transform="rotate(-15 140 85)" />
        <circle cx="100" cy="85" r="38" fill="#F59E0B" />
        <ellipse cx="100" cy="98" rx="18" ry="14" fill="#FEF3C7" />
        <ellipse cx="100" cy="92" rx="8" ry="5" fill="#451A03" />
        <circle cx="85" cy="78" r="5" fill="#451A03" />
        <circle cx="83" cy="76" r="1.8" fill="white" />
        <circle cx="115" cy="78" r="5" fill="#451A03" />
        <circle cx="113" cy="76" r="1.8" fill="white" />
        <path d="M 96 104 Q 100 114 104 104" fill="#F472B6" />
        <path d="M 70 120 C 65 165, 135 165, 130 120 Z" fill="#D97706" />
        <circle cx="100" cy="130" r="12" fill="#FEF3C7" />
      </svg>
    </div>
  )
}

export function CatIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-purple-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-md">
        <path d="M 65 65 L 55 35 L 82 50 Z" fill="#A855F7" />
        <path d="M 68 62 L 60 40 L 80 50 Z" fill="#F472B6" />
        <path d="M 135 65 L 145 35 L 118 50 Z" fill="#A855F7" />
        <path d="M 132 62 L 140 40 L 120 50 Z" fill="#F472B6" />
        <ellipse cx="100" cy="85" rx="40" ry="32" fill="#C084FC" />
        <ellipse cx="82" cy="80" rx="6" ry="8" fill="#10B981" />
        <circle cx="80" cy="78" r="2" fill="white" />
        <ellipse cx="118" cy="80" rx="6" ry="8" fill="#10B981" />
        <circle cx="116" cy="78" r="2" fill="white" />
        <path d="M 96 88 L 104 88 L 100 93 Z" fill="#F472B6" />
        <path d="M 60 88 L 80 88 M 58 94 L 80 91 M 140 88 L 120 88 M 142 94 L 120 91" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 72 115 C 68 165, 132 165, 128 115 Z" fill="#A855F7" />
      </svg>
    </div>
  )
}

export function MonkeyIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-emerald-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-md">
        {/* Vine */}
        <path d="M 20 10 Q 100 40 180 10" stroke="#059669" strokeWidth="4" fill="none" />
        {/* Ears */}
        <circle cx="58" cy="85" r="16" fill="#854D0E" />
        <circle cx="58" cy="85" r="10" fill="#FEF3C7" />
        <circle cx="142" cy="85" r="16" fill="#854D0E" />
        <circle cx="142" cy="85" r="10" fill="#FEF3C7" />

        {/* Head */}
        <circle cx="100" cy="85" r="38" fill="#B45309" />
        {/* Face plate */}
        <path d="M 78 72 Q 100 65 122 72 Q 128 95 120 105 Q 100 115 80 105 Q 72 95 78 72 Z" fill="#FDE68A" />

        {/* Eyes */}
        <circle cx="88" cy="82" r="5" fill="#451A03" />
        <circle cx="86" cy="80" r="1.8" fill="white" />
        <circle cx="112" cy="82" r="5" fill="#451A03" />
        <circle cx="110" cy="80" r="1.8" fill="white" />

        {/* Mouth & Nose */}
        <ellipse cx="100" cy="94" rx="4" ry="2.5" fill="#78350F" />
        <path d="M 90 98 Q 100 108 110 98" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Body */}
        <path d="M 75 120 C 70 165, 130 165, 125 120 Z" fill="#B45309" />
        <ellipse cx="100" cy="138" rx="16" ry="18" fill="#FDE68A" />
      </svg>
    </div>
  )
}

export function DolphinIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-2 w-52 h-10 bg-blue-200/80 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-md">
        {/* Ocean wave */}
        <path d="M 20 150 Q 60 130 100 150 Q 140 170 180 150 L 180 180 L 20 180 Z" fill="#60A5FA" opacity="0.6" />
        {/* Body */}
        <path d="M 40 140 Q 60 70 120 70 Q 165 70 170 100 Q 170 120 120 135 Q 70 145 40 140 Z" fill="#3B82F6" />
        <path d="M 60 130 Q 90 100 130 105 Q 160 110 165 100 Q 155 125 120 135 Z" fill="#93C5FD" />
        {/* Fin */}
        <path d="M 105 70 Q 115 35 135 55 Z" fill="#2563EB" />
        <path d="M 90 120 Q 95 140 80 145 Z" fill="#2563EB" />

        {/* Eye */}
        <circle cx="145" cy="85" r="4" fill="#1E293B" />
        <circle cx="144" cy="84" r="1.5" fill="white" />
        {/* Smile */}
        <path d="M 152 92 Q 160 92 165 88" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function AppleIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-rose-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 100 45 Q 125 20 135 40 Q 115 55 100 45 Z" fill="#22C55E" />
        <path d="M 100 45 Q 118 32 135 40" stroke="#15803D" strokeWidth="2" />
        <path d="M 100 60 Q 96 42 102 32" stroke="#78350F" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 100 65 Q 60 55 45 95 Q 35 140 75 170 Q 100 180 100 172 Q 100 180 125 170 Q 165 140 155 95 Q 140 55 100 65 Z" fill="#EF4444" />
        <ellipse cx="70" cy="95" rx="12" ry="24" fill="white" opacity="0.3" transform="rotate(-25 70 95)" />
        <circle cx="82" cy="115" r="4.5" fill="#7F1D1D" />
        <circle cx="118" cy="115" r="4.5" fill="#7F1D1D" />
        <path d="M 94 122 Q 100 130 106 122" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function BananaIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-yellow-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 45 60 Q 90 40 145 75 Q 155 125 105 160 Q 60 145 45 60 Z" fill="#EAB308" />
        <path d="M 45 60 Q 95 65 145 75" stroke="#CA8A04" strokeWidth="4" fill="none" />
        <rect x="40" y="52" width="10" height="12" rx="3" fill="#78350F" />
        <circle cx="95" cy="95" r="4" fill="#78350F" />
        <circle cx="120" cy="105" r="4" fill="#78350F" />
        <path d="M 102 108 Q 108 116 114 108" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function StrawberryIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-pink-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 80 50 Q 100 30 120 50 L 100 58 Z" fill="#16A34A" />
        <path d="M 65 60 Q 100 50 135 60 Q 145 100 100 170 Q 55 100 65 60 Z" fill="#F43F5E" />
        {[
          [80, 80], [100, 75], [120, 80],
          [75, 105], [95, 100], [115, 105],
          [85, 130], [105, 130]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#FDE047" />
        ))}
        <circle cx="88" cy="90" r="3.5" fill="#881337" />
        <circle cx="112" cy="90" r="3.5" fill="#881337" />
        <path d="M 94 96 Q 100 102 106 96" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function WatermelonIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-emerald-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 30 100 Q 100 180 170 100 Z" fill="#059669" />
        <path d="M 36 100 Q 100 172 164 100 Z" fill="#A7F3D0" />
        <path d="M 42 100 Q 100 164 158 100 Z" fill="#F43F5E" />
        {[
          [70, 115], [100, 125], [130, 115],
          [85, 135], [115, 135]
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="2" ry="4" fill="#1E293B" />
        ))}
      </svg>
    </div>
  )
}

export function CarrotIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-40 h-8 bg-orange-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 100 50 Q 80 15 70 30 Q 90 45 100 50 Z" fill="#16A34A" />
        <path d="M 100 50 Q 100 10 105 25 Q 102 45 100 50 Z" fill="#22C55E" />
        <path d="M 100 50 Q 120 15 130 30 Q 110 45 100 50 Z" fill="#16A34A" />
        <path d="M 75 60 Q 100 52 125 60 Q 135 90 108 175 Q 100 182 92 175 Q 65 90 75 60 Z" fill="#F97316" />
        <circle cx="90" cy="98" r="4" fill="#7C2D12" />
        <circle cx="110" cy="98" r="4" fill="#7C2D12" />
        <path d="M 96 104 Q 100 110 104 104" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function BroccoliIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-40 h-8 bg-emerald-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <rect x="88" y="110" width="24" height="50" rx="8" fill="#A7F3D0" />
        <circle cx="75" cy="85" r="28" fill="#16A34A" />
        <circle cx="125" cy="85" r="28" fill="#16A34A" />
        <circle cx="100" cy="65" r="32" fill="#22C55E" />
        <circle cx="86" cy="78" r="3.5" fill="#064E3B" />
        <circle cx="114" cy="78" r="3.5" fill="#064E3B" />
        <path d="M 94 84 Q 100 90 106 84" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function TomatoIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-rose-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 90 55 Q 100 45 110 55 L 100 62 Z" fill="#15803D" />
        <circle cx="100" cy="105" r="48" fill="#EF4444" />
        <ellipse cx="80" cy="85" rx="8" ry="14" fill="white" opacity="0.3" transform="rotate(-30 80 85)" />
        <circle cx="85" cy="100" r="4" fill="#7F1D1D" />
        <circle cx="115" cy="100" r="4" fill="#7F1D1D" />
        <path d="M 94 108 Q 100 114 106 108" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function CarIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-52 h-8 bg-blue-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 45 110 Q 60 70 95 65 Q 135 65 155 110 Z" fill="#3B82F6" />
        <path d="M 60 105 Q 70 76 95 72 L 95 105 Z" fill="#93C5FD" />
        <path d="M 102 105 L 102 72 Q 130 74 142 105 Z" fill="#93C5FD" />
        <rect x="25" y="105" width="150" height="40" rx="14" fill="#EF4444" />
        <circle cx="35" cy="120" r="7" fill="#FDE047" />
        <circle cx="60" cy="145" r="18" fill="#1E293B" />
        <circle cx="60" cy="145" r="9" fill="#94A3B8" />
        <circle cx="140" cy="145" r="18" fill="#1E293B" />
        <circle cx="140" cy="145" r="9" fill="#94A3B8" />
      </svg>
    </div>
  )
}

export function BusIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-52 h-8 bg-yellow-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <rect x="30" y="60" width="140" height="85" rx="16" fill="#EAB308" />
        <rect x="42" y="72" width="30" height="24" rx="4" fill="#93C5FD" />
        <rect x="85" y="72" width="30" height="24" rx="4" fill="#93C5FD" />
        <rect x="128" y="72" width="30" height="24" rx="4" fill="#93C5FD" />
        <circle cx="55" cy="145" r="16" fill="#1E293B" />
        <circle cx="55" cy="145" r="7" fill="#94A3B8" />
        <circle cx="145" cy="145" r="16" fill="#1E293B" />
        <circle cx="145" cy="145" r="7" fill="#94A3B8" />
      </svg>
    </div>
  )
}

export function AirplaneIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-52 h-8 bg-sky-200/60 rounded-full blur-xs" />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <path d="M 20 100 Q 100 70 175 95 Q 185 100 175 105 Q 100 130 20 100 Z" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
        <path d="M 90 90 L 120 30 L 140 35 L 115 95 Z" fill="#0284C7" />
        <path d="M 90 110 L 120 170 L 140 165 L 115 105 Z" fill="#0284C7" />
        <circle cx="140" cy="96" r="3" fill="#0284C7" />
        <circle cx="155" cy="98" r="3" fill="#0284C7" />
      </svg>
    </div>
  )
}

export function FaceIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-purple-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <ellipse cx="100" cy="80" rx="48" ry="40" fill="#451A03" />
        <circle cx="100" cy="100" r="40" fill="#FDE68A" />
        <path d="M 60 85 Q 80 65 100 85 Q 120 65 140 85 Z" fill="#451A03" />
        <circle cx="85" cy="95" r="5" fill="#1E293B" />
        <circle cx="83" cy="93" r="1.8" fill="white" />
        <circle cx="115" cy="95" r="5" fill="#1E293B" />
        <circle cx="113" cy="93" r="1.8" fill="white" />
        <circle cx="75" cy="104" r="6" fill="#F472B6" opacity="0.6" />
        <circle cx="125" cy="104" r="6" fill="#F472B6" opacity="0.6" />
        <path d="M 85 110 Q 100 126 115 110 Z" fill="#EF4444" />
      </svg>
    </div>
  )
}

export function HandIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-44 h-8 bg-orange-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        {/* Palm & Fingers */}
        <rect x="75" y="100" width="50" height="55" rx="16" fill="#FDE68A" />
        <rect x="65" y="65" width="11" height="45" rx="5.5" fill="#FDE68A" />
        <rect x="80" y="50" width="11" height="55" rx="5.5" fill="#FDE68A" />
        <rect x="95" y="45" width="11" height="60" rx="5.5" fill="#FDE68A" />
        <rect x="110" y="52" width="11" height="52" rx="5.5" fill="#FDE68A" />
        <rect x="125" y="65" width="11" height="42" rx="5.5" fill="#FDE68A" />
      </svg>
    </div>
  )
}

export function RunIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-48 h-8 bg-pink-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        <circle cx="115" cy="55" r="22" fill="#FDE68A" />
        <path d="M 95 45 Q 115 30 135 45 Z" fill="#451A03" />
        <path d="M 90 75 L 125 70 L 105 120 Z" fill="#EC4899" />
        <path d="M 120 75 L 150 90 M 95 80 L 70 95" stroke="#FDE68A" strokeWidth="10" strokeLinecap="round" />
        <path d="M 110 115 L 145 155 M 100 120 L 65 150" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function JumpIllustration() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute bottom-4 w-48 h-8 bg-emerald-200/60 rounded-full blur-xs" />
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-lg">
        {/* Kangaroo jumping */}
        <circle cx="110" cy="50" r="18" fill="#D97706" />
        <path d="M 90 65 Q 120 65 110 120 Q 90 140 70 145 Z" fill="#B45309" />
        <path d="M 110 120 Q 140 140 160 110" stroke="#B45309" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export function DynamicIllustration({ keyName }: { keyName: string }) {
  const key = (keyName || '').toLowerCase()

  switch (key) {
    case 'elephant':
      return <ElephantIllustration />
    case 'lion':
      return <LionIllustration />
    case 'dog':
      return <DogIllustration />
    case 'cat':
      return <CatIllustration />
    case 'monkey':
      return <MonkeyIllustration />
    case 'dolphin':
      return <DolphinIllustration />
    case 'apple':
      return <AppleIllustration />
    case 'banana':
      return <BananaIllustration />
    case 'strawberry':
      return <StrawberryIllustration />
    case 'watermelon':
      return <WatermelonIllustration />
    case 'carrot':
      return <CarrotIllustration />
    case 'broccoli':
      return <BroccoliIllustration />
    case 'tomato':
      return <TomatoIllustration />
    case 'car':
      return <CarIllustration />
    case 'bus':
      return <BusIllustration />
    case 'airplane':
      return <AirplaneIllustration />
    case 'face':
      return <FaceIllustration />
    case 'hand':
      return <HandIllustration />
    case 'run':
      return <RunIllustration />
    case 'jump':
      return <JumpIllustration />
    default:
      return <ElephantIllustration />
  }
}
