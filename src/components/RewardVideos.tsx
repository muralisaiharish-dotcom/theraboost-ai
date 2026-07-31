import { useState } from 'react'
import {
  CONTINUE_WATCHING_VIDEOS,
  MORE_CULTURE_VIDEOS,
  VideoItem,
} from './RewardVideosData'
import {
  HeroBannerIllustration,
  ThumbnailIncredibleIndia,
  ThumbnailFolkDances,
  ThumbnailDiwali,
  ThumbnailBharatanatyam,
  ThumbnailKathakali,
  ThumbnailHoli,
  ThumbnailTemples,
  ThumbnailClassicalMusic,
} from './RewardVideoThumbnails'

interface RewardVideosProps {
  onScoreUpdate?: (stars: number) => void
}

export function RewardVideos({ onScoreUpdate }: RewardVideosProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasClaimedStars, setHasClaimedStars] = useState(false)

  const filterCategories = [
    'All',
    'Festivals',
    'Dance & Music',
    'History',
    'Monuments',
    'Stories',
    'Languages',
  ]

  const filteredMoreVideos =
    selectedCategory === 'All'
      ? MORE_CULTURE_VIDEOS
      : MORE_CULTURE_VIDEOS.filter((v) => v.category === selectedCategory)

  const renderThumbnail = (type: VideoItem['thumbnailType']) => {
    switch (type) {
      case 'incredible_india':
        return <ThumbnailIncredibleIndia />
      case 'folk_dances':
        return <ThumbnailFolkDances />
      case 'diwali':
        return <ThumbnailDiwali />
      case 'bharatanatyam':
        return <ThumbnailBharatanatyam />
      case 'kathakali':
        return <ThumbnailKathakali />
      case 'holi':
        return <ThumbnailHoli />
      case 'temples':
        return <ThumbnailTemples />
      case 'classical_music':
        return <ThumbnailClassicalMusic />
      default:
        return <ThumbnailIncredibleIndia />
    }
  }

  const handleOpenVideo = (video: VideoItem) => {
    setActiveVideo(video)
    setIsPlaying(true)
    setHasClaimedStars(false)
  }

  const handleClaimReward = () => {
    if (activeVideo && !hasClaimedStars) {
      setHasClaimedStars(true)
      if (onScoreUpdate) onScoreUpdate(activeVideo.rewardStars)
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-5 select-none min-h-0 overflow-y-auto pr-1">
      {/* ── 1. Top Header Section ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          {/* Play Icon Circle */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-black text-purple-950 tracking-tight leading-none">
              Reward Videos
            </h1>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Watch fun videos and enjoy Indian culture!
            </p>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3">
          {/* Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 font-extrabold text-xs px-4 py-2.5 pr-8 rounded-2xl cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="Indian Culture">Indian Culture</option>
              <option value="Moral Stories">Moral Stories</option>
              <option value="Fun Science">Fun Science</option>
              <option value="Music & Rhymes">Music & Rhymes</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-700 text-xs font-black">
              ⌄
            </div>
          </div>

          {/* Filter Sliders Button */}
          <button className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 hover:bg-purple-100 transition-all cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── 2. Explore. Learn. Be Proud! Hero Banner ──────────────────────── */}
      <div className="bg-gradient-to-r from-amber-100/80 via-amber-50 to-orange-100/90 border border-amber-200/90 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between shadow-xs shrink-0">
        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl font-black text-purple-950 tracking-tight mb-1.5">
            Explore. Learn. Be Proud!
          </h2>
          <p className="text-gray-700 text-xs font-bold leading-relaxed">
            Watch amazing videos about our incredible Indian culture. 🇮🇳 📜 ✨
          </p>
        </div>

        {/* Hero Artwork Graphic */}
        <div className="relative z-10 shrink-0 transform scale-95 translate-x-2">
          <HeroBannerIllustration />
        </div>
      </div>

      {/* ── 3. Continue Watching Section ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-900 text-base">Continue Watching</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-extrabold hover:underline cursor-pointer">
            View All
          </button>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-4 gap-4">
          {CONTINUE_WATCHING_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="bg-white rounded-2xl overflow-hidden border border-purple-100/90 shadow-2xs hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-32 w-full overflow-hidden bg-gray-900">
                {renderThumbnail(video.thumbnailType)}

                {/* Center Overlay Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 transition-all shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge Bottom Right */}
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {video.duration}
                </div>

                {/* Bottom Progress Bar */}
                {video.progress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-700/60">
                    <div
                      className="h-full bg-purple-600 rounded-r-full"
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Card Footer Details */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <h4 className="font-black text-xs text-gray-900 truncate mb-1 group-hover:text-purple-700 transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span className="truncate max-w-[120px]">{video.subtitle}</span>
                  <span className="text-amber-400 text-xs">⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. More Indian Culture Videos Section ─────────────────────────── */}
      <div className="flex flex-col gap-3 shrink-0">
        <h3 className="font-black text-gray-900 text-base">More Indian Culture Videos</h3>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-purple-50/80 hover:bg-purple-100/80 text-purple-700 border border-purple-100'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-4 gap-4">
          {filteredMoreVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="bg-white rounded-2xl overflow-hidden border border-purple-100/90 shadow-2xs hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-32 w-full overflow-hidden bg-gray-900">
                {renderThumbnail(video.thumbnailType)}

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 transition-all shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {video.duration}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <h4 className="font-black text-xs text-gray-900 truncate mb-1 group-hover:text-purple-700 transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span className="truncate max-w-[110px]">{video.subtitle}</span>
                  <div className="flex items-center gap-1 font-black text-amber-600 text-xs">
                    <span>⭐</span>
                    <span>{video.rewardStars}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Interactive Video Modal Player ────────────────────────────── */}
      {activeVideo && (
        <div className="fixed inset-0 bg-purple-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn select-none">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-purple-100 shadow-2xl flex flex-col animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-purple-50/80 border-b border-purple-100 flex items-center justify-between">
              <div>
                <h3 className="font-black text-purple-950 text-base leading-none mb-1">
                  {activeVideo.title}
                </h3>
                <span className="text-gray-500 text-xs font-semibold">
                  {activeVideo.subtitle}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-600 flex items-center justify-center font-black text-sm border border-gray-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Display Screen */}
            <div className="relative aspect-video w-full bg-gray-950 flex items-center justify-center overflow-hidden">
              {renderThumbnail(activeVideo.thumbnailType)}

              {/* Video Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center text-2xl shadow-xl transition-transform hover:scale-110 cursor-pointer mb-2"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <span className="text-white/80 font-bold text-xs">
                  {isPlaying ? 'Playing Video...' : 'Paused'}
                </span>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-2">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-purple-500 rounded-full w-[65%]" />
                </div>

                <div className="flex items-center justify-between text-white text-xs font-bold">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                    <span>03:15 / {activeVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔊</span>
                    <span>⛶</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Rewards Claim Footer */}
            <div className="p-5 bg-white flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-black text-gray-900 text-sm">Earn 10 Stars</div>
                  <div className="text-gray-400 text-xs font-semibold">Watch till the end to unlock!</div>
                </div>
              </div>

              <button
                onClick={handleClaimReward}
                disabled={hasClaimedStars}
                className={`px-6 py-2.5 rounded-2xl font-extrabold text-xs transition-all cursor-pointer ${
                  hasClaimedStars
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                {hasClaimedStars ? '✓ Stars Claimed!' : 'Claim +10 Stars ⭐'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
