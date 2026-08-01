interface HomeProps {
  onNavigate: (nav: string) => void
  userName: string
}

export function Home({ onNavigate, userName }: HomeProps) {
  return (
    <div className="flex-1 flex flex-col gap-5 min-w-0 select-none">
      {/* ── Top Header Greeting Banner ────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-purple-950 flex items-center gap-2">
            Hi {userName}! <span className="animate-bounce inline-block">👋</span>
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">
            Let's make today a great learning day!
          </p>
        </div>
      </div>

      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-100 p-6 border border-purple-100 shadow-xs flex items-center justify-between min-h-[190px]">
        {/* Background Decorative SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none">
            <circle cx="50" cy="150" r="100" fill="#E9D5FF" opacity="0.5" />
            <circle cx="450" cy="30" r="80" fill="#FBCFE8" opacity="0.5" />
            <path d="M0 160 Q 200 120 400 170 T 600 150 L 600 200 L 0 200 Z" fill="#D8B4FE" opacity="0.3" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2">
            Every word you speak <br />
            <span className="text-purple-700">is a step forward!</span>
          </h2>
          <p className="text-xs text-gray-600 font-semibold mb-4 flex items-center gap-2">
            Practice, play and learn with ReinforceAI
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-800 text-[10px] font-black">
              🎙️ |||•|||
            </span>
          </p>
          <button
            onClick={() => onNavigate('Speech Practice')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg shadow-purple-400/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Let's Begin</span>
            <span className="text-sm">→</span>
          </button>
        </div>

        {/* Hero Mascot Illustration */}
        <div className="relative z-10 shrink-0 hidden sm:flex items-center justify-center pr-4">
          <div className="w-36 h-36 relative flex items-center justify-center">
            {/* Boy Mascot Illustration with microphone */}
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg">
              {/* Head */}
              <circle cx="80" cy="65" r="42" fill="#FED7AA" />
              {/* Hair */}
              <path d="M40 60 Q 40 25 80 22 Q 120 25 120 60 Q 110 35 80 32 Q 50 35 40 60 Z" fill="#3B0764" />
              {/* Eyes */}
              <circle cx="68" cy="62" r="5" fill="#1E1B4B" />
              <circle cx="92" cy="62" r="5" fill="#1E1B4B" />
              <circle cx="70" cy="60" r="1.5" fill="white" />
              <circle cx="94" cy="60" r="1.5" fill="white" />
              {/* Smile */}
              <path d="M72 75 Q 80 84 88 75" stroke="#9A3412" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Cheeks */}
              <ellipse cx="60" cy="68" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
              <ellipse cx="100" cy="68" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
              {/* Hoodie / Body */}
              <path d="M42 120 C 42 98 118 98 118 120 L 125 160 L 35 160 Z" fill="#7C3AED" />
              {/* Hoodie emblem */}
              <circle cx="80" cy="125" r="10" fill="#9333EA" />
              <text x="80" y="129" textAnchor="middle" fontSize="10">☁️</text>
              {/* Hand with Mic */}
              <rect x="105" y="90" width="10" height="24" rx="5" fill="#94A3B8" />
              <circle cx="110" cy="86" r="8" fill="#EC4899" />
              {/* Soundwaves */}
              <path d="M125 78 Q 130 86 125 94" stroke="#A855F7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M130 73 Q 138 86 130 99" stroke="#C084FC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Today's Activities Grid ───────────────────────────────────── */}
      <div>
        <h2 className="text-base font-black text-gray-900 mb-3">Today's Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Speech Practice */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-13 h-13 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl mb-3 shadow-md shadow-purple-300 group-hover:scale-110 transition-transform">
              🎙️
            </div>
            <h3 className="font-black text-gray-900 text-sm mb-1">Speech Practice</h3>
            <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
              Practice new words and sentences
            </p>
            <button
              onClick={() => onNavigate('Speech Practice')}
              className="mt-auto flex items-center gap-1.5 text-xs font-black text-purple-700 hover:text-purple-900 bg-white border border-purple-200 px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <span>Start</span>
              <span className="text-sm">→</span>
            </button>
          </div>

          {/* 2. Matching Games */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-13 h-13 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md shadow-emerald-300 group-hover:scale-110 transition-transform">
              🧩
            </div>
            <h3 className="font-black text-gray-900 text-sm mb-1">Matching Games</h3>
            <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
              Play fun games & boost memory
            </p>
            <button
              onClick={() => onNavigate('Matching Games')}
              className="mt-auto flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <span>Play</span>
              <span className="text-sm">→</span>
            </button>
          </div>

          {/* 3. Reward Videos */}
          <div className="bg-pink-50/70 border border-pink-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-13 h-13 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md shadow-pink-300 group-hover:scale-110 transition-transform">
              🎬
            </div>
            <h3 className="font-black text-gray-900 text-sm mb-1">Reward Videos</h3>
            <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
              Watch videos & earn exciting rewards
            </p>
            <button
              onClick={() => onNavigate('Reward Videos')}
              className="mt-auto flex items-center gap-1.5 text-xs font-black text-pink-700 hover:text-pink-900 bg-white border border-pink-200 px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <span>Watch</span>
              <span className="text-sm">→</span>
            </button>
          </div>

          {/* 4. My Progress */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-13 h-13 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md shadow-blue-300 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="font-black text-gray-900 text-sm mb-1">My Progress</h3>
            <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
              See how well you're doing
            </p>
            <button
              onClick={() => onNavigate('My Progress')}
              className="mt-auto flex items-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <span>View</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Continue Learning ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-black text-gray-900">Continue Learning</h2>
          <button
            onClick={() => onNavigate('Speech Practice')}
            className="text-xs font-black text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer hover:underline"
          >
            <span>View All</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="bg-white border border-purple-100 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl shrink-0">
                  🎙️
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xs">Speech Practice</h4>
                  <p className="text-[11px] text-gray-500 font-semibold">Let's practice 'Fruits Names'</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                In Progress
              </span>
            </div>
            {/* Progress Bar */}
            <div>
              <div className="flex justify-end text-[10px] font-black text-purple-600 mb-1">60%</div>
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0">
                  🧩
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xs">Matching Game</h4>
                  <p className="text-[11px] text-gray-500 font-semibold">Fruits & Colors Matching</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                In Progress
              </span>
            </div>
            {/* Progress Bar */}
            <div>
              <div className="flex justify-end text-[10px] font-black text-emerald-600 mb-1">40%</div>
              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-pink-100 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Thumbnail image placeholder */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-2xl text-white shrink-0 shadow-sm">
                🏰
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-gray-900 text-xs truncate">Reward Video</h4>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 shrink-0">
                    New
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-semibold truncate">Story of Krishna</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('Reward Videos')}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              Watch
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Motivation Banner ────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-100 border border-purple-100 rounded-3xl p-4 flex items-center gap-3 shadow-xs">
        <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
          ☁️
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-purple-950 text-xs">You're doing awesome, {userName}!</div>
          <div className="text-[11px] text-purple-700 font-semibold">
            Keep practicing and unlocking new achievements! ⭐
          </div>
        </div>
      </div>
    </div>
  )
}
