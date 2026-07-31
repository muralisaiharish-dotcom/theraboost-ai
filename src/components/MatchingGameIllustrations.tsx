export function DogCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Dog Ears */}
      <ellipse cx="28" cy="42" rx="10" ry="20" fill="#8B4513" transform="rotate(18 28 42)" />
      <ellipse cx="72" cy="42" rx="10" ry="20" fill="#8B4513" transform="rotate(-18 72 42)" />
      <ellipse cx="28" cy="42" rx="6" ry="14" fill="#A0522D" transform="rotate(18 28 42)" />
      <ellipse cx="72" cy="42" rx="6" ry="14" fill="#A0522D" transform="rotate(-18 72 42)" />

      {/* Head */}
      <circle cx="50" cy="44" r="26" fill="#F4A460" />
      <ellipse cx="50" cy="36" rx="12" ry="14" fill="#FFF8DC" />

      {/* Snout */}
      <ellipse cx="50" cy="52" rx="13" ry="10" fill="#FFF8DC" />
      <ellipse cx="50" cy="47" rx="6" ry="4" fill="#2C1810" />

      {/* Eyes */}
      <circle cx="40" cy="40" r="4.5" fill="#2C1810" />
      <circle cx="38.5" cy="38.5" r="1.5" fill="white" />
      <circle cx="60" cy="40" r="4.5" fill="#2C1810" />
      <circle cx="58.5" cy="38.5" r="1.5" fill="white" />

      {/* Eyebrows */}
      <path d="M 36 33 Q 40 31 44 34" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 64 33 Q 60 31 56 34" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round" />

      {/* Tongue & Smile */}
      <path d="M 47 55 Q 50 62 53 55" fill="#FF6B81" />
      <path d="M 45 52 Q 50 56 55 52" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Body */}
      <path d="M 34 65 C 30 92, 70 92, 66 65 Z" fill="#F4A460" />
      <ellipse cx="50" cy="74" rx="11" ry="13" fill="#FFF8DC" />

      {/* Paws */}
      <rect x="36" y="80" width="10" height="15" rx="5" fill="#FFF8DC" />
      <rect x="54" y="80" width="10" height="15" rx="5" fill="#FFF8DC" />
      <path d="M 39 88 V 92 M 43 88 V 92 M 57 88 V 92 M 61 88 V 92" stroke="#D2B48C" strokeWidth="1" />

      {/* Red Collar & Golden Tag */}
      <path d="M 36 64 C 42 68, 58 68, 64 64" stroke="#FF4757" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="68" r="3.5" fill="#FFA500" stroke="#FFD700" strokeWidth="1" />
    </svg>
  )
}

export function AppleCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Leaf */}
      <path d="M 50 20 Q 64 6 72 16 Q 60 26 50 20 Z" fill="#2ED573" />
      <path d="M 50 20 Q 60 14 72 16" stroke="#26AF5F" strokeWidth="1.5" />

      {/* Stem */}
      <path d="M 50 28 Q 47 18 51 12" stroke="#5D4037" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Apple Body */}
      <path
        d="M 50 30 Q 30 24 20 44 Q 12 70 38 90 Q 50 96 50 90 Q 50 96 62 90 Q 88 70 80 44 Q 70 24 50 30 Z"
        fill="#FF4757"
      />
      {/* Gradient highlight */}
      <ellipse cx="34" cy="46" rx="8" ry="16" fill="white" opacity="0.3" transform="rotate(-25 34 46)" />
      <ellipse cx="64" cy="70" rx="12" ry="6" fill="#FF6B81" opacity="0.4" />

      {/* Cute Face */}
      <circle cx="40" cy="54" r="3" fill="#2C1810" />
      <circle cx="60" cy="54" r="3" fill="#2C1810" />
      <path d="M 46 58 Q 50 64 54 58" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="58" r="3" fill="#FF6B81" opacity="0.6" />
      <circle cx="66" cy="58" r="3" fill="#FF6B81" opacity="0.6" />
    </svg>
  )
}

export function SoccerBallCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Outer Ball */}
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Shadow curve */}
      <path d="M 12 50 A 38 38 0 0 0 88 50 A 38 38 0 0 1 12 50 Z" fill="#000000" opacity="0.05" />

      {/* Center Pentagon */}
      <polygon points="50,38 60,45 56,57 44,57 40,45" fill="#2F3542" />

      {/* Surrounding Lines & Pentagons */}
      <path d="M 50 38 L 50 24" stroke="#2F3542" strokeWidth="2.5" />
      <path d="M 60 45 L 74 42" stroke="#2F3542" strokeWidth="2.5" />
      <path d="M 56 57 L 68 67" stroke="#2F3542" strokeWidth="2.5" />
      <path d="M 44 57 L 32 67" stroke="#2F3542" strokeWidth="2.5" />
      <path d="M 40 45 L 26 42" stroke="#2F3542" strokeWidth="2.5" />

      {/* Outer Pentagons */}
      <polygon points="50,24 40,16 28,20 32,30 40,24" fill="#2F3542" />
      <polygon points="50,24 60,16 72,20 68,30 60,24" fill="#2F3542" />
      <polygon points="74,42 86,40 90,52 82,60 74,52" fill="#2F3542" />
      <polygon points="68,67 76,78 68,88 56,84 60,74" fill="#2F3542" />
      <polygon points="32,67 24,78 32,88 44,84 40,74" fill="#2F3542" />
      <polygon points="26,42 14,40 10,52 18,60 26,52" fill="#2F3542" />
    </svg>
  )
}

export function CatCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Ears */}
      <polygon points="26,38 18,14 42,26" fill="#808E9B" />
      <polygon points="28,34 22,18 40,26" fill="#FFC048" opacity="0.6" />
      <polygon points="74,38 82,14 58,26" fill="#808E9B" />
      <polygon points="72,34 78,18 60,26" fill="#FFC048" opacity="0.6" />

      {/* Head */}
      <ellipse cx="50" cy="44" rx="28" ry="22" fill="#A4B0BD" />

      {/* Eyes */}
      <ellipse cx="36" cy="40" rx="5" ry="6.5" fill="#2ED573" />
      <circle cx="34.5" cy="38" r="2" fill="white" />
      <ellipse cx="64" cy="40" rx="5" ry="6.5" fill="#2ED573" />
      <circle cx="62.5" cy="38" r="2" fill="white" />

      {/* Nose & Mouth */}
      <polygon points="48,46 52,46 50,49" fill="#FF6B81" />
      <path d="M 46 51 Q 50 55 54 51" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <path d="M 20 42 L 32 44 M 18 48 L 32 47 M 80 42 L 68 44 M 82 48 L 68 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Body */}
      <path d="M 32 64 C 28 92, 72 92, 68 64 Z" fill="#A4B0BD" />
      <ellipse cx="50" cy="74" rx="10" ry="12" fill="#E4E7EB" />

      {/* Red Collar & Bell */}
      <path d="M 34 62 C 40 66, 60 66, 66 62" stroke="#FF4757" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="65" r="3.5" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />

      {/* Tail */}
      <path d="M 68 76 Q 84 70 82 56" stroke="#808E9B" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function BeachBallCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Outer Ball */}
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" stroke="#F1F2F6" strokeWidth="1" />

      {/* Red Segment */}
      <path d="M 50 10 A 40 40 0 0 1 85 30 L 50 50 Z" fill="#FF4757" />

      {/* Yellow Segment */}
      <path d="M 85 30 A 40 40 0 0 1 90 65 L 50 50 Z" fill="#FFA500" />

      {/* Teal/Green Segment */}
      <path d="M 90 65 A 40 40 0 0 1 50 90 L 50 50 Z" fill="#2ED573" />

      {/* Blue Segment */}
      <path d="M 50 90 A 40 40 0 0 1 15 70 L 50 50 Z" fill="#1E90FF" />

      {/* Purple Segment */}
      <path d="M 15 70 A 40 40 0 0 1 10 35 L 50 50 Z" fill="#9B59B6" />

      {/* White Segment */}
      <path d="M 10 35 A 40 40 0 0 1 50 10 L 50 50 Z" fill="#FFFFFF" />

      {/* Center White Cap */}
      <circle cx="50" cy="50" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="4" fill="#F1F2F6" />
    </svg>
  )
}

export function LionCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Mane */}
      <circle cx="50" cy="46" r="32" fill="#E67E22" stroke="#D35400" strokeWidth="2" strokeDasharray="6 4" />

      {/* Head */}
      <circle cx="50" cy="46" r="22" fill="#F1C40F" />

      {/* Ears */}
      <circle cx="34" cy="30" r="6" fill="#E67E22" />
      <circle cx="34" cy="30" r="3.5" fill="#FFEAA7" />
      <circle cx="66" cy="30" r="6" fill="#E67E22" />
      <circle cx="66" cy="30" r="3.5" fill="#FFEAA7" />

      {/* Snout */}
      <ellipse cx="50" cy="52" rx="9" ry="6" fill="#FFEAA7" />
      <polygon points="47,48 53,48 50,52" fill="#5D4037" />
      <path d="M 47 53 Q 50 57 53 53" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <circle cx="42" cy="42" r="3" fill="#2C1810" />
      <circle cx="41" cy="41" r="1" fill="white" />
      <circle cx="58" cy="42" r="3" fill="#2C1810" />
      <circle cx="57" cy="41" r="1" fill="white" />

      {/* Body */}
      <path d="M 36 68 C 32 94, 68 94, 64 68 Z" fill="#F1C40F" />
      <rect x="42" y="78" width="6" height="14" rx="3" fill="#E67E22" />
      <rect x="52" y="78" width="6" height="14" rx="3" fill="#E67E22" />
    </svg>
  )
}

export function ElephantCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Ears */}
      <ellipse cx="26" cy="44" rx="14" ry="18" fill="#74B9FF" transform="rotate(-15 26 44)" />
      <ellipse cx="26" cy="44" rx="9" ry="12" fill="#FF7675" opacity="0.5" transform="rotate(-15 26 44)" />
      <ellipse cx="74" cy="44" rx="14" ry="18" fill="#74B9FF" transform="rotate(15 74 44)" />
      <ellipse cx="74" cy="44" rx="9" ry="12" fill="#FF7675" opacity="0.5" transform="rotate(15 74 44)" />

      {/* Head */}
      <circle cx="50" cy="44" r="22" fill="#0984E3" />

      {/* Eyes */}
      <circle cx="42" cy="40" r="3" fill="#2C1810" />
      <circle cx="41" cy="39" r="1" fill="white" />
      <circle cx="58" cy="40" r="3" fill="#2C1810" />
      <circle cx="57" cy="39" r="1" fill="white" />

      {/* Trunk */}
      <path d="M 50 48 Q 48 66 58 68 Q 66 70 64 60 Q 62 55 58 58" stroke="#0984E3" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 50 48 Q 48 66 58 68" stroke="#74B9FF" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx="36" cy="46" r="3" fill="#FF7675" opacity="0.6" />
      <circle cx="64" cy="46" r="3" fill="#FF7675" opacity="0.6" />

      {/* Body */}
      <path d="M 34 64 C 30 92, 70 92, 66 64 Z" fill="#0984E3" />
    </svg>
  )
}

export function BananaCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Banana Peel */}
      <path
        d="M 22 26 Q 48 18 78 38 Q 84 68 56 86 Q 30 78 22 26 Z"
        fill="#F1C40F"
      />
      <path d="M 22 26 Q 52 32 78 38" stroke="#F39C12" strokeWidth="3" fill="none" />
      <rect x="18" y="20" width="6" height="8" rx="2" fill="#5D4037" />

      {/* Face */}
      <circle cx="48" cy="46" r="2.5" fill="#2C1810" />
      <circle cx="62" cy="52" r="2.5" fill="#2C1810" />
      <path d="M 52 54 Q 56 60 60 54" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function CarrotCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Greens */}
      <path d="M 50 28 Q 40 10 32 20 Q 44 26 50 28 Z" fill="#2ECC71" />
      <path d="M 50 28 Q 50 8 54 18 Q 52 26 50 28 Z" fill="#27AE60" />
      <path d="M 50 28 Q 60 10 68 20 Q 56 26 50 28 Z" fill="#2ECC71" />

      {/* Body */}
      <path d="M 36 34 Q 50 28 64 34 Q 70 54 55 92 Q 50 96 45 92 Q 30 54 36 34 Z" fill="#E67E22" />

      {/* Ridges */}
      <path d="M 40 46 Q 48 48 44 50 M 54 60 Q 60 62 56 64 M 42 72 Q 48 74 45 76" stroke="#D35400" strokeWidth="2" strokeLinecap="round" />

      {/* Face */}
      <circle cx="45" cy="44" r="2.5" fill="#2C1810" />
      <circle cx="55" cy="44" r="2.5" fill="#2C1810" />
      <path d="M 48 48 Q 50 52 52 48" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function CarCardItem() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm select-none">
      {/* Roof */}
      <path d="M 28 54 Q 38 30 58 28 Q 78 28 86 54 Z" fill="#3498DB" />
      <path d="M 36 50 Q 44 34 56 32 L 56 50 Z" fill="#EBF5FB" />
      <path d="M 60 50 L 60 32 Q 74 34 80 50 Z" fill="#EBF5FB" />

      {/* Car Body */}
      <rect x="14" y="52" width="76" height="22" rx="8" fill="#E74C3C" />
      <circle cx="20" cy="60" r="4" fill="#F1C40F" />
      <rect x="84" y="58" width="4" height="8" rx="2" fill="#C0392B" />

      {/* Wheels */}
      <circle cx="32" cy="74" r="10" fill="#2C3E50" />
      <circle cx="32" cy="74" r="4" fill="#BDC3C7" />
      <circle cx="72" cy="74" r="10" fill="#2C3E50" />
      <circle cx="72" cy="74" r="4" fill="#BDC3C7" />
    </svg>
  )
}

export function DynamicCardIllustration({ keyName }: { keyName: string }) {
  switch (keyName) {
    case 'dog':
      return <DogCardItem />
    case 'apple':
      return <AppleCardItem />
    case 'soccer':
      return <SoccerBallCardItem />
    case 'cat':
      return <CatCardItem />
    case 'beachball':
      return <BeachBallCardItem />
    case 'lion':
      return <LionCardItem />
    case 'elephant':
      return <ElephantCardItem />
    case 'banana':
      return <BananaCardItem />
    case 'carrot':
      return <CarrotCardItem />
    case 'car':
      return <CarCardItem />
    default:
      return <DogCardItem />
  }
}
