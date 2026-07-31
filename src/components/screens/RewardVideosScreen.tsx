import { useState } from 'react'
import {
  ALL_REWARD_VIDEOS,
  VIDEO_CATEGORIES,
  VideoItem,
} from '../RewardVideosData'
import {
  ThumbnailIncredibleIndia,
  ThumbnailFolkDances,
  ThumbnailDiwali,
  ThumbnailBharatanatyam,
  ThumbnailKathakali,
  ThumbnailHoli,
  ThumbnailTemples,
  ThumbnailClassicalMusic,
  CategoryThumbnail,
} from '../RewardVideoThumbnails'
import { VideoPlayerModal } from '../VideoPlayerModal'
import { useApp } from '../../contexts/AppContext'
import { AIRecommendationCard } from '../AIRecommendationCard'

export function RewardVideosScreen() {
  const { state, logReward, unlockVideo } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [lockedNotice, setLockedNotice] = useState<VideoItem | null>(null)

  // Persisted completed videos & watch progress
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('theraboost_completed_videos')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('theraboost_video_progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const handleUpdateProgress = (videoId: string, progress: number) => {
    setVideoProgressMap((prev) => {
      const next = { ...prev, [videoId]: Math.max(prev[videoId] || 0, progress) }
      try {
        localStorage.setItem('theraboost_video_progress', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const handleVideoCompleted = (video: VideoItem) => {
    if (!completedVideoIds.includes(video.id)) {
      const updated = [...completedVideoIds, video.id]
      setCompletedVideoIds(updated)
      try {
        localStorage.setItem('theraboost_completed_videos', JSON.stringify(updated))
      } catch {}

      // Log reward event in central engine (dedup, stats, reward history)
      const durationParts = video.duration.split(':')
      const durationSecs = durationParts.length === 2 ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]) : 0

      logReward({
        videoId: video.id,
        title: video.title,
        category: video.category as import('../../types').RewardHistoryEntry['category'],
        starsEarned: 0,
        watchDuration: durationSecs,
        watchCompletion: 100,
        timestamp: new Date().toISOString(),
      })
    }
  }

  const handleUnlock = () => {
    if (lockedNotice && state.stats.starsEarned >= lockedNotice.unlockCost) {
      unlockVideo(lockedNotice.id, lockedNotice.unlockCost)
      setLockedNotice(null)
      setActiveVideo(lockedNotice) // Play immediately after unlocking
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

  const handleCardClick = (video: VideoItem, isLocked: boolean) => {
    if (isLocked) {
      setLockedNotice(video)
    } else {
      setActiveVideo(video)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-xl shadow-md">🎬</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Reward Videos</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Watch fun educational videos & earn stars!</p>
        </div>
      </div>

      {/* Smart AI Recommended Reward */}
      <AIRecommendationCard compact />

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {VIDEO_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat.name
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-purple-700 border border-purple-100 hover:bg-purple-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-black text-gray-900">
            {selectedCategory === 'All' ? 'All Reward Videos' : selectedCategory} ({filteredVideos.length})
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {state.stats.starsEarned} ⭐
            </span>
            <span className="text-[10px] font-bold text-gray-400">
              {completedVideoIds.length} / {ALL_REWARD_VIDEOS.length} Completed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredVideos.map((video) => {
            const isCompleted = completedVideoIds.includes(video.id)
            const progress = videoProgressMap[video.id] || (isCompleted ? 100 : 0)
            const isLocked = !state.unlockedVideoIds.includes(video.id)

            return (
              <div
                key={video.id}
                onClick={() => handleCardClick(video, isLocked)}
                className={`bg-white rounded-2xl border p-2 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2 bg-gray-900">
                  {renderThumbnail(video)}

                  {/* Lock Overlay */}
                  {isLocked ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base mb-0.5">
                        🔒
                      </div>
                      <span className="text-[9px] font-black tracking-wide text-amber-300">LOCKED</span>
                    </div>
                  ) : (
                    /* Play Button Overlay */
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 group-hover:scale-110 transition-transform text-purple-700 flex items-center justify-center text-sm shadow-md">
                        ▶
                      </div>
                    </div>
                  )}

                  {/* Watched ✓ Badge (Req 9) */}
                  {isCompleted && (
                    <div className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 z-10">
                      ✓ Watched
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>

                  {/* Watch Progress Bar */}
                  {progress > 0 && !isLocked && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-700/60">
                      <div
                        className="h-full bg-purple-500 rounded-r-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-black text-xs text-gray-900 line-clamp-1 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-bold">
                    <span className="truncate max-w-[80px]">{video.category}</span>
                    <span className={`font-black ${isCompleted ? 'text-emerald-600' : isLocked ? 'text-amber-500' : 'text-purple-600'}`}>
                      {isCompleted ? '✓ Watched' : isLocked ? `Cost: ${video.unlockCost} ⭐` : 'Unlocked'}
                    </span>
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
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-3">
              🔒
            </div>
            
            {state.stats.starsEarned >= lockedNotice.unlockCost ? (
              <>
                <h3 className="text-base font-black text-gray-900 mb-1">Unlock {lockedNotice.title}?</h3>
                <p className="text-xs text-gray-600 font-semibold mb-4 leading-relaxed">
                  Spend <strong className="text-amber-500">{lockedNotice.unlockCost} ⭐</strong> to unlock this video permanently. You currently have {state.stats.starsEarned} ⭐.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setLockedNotice(null)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-extrabold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs cursor-pointer shadow-md"
                  >
                    Unlock
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base font-black text-gray-900 mb-1">{lockedNotice.title} is Locked</h3>
                <p className="text-xs text-gray-600 font-semibold mb-4 leading-relaxed">
                  You need <strong className="text-amber-500">{lockedNotice.unlockCost - state.stats.starsEarned} more ⭐</strong> to unlock this video! Keep completing therapy activities.
                </p>
                <button
                  onClick={() => setLockedNotice(null)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs cursor-pointer shadow-md"
                >
                  Got It!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
