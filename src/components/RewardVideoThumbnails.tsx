// High-Fidelity SVG Illustrations for Reward Video Thumbnails and Banner

export function HeroBannerIllustration() {
  return (
    <svg width="340" height="140" viewBox="0 0 340 140" fill="none" className="select-none">
      {/* Background Decorative Rays */}
      <circle cx="170" cy="140" r="120" fill="#FEF3C7" opacity="0.4" />

      {/* Taj Mahal Silhouette */}
      <g opacity="0.3" fill="#D97706">
        <path d="M 120 120 V 60 H 130 V 120 Z" />
        <path d="M 210 120 V 60 H 220 V 120 Z" />
        <path d="M 122 55 L 125 45 L 128 55 Z" />
        <path d="M 212 55 L 215 45 L 218 55 Z" />
        {/* Main Dome */}
        <path d="M 150 120 V 70 Q 150 50 170 50 Q 190 50 190 70 V 120 Z" />
        <path d="M 165 50 Q 170 30 175 50 Z" />
        <line x1="170" y1="30" x2="170" y2="20" stroke="#D97706" strokeWidth="2" />
        <circle cx="170" cy="18" r="3" fill="#D97706" />
      </g>

      {/* Peacock Feather */}
      <g transform="translate(15, 20)">
        <path d="M 10 90 Q 30 50 50 10" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="14" rx="14" ry="18" fill="#047857" transform="rotate(25 50 14)" />
        <ellipse cx="50" cy="14" rx="10" ry="13" fill="#0284C7" transform="rotate(25 50 14)" />
        <ellipse cx="50" cy="14" rx="6" ry="8" fill="#4F46E5" transform="rotate(25 50 14)" />
        <ellipse cx="50" cy="14" rx="3" ry="4" fill="#F59E0B" transform="rotate(25 50 14)" />
      </g>

      {/* Indian Classical Dancer Girl */}
      <g transform="translate(210, 10)">
        {/* Saree & Body */}
        <path d="M 50 45 L 25 110 H 75 L 50 45 Z" fill="#DC2626" />
        <path d="M 50 45 L 35 110 H 65 Z" fill="#F59E0B" />
        <path d="M 30 110 Q 50 85 70 110" fill="#FFD700" opacity="0.8" />

        {/* Torso */}
        <path d="M 40 45 L 42 28 H 58 L 60 45 Z" fill="#DC2626" />
        <rect x="42" y="28" width="16" height="4" fill="#F59E0B" />

        {/* Arms Pose */}
        <path d="M 42 32 Q 20 20 15 35" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 58 32 Q 80 20 85 35" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="15" cy="35" r="3" fill="#DC2626" />
        <circle cx="85" cy="35" r="3" fill="#DC2626" />

        {/* Head & Hair */}
        <circle cx="50" cy="20" r="10" fill="#FEF3C7" />
        <path d="M 40 18 Q 50 12 60 18 C 60 10 40 10 40 18 Z" fill="#1E1B4B" />
        <circle cx="50" cy="8" r="4" fill="#F59E0B" />

        {/* Bindi & Jewelry */}
        <circle cx="50" cy="18" r="1.5" fill="#DC2626" />
        <circle cx="50" cy="14" r="1" fill="#FFD700" />
      </g>

      {/* Dhol Drum */}
      <g transform="translate(25, 80)">
        <ellipse cx="20" cy="25" rx="14" ry="22" fill="#78350F" stroke="#D97706" strokeWidth="2" />
        <ellipse cx="20" cy="25" rx="10" ry="17" fill="#FEF3C7" />
        <path d="M 20 3 C 45 3 45 47 20 47 Z" fill="#92400E" stroke="#D97706" strokeWidth="2" />
        <line x1="20" y1="5" x2="35" y2="40" stroke="#FFD700" strokeWidth="1.5" />
        <line x1="20" y1="45" x2="35" y2="10" stroke="#FFD700" strokeWidth="1.5" />
      </g>

      {/* Tabla */}
      <g transform="translate(290, 85)">
        <ellipse cx="18" cy="12" rx="12" ry="6" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
        <path d="M 6 12 L 8 32 A 10 6 0 0 0 28 32 L 30 12 Z" fill="#92400E" />
        <circle cx="18" cy="12" r="4" fill="#1E1B4B" />
      </g>
    </svg>
  )
}

// 1. Incredible India Thumbnail
export function ThumbnailIncredibleIndia() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#skyGrad1)" />

      {/* Sun */}
      <circle cx="180" cy="40" r="22" fill="#FDE047" opacity="0.8" />

      {/* Taj Mahal Silhouette in Background */}
      <g opacity="0.4" fill="#D97706">
        <path d="M 130 110 V 60 H 138 V 110 Z" />
        <path d="M 200 110 V 60 H 208 V 110 Z" />
        <path d="M 150 110 V 70 Q 150 55 169 55 Q 188 55 188 70 V 110 Z" />
      </g>

      {/* Indian Flag Flying */}
      <g transform="translate(30, 20)">
        {/* Pole */}
        <line x1="20" y1="10" x2="20" y2="105" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <circle cx="20" cy="8" r="4" fill="#F59E0B" />

        {/* Flag Bands */}
        <path d="M 22 12 Q 45 8 70 16 Q 95 24 110 14 V 64 Q 95 74 70 66 Q 45 58 22 62 Z" fill="#FFFFFF" opacity="0.2" />
        {/* Orange */}
        <path d="M 22 12 Q 45 6 70 14 Q 95 22 110 12 V 28 Q 95 38 70 30 Q 45 22 22 28 Z" fill="#FF9933" />
        {/* White */}
        <path d="M 22 28 Q 45 22 70 30 Q 95 38 110 28 V 44 Q 95 54 70 46 Q 45 38 22 44 Z" fill="#FFFFFF" />
        {/* Green */}
        <path d="M 22 44 Q 45 38 70 46 Q 95 54 110 44 V 60 Q 95 70 70 62 Q 45 54 22 60 Z" fill="#138808" />

        {/* Ashoka Chakra */}
        <circle cx="66" cy="37" r="7" fill="none" stroke="#000080" strokeWidth="1.5" />
        <circle cx="66" cy="37" r="1.5" fill="#000080" />
        <line x1="66" y1="30" x2="66" y2="44" stroke="#000080" strokeWidth="0.8" />
        <line x1="59" y1="37" x2="73" y2="37" stroke="#000080" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

// 2. Folk Dances Thumbnail
export function ThumbnailFolkDances() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="nightDance" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#nightDance)" />

      {/* Decorative Sparkles & Lights */}
      <circle cx="30" cy="30" r="2" fill="#FDE047" />
      <circle cx="70" cy="20" r="3" fill="#F472B6" />
      <circle cx="160" cy="25" r="2.5" fill="#38BDF8" />
      <circle cx="210" cy="35" r="2" fill="#FDE047" />

      {/* 3 Dancing Figures */}
      <g transform="translate(45, 25)">
        {/* Dancer 1 (Garba/Bhangra) */}
        <path d="M 30 90 L 15 50 H 45 L 30 90 Z" fill="#F59E0B" />
        <circle cx="30" cy="38" r="8" fill="#FEF3C7" />
        <path d="M 30 46 L 30 52" stroke="#FEF3C7" strokeWidth="4" />
        <path d="M 20 44 L 5 25 M 40 44 L 55 25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        {/* Dandiya Sticks */}
        <line x1="5" y1="25" x2="18" y2="15" stroke="#EF4444" strokeWidth="3" />
        <line x1="55" y1="25" x2="42" y2="15" stroke="#EF4444" strokeWidth="3" />
      </g>

      <g transform="translate(105, 15)">
        {/* Dancer 2 (Center Girl in Red) */}
        <path d="M 40 100 L 15 55 H 65 L 40 100 Z" fill="#EF4444" />
        <circle cx="40" cy="40" r="9" fill="#FEF3C7" />
        <path d="M 25 45 Q 10 30 20 15 M 55 45 Q 70 30 60 15" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      <g transform="translate(160, 25)">
        {/* Dancer 3 (Bhangra Boy in Blue) */}
        <path d="M 30 90 L 15 50 H 45 L 30 90 Z" fill="#3B82F6" />
        <circle cx="30" cy="38" r="8" fill="#FEF3C7" />
        <path d="M 18 42 L 5 20 M 42 42 L 55 20" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// 3. Diwali Diyas Thumbnail
export function ThumbnailDiwali() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="diwaliBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="60%" stopColor="#431407" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#diwaliBg)" />

      {/* Rangoli Background Pattern */}
      <circle cx="120" cy="70" r="55" stroke="#F59E0B" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <circle cx="120" cy="70" r="40" stroke="#F472B6" strokeWidth="1" opacity="0.3" />

      {/* Main Center Diya */}
      <g transform="translate(90, 50)">
        {/* Glowing Aura */}
        <circle cx="30" cy="15" r="28" fill="#FDE047" opacity="0.35" />
        <circle cx="30" cy="15" r="16" fill="#F97316" opacity="0.5" />

        {/* Diya Lamp Bowl */}
        <path d="M 5 35 Q 30 60 55 35 Q 60 28 30 28 Q 0 28 5 35 Z" fill="#D97706" stroke="#FEF3C7" strokeWidth="1.5" />
        <ellipse cx="30" cy="28" rx="25" ry="5" fill="#78350F" />

        {/* Flame */}
        <path d="M 30 28 Q 20 12 30 0 Q 40 12 30 28 Z" fill="#FFD700" />
        <path d="M 30 28 Q 24 16 30 6 Q 36 16 30 28 Z" fill="#EF4444" />
      </g>

      {/* Side Diyas */}
      <g transform="translate(25, 65) scale(0.7)">
        <circle cx="30" cy="15" r="20" fill="#FDE047" opacity="0.3" />
        <path d="M 5 35 Q 30 60 55 35 Z" fill="#D97706" />
        <path d="M 30 28 Q 20 12 30 0 Q 40 12 30 28 Z" fill="#FFD700" />
      </g>

      <g transform="translate(165, 65) scale(0.7)">
        <circle cx="30" cy="15" r="20" fill="#FDE047" opacity="0.3" />
        <path d="M 5 35 Q 30 60 55 35 Z" fill="#D97706" />
        <path d="M 30 28 Q 20 12 30 0 Q 40 12 30 28 Z" fill="#FFD700" />
      </g>
    </svg>
  )
}

// 4. Bharatanatyam Thumbnail
export function ThumbnailBharatanatyam() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bharatBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#831843" />
          <stop offset="100%" stopColor="#500724" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#bharatBg)" />

      {/* Classical Dancer Pose */}
      <g transform="translate(85, 10)">
        {/* Pleated Fan Skirt */}
        <path d="M 35 60 Q 5 95 35 115 Q 65 95 35 60 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1" />
        <path d="M 35 60 L 15 110 M 35 60 L 25 113 M 35 60 L 35 115 M 35 60 L 45 113 M 35 60 L 55 110" stroke="#B45309" strokeWidth="1" />

        {/* Torso & Silk Saree */}
        <path d="M 25 55 L 28 35 H 42 L 45 55 Z" fill="#DB2777" />
        <path d="M 28 35 L 45 55" stroke="#F59E0B" strokeWidth="3" />

        {/* Mudra Hand Poses */}
        <path d="M 28 40 Q 5 30 10 50" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 42 40 Q 65 30 60 50" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="50" r="3" fill="#DC2626" />
        <circle cx="60" cy="50" r="3" fill="#DC2626" />

        {/* Head & Temple Jewelry (Headband + Sun/Moon ornaments) */}
        <circle cx="35" cy="22" r="10" fill="#FEF3C7" />
        <path d="M 25 20 Q 35 12 45 20 C 45 10 25 10 25 20 Z" fill="#1E1B4B" />
        <circle cx="35" cy="10" r="5" fill="#F59E0B" />
        <circle cx="35" cy="20" r="1.5" fill="#DC2626" />
      </g>
    </svg>
  )
}

// 5. Kathakali Thumbnail
export function ThumbnailKathakali() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="kathaBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#kathaBg)" />

      {/* Kathakali Face Mask Art */}
      <g transform="translate(85, 10)">
        {/* Large Kireetam (Crown) */}
        <circle cx="35" cy="28" r="28" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2" />
        <circle cx="35" cy="28" r="22" fill="#DC2626" />
        <circle cx="35" cy="28" r="14" fill="#059669" />

        {/* White Chutti (Ridge Frame around face) */}
        <path d="M 12 55 Q 35 105 58 55 Z" fill="#FFFFFF" />

        {/* Green Face Paint (Paccha) */}
        <path d="M 16 55 Q 35 98 54 55 Z" fill="#10B981" />

        {/* Expressive Red Eyes */}
        <ellipse cx="26" cy="62" rx="7" ry="4" fill="#FFFFFF" />
        <circle cx="26" cy="62" r="3" fill="#DC2626" />
        <ellipse cx="44" cy="62" rx="7" ry="4" fill="#FFFFFF" />
        <circle cx="44" cy="62" r="3" fill="#DC2626" />

        {/* Black Eyebrows & White Knob (Chutti Nayyam) */}
        <path d="M 18 56 Q 26 50 34 57" stroke="#1E1B4B" strokeWidth="2.5" fill="none" />
        <path d="M 36 57 Q 44 50 52 56" stroke="#1E1B4B" strokeWidth="2.5" fill="none" />
        <circle cx="35" cy="66" r="3" fill="#FFFFFF" />

        {/* Red Lips */}
        <path d="M 28 80 Q 35 88 42 80 Z" fill="#DC2626" />
      </g>
    </svg>
  )
}

// 6. Holi Colors Thumbnail
export function ThumbnailHoli() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="holiBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="33%" stopColor="#8B5CF6" />
          <stop offset="66%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#holiBg)" />

      {/* Powder Explosions / Gulal Clouds */}
      <circle cx="60" cy="50" r="35" fill="#F43F5E" opacity="0.6" />
      <circle cx="120" cy="70" r="45" fill="#FBBF24" opacity="0.6" />
      <circle cx="170" cy="45" r="38" fill="#06B6D4" opacity="0.6" />

      {/* Joyful People Playing Holi */}
      <g transform="translate(85, 30)">
        <circle cx="35" cy="30" r="10" fill="#FEF3C7" />
        <circle cx="30" cy="28" r="3" fill="#EC4899" />
        <circle cx="40" cy="32" r="3" fill="#3B82F6" />
        <path d="M 25 42 L 15 90 H 55 L 45 42 Z" fill="#FFFFFF" opacity="0.8" />
        <circle cx="35" cy="60" r="8" fill="#10B981" />
        <circle cx="28" cy="50" r="6" fill="#F43F5E" />
      </g>
    </svg>
  )
}

// 7. Famous Temples Thumbnail
export function ThumbnailTemples() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="templeBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#templeBg)" />

      {/* Sun behind temple */}
      <circle cx="120" cy="65" r="35" fill="#FEF3C7" opacity="0.7" />

      {/* Dravidian Temple Gopuram Tower */}
      <g transform="translate(70, 15)">
        {/* Tier 1 Base */}
        <rect x="10" y="85" width="80" height="25" fill="#92400E" stroke="#FEF3C7" strokeWidth="1" />
        <rect x="35" y="92" width="30" height="18" rx="9" fill="#451A03" />

        {/* Tier 2 */}
        <rect x="18" y="65" width="64" height="20" fill="#B45309" stroke="#FEF3C7" strokeWidth="1" />

        {/* Tier 3 */}
        <rect x="25" y="48" width="50" height="17" fill="#D97706" stroke="#FEF3C7" strokeWidth="1" />

        {/* Tier 4 Top Cap */}
        <path d="M 30 48 Q 50 25 70 48 Z" fill="#F59E0B" />
        {/* Kalasam Spire Ornaments */}
        <circle cx="40" cy="22" r="3" fill="#FEF3C7" />
        <circle cx="50" cy="20" r="4" fill="#FEF3C7" />
        <circle cx="60" cy="22" r="3" fill="#FEF3C7" />
      </g>
    </svg>
  )
}

// 8. Classical Music Thumbnail
export function ThumbnailClassicalMusic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 135" fill="none" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="musicBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#musicBg)" />

      {/* Glowing Warm Light */}
      <circle cx="120" cy="65" r="50" fill="#F59E0B" opacity="0.25" />

      {/* Sitar / Veena */}
      <g transform="translate(25, 20)">
        {/* Neck */}
        <line x1="30" y1="90" x2="150" y2="25" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
        <line x1="30" y1="88" x2="150" y2="23" stroke="#FEF3C7" strokeWidth="1.5" />
        {/* Sound Resonator Gourd */}
        <ellipse cx="30" cy="90" rx="22" ry="18" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <ellipse cx="30" cy="90" rx="14" ry="10" fill="#451A03" />
      </g>

      {/* Tabla & Dagga Pair */}
      <g transform="translate(145, 60)">
        {/* Bayan (Left Bass Drum) */}
        <ellipse cx="22" cy="18" rx="18" ry="10" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
        <path d="M 4 18 L 8 48 A 14 8 0 0 0 36 48 L 40 18 Z" fill="#92400E" />
        <circle cx="22" cy="18" r="6" fill="#1E1B4B" />

        {/* Dayan (Right Wood Drum) */}
        <g transform="translate(35, 10)">
          <ellipse cx="16" cy="14" rx="14" ry="7" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          <path d="M 2 14 L 5 44 A 11 6 0 0 0 27 44 L 30 14 Z" fill="#78350F" />
          <circle cx="16" cy="14" r="4.5" fill="#1E1B4B" />
        </g>
      </g>
    </svg>
  )
}

// 9. Water Drop Mascot for Screen Time Tip
export function WaterDropMascot() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="drop-shadow-md select-none">
      {/* Water Drop Body */}
      <path
        d="M 50 10 C 25 40 15 60 15 72 C 15 90 30 95 50 95 C 70 95 85 90 85 72 C 85 60 75 40 50 10 Z"
        fill="#38BDF8"
        stroke="#0284C7"
        strokeWidth="3"
      />
      {/* Shiny Highlight */}
      <path
        d="M 40 25 C 28 45 25 58 25 70"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
        fill="none"
      />

      {/* Cute Face */}
      <circle cx="38" cy="62" r="4" fill="#1E1B4B" />
      <circle cx="36.5" cy="60.5" r="1.5" fill="white" />
      <circle cx="62" cy="62" r="4" fill="#1E1B4B" />
      <circle cx="60.5" cy="60.5" r="1.5" fill="white" />

      {/* Cheeks */}
      <circle cx="30" cy="67" r="4" fill="#F472B6" opacity="0.6" />
      <circle cx="70" cy="67" r="4" fill="#F472B6" opacity="0.6" />

      {/* Happy Big Smile */}
      <path d="M 42 68 Q 50 78 58 68 Z" fill="#EF4444" />

      {/* Holding Water Glass */}
      <g transform="translate(68, 62)">
        <rect x="0" y="0" width="12" height="18" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <rect x="1" y="5" width="10" height="11" fill="#38BDF8" />
      </g>
    </svg>
  )
}

// ── Generic Colorful SVG Thumbnail Component for Category Cards ─────────────
export function CategoryThumbnail({ emoji, title, bgGradient }: { emoji: string; title: string; bgGradient: string }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-3 relative overflow-hidden select-none ${bgGradient}`}>
      <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="text-4xl mb-1 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
        {emoji}
      </div>
      <div className="text-[11px] font-black text-white text-center leading-tight line-clamp-1 opacity-90">
        {title}
      </div>
    </div>
  )
}

