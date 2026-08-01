import { useState } from 'react'
import {
  ALL_REWARD_VIDEOS,
  VIDEO_CATEGORIES,
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
  CategoryThumbnail,
} from './RewardVideoThumbnails'
import { VideoPlayerModal } from './VideoPlayerModal'
import { useApp } from '../contexts/AppContext'
import { AIRecommendationCard } from './AIRecommendationCard'

interface RewardVideosProps {
  onScoreUpdate?: (stars: number) => void
}

export function RewardVideos({ onScoreUpdate }: RewardVideosProps) {
  const { addStars, logReward } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [lockedNotice, setLockedNotice] = useState<VideoItem | null>(null)

  // Persisted completed videos & watch progress
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('reinforce_completed_videos') || localStorage.getItem('theraboost_completed_videos')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('reinforce_video_progress') || localStorage.getItem('theraboost_video_progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const handleUpdateProgress = (videoId: string, progress: number) => {
    setVideoProgressMap((prev) => {
      const next = { ...prev, [videoId]: Math.max(prev[videoId] || 0, progress) }
      try {
        localStorage.setItem('reinforce_video_progress', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const handleVideoCompleted = (video: VideoItem) => {
    if (!completedVideoIds.includes(video.id)) {
      const updated = [...completedVideoIds, video.id]
      setCompletedVideoIds(updated)
      try {
        localStorage.setItem('reinforce_completed_videos', JSON.stringify(updated))
      } catch {}

      // Log reward event in central engine (dedup, stats, reward history)
      logReward({
        videoId: video.id,
        title: video.title,
        category: video.category as import('../types').RewardHistoryEntry['category'],
        starsEarned: video.rewardStars,
        watchCompletion: 100,
        timestamp: new Date().toISOString(),
      })

      addStars(video.rewardStars)
      if (onScoreUpdate) onScoreUpdate(video.rewardStars)
    }
  }

  const filteredVideos =
    selectedCategory === 'All'
      ? ALL_REWARD_VIDEOS
      : ALL_REWARD_VIDEOS.filter((v) => v.category === selectedCategory)

  const renderThumbnail = (video: VideoItem) => {
    switch (video.thumbnailType) {
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
      case 'animals_elephant':
        return <CategoryThumbnail emoji="🐘" title="Meet Elephant" bgGradient="bg-gradient-to-tr from-emerald-700 to-teal-500" />
      case 'animals_wild':
        return <CategoryThumbnail emoji="🦁" title="Wild Animals" bgGradient="bg-gradient-to-tr from-amber-700 to-yellow-600" />
      case 'animals_farm':
        return <CategoryThumbnail emoji="🐮" title="Farm Animals" bgGradient="bg-gradient-to-tr from-green-600 to-lime-500" />
      case 'nature_trees':
        return <CategoryThumbnail emoji="🌳" title="Save Trees" bgGradient="bg-gradient-to-tr from-emerald-800 to-green-500" />
      case 'nature_earth':
        return <CategoryThumbnail emoji="🏔️" title="Mother Earth" bgGradient="bg-gradient-to-tr from-cyan-700 to-blue-500" />
      case 'nature_ocean':
        return <CategoryThumbnail emoji="🐬" title="Ocean Life" bgGradient="bg-gradient-to-tr from-blue-800 to-indigo-500" />
      case 'rhymes_abc':
        return <CategoryThumbnail emoji="🔤" title="ABC Song" bgGradient="bg-gradient-to-tr from-rose-600 to-pink-500" />
      case 'rhymes_star':
        return <CategoryThumbnail emoji="⭐" title="Twinkle Star" bgGradient="bg-gradient-to-tr from-indigo-900 to-purple-700" />
      case 'rhymes_bus':
        return <CategoryThumbnail emoji="🚌" title="Wheels Bus" bgGradient="bg-gradient-to-tr from-amber-500 to-yellow-400" />
      case 'edu_numbers':
        return <CategoryThumbnail emoji="🔢" title="Numbers 1-10" bgGradient="bg-gradient-to-tr from-purple-700 to-indigo-600" />
      case 'edu_shapes':
        return <CategoryThumbnail emoji="🔺" title="Colors & Shapes" bgGradient="bg-gradient-to-tr from-fuchsia-600 to-purple-500" />
      case 'edu_planets':
        return <CategoryThumbnail emoji="🪐" title="Solar System" bgGradient="bg-gradient-to-tr from-slate-900 to-indigo-900" />
      case 'moti_habits':
        return <CategoryThumbnail emoji="🪥" title="Good Habits" bgGradient="bg-gradient-to-tr from-teal-600 to-cyan-500" />
      case 'moti_try':
        return <CategoryThumbnail emoji="🏆" title="Never Give Up" bgGradient="bg-gradient-to-tr from-amber-600 to-orange-500" />
      case 'moti_kindness':
        return <CategoryThumbnail emoji="🤝" title="Sharing & Kindness" bgGradient="bg-gradient-to-tr from-pink-600 to-rose-400" />
      default:
        return <CategoryThumbnail emoji="🎬" title={video.title} bgGradient="bg-gradient-to-tr from-purple-600 to-indigo-600" />
    }
  }

  const handleCardClick = (video: VideoItem) => {
    if (video.isLocked) {
      setLockedNotice(video)
    } else {
      setActiveVideo(video)
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-5 select-none min-h-0 overflow-y-auto pr-1">
      {/* ── 1. Top Header Section ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
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
              Watch fun educational & cultural videos to earn stars!
            </p>
          </div>
        </div>

        {/* Top Right Stats Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-50 border border-purple-200 text-purple-900 font-extrabold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2">
            <span>⭐</span>
            <span>{completedVideoIds.length} / {ALL_REWARD_VIDEOS.length} Videos Completed</span>
          </div>
        </div>
      </div>

      {/* ── Smart AI Recommendation Banner ── */}
      <AIRecommendationCard />

      {/* ── 2. Explore & Learn Hero Banner ──────────────────────── */}
      <div className="bg-gradient-to-r from-amber-100/80 via-amber-50 to-orange-100/90 border border-amber-200/90 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between shadow-xs shrink-0">
        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl font-black text-purple-950 tracking-tight mb-1.5">
            Explore. Learn. Earn Stars!
          </h2>
          <p className="text-gray-700 text-xs font-bold leading-relaxed">
            Watch short videos on Indian Culture, Animals, Nature, Rhymes, Learning & Motivation! 🇮🇳 🐘 🌿 🎵
          </p>
        </div>

        <div className="relative z-10 shrink-0 transform scale-95 translate-x-2">
          <HeroBannerIllustration />
        </div>
      </div>

      {/* ── 3. Filter Category Pills ────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-900 text-base">Video Categories</h3>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {VIDEO_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-purple-50/80 hover:bg-purple-100/80 text-purple-700 border border-purple-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 4. Main Videos Grid ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 shrink-0">
        <h3 className="font-black text-gray-900 text-base">
          {selectedCategory === 'All' ? 'All Reward Videos' : selectedCategory} ({filteredVideos.length})
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {filteredVideos.map((video) => {
            const isCompleted = completedVideoIds.includes(video.id)
            const progress = videoProgressMap[video.id] || (isCompleted ? 100 : 0)

            return (
              <div
                key={video.id}
                onClick={() => handleCardClick(video)}
                className={`bg-white rounded-2xl overflow-hidden border p-2 shadow-2xs hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between relative ${
                  isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-purple-100/90'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative h-32 w-full overflow-hidden bg-gray-900 rounded-xl mb-2">
                  {renderThumbnail(video)}

                  {/* Lock Overlay */}
                  {video.isLocked ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg mb-1">
                        🔒
                      </div>
                      <span className="text-[10px] font-black tracking-wide text-amber-300">LOCKED</span>
                    </div>
                  ) : (
                    /* Center Overlay Play Icon */
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 transition-all shadow-md">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Watched ✓ Badge (Req 9) */}
                  {isCompleted && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 z-10">
                      ✓ Watched
                    </div>
                  )}

                  {/* Duration Badge Bottom Right */}
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {video.duration}
                  </div>

                  {/* Watch Progress Bar */}
                  {progress > 0 && (
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gray-700/60">
                      <div
                        className="h-full bg-purple-500 rounded-r-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Card Footer Details */}
                <div className="p-1 flex flex-col justify-between flex-1">
                  <h4 className="font-black text-xs text-gray-900 truncate mb-1 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <span className="truncate max-w-[110px]">{video.category}</span>
                    <div className={`flex items-center gap-1 font-black text-xs ${isCompleted ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isCompleted ? (
                        <span>✓ Done</span>
                      ) : (
                        <>
                          <span>⭐</span>
                          <span>+{video.rewardStars}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Video Modal Player Component */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onCompleted={handleVideoCompleted}
          isAlreadyCompleted={completedVideoIds.includes(activeVideo.id)}
          onUpdateProgress={handleUpdateProgress}
        />
      )}

      {/* Locked Video Notice Modal */}
      {lockedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-scaleUp border border-purple-100">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-3">
              🔒
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">{lockedNotice.title} is Locked</h3>
            <p className="text-xs text-gray-600 font-semibold mb-5 leading-relaxed">
              {lockedNotice.unlockRequirement || 'Complete more speech practice cards to unlock this special reward video!'}
            </p>
            <button
              onClick={() => setLockedNotice(null)}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs cursor-pointer shadow-md transition-transform active:scale-95"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
