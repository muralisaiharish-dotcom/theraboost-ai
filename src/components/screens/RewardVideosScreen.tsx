import { useState } from 'react'
import {
  CONTINUE_WATCHING_VIDEOS,
  MORE_CULTURE_VIDEOS,
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
} from '../RewardVideoThumbnails'
import { useApp } from '../../contexts/AppContext'

export function RewardVideosScreen() {
  const { addStars } = useApp()
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
      addStars(activeVideo.rewardStars)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-xl shadow-md">🎬</div>
        <div>
          <h1 className="text-lg font-black text-gray-900">Reward Videos</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Watch fun cultural videos & earn stars!</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-purple-700 border border-purple-100 hover:bg-purple-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Continue Watching Section */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-2.5">Continue Watching</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {CONTINUE_WATCHING_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="w-48 bg-white rounded-2xl border border-gray-100 p-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                {renderThumbnail(video.thumbnailType)}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-purple-700 text-sm shadow-md">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs text-gray-900 line-clamp-1">{video.title}</h3>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-bold">
                  <span>{video.category}</span>
                  <span className="text-amber-600">+{video.rewardStars}⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Videos Grid */}
      <div>
        <h2 className="text-sm font-black text-gray-900 mb-2.5">Explore Culture & Learning</h2>
        <div className="grid grid-cols-2 gap-3">
          {filteredMoreVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="bg-white rounded-2xl border border-gray-100 p-2 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                {renderThumbnail(video.thumbnailType)}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-purple-700 text-sm shadow-md">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs text-gray-900 line-clamp-1">{video.title}</h3>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-bold">
                  <span>{video.category}</span>
                  <span className="text-amber-600 font-black">+{video.rewardStars}⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-scaleUp">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {renderThumbnail(activeVideo.thumbnailType)}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  {activeVideo.category}
                </span>
                <h2 className="text-base font-black text-gray-900 mt-1">{activeVideo.title}</h2>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{activeVideo.description}</p>
              </div>

              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎁</span>
                  <div>
                    <div className="text-xs font-black text-amber-900">Reward Available</div>
                    <div className="text-[10px] font-bold text-amber-700">Watch & claim {activeVideo.rewardStars} stars!</div>
                  </div>
                </div>
                <button
                  onClick={handleClaimReward}
                  disabled={hasClaimedStars}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    hasClaimedStars
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                  }`}
                >
                  {hasClaimedStars ? '✓ Claimed' : 'Claim ⭐'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
