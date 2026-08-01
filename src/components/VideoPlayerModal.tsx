import { useState, useRef, useEffect } from 'react'
import type { VideoItem } from './RewardVideosData'

// Detect YouTube URLs and extract video ID
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  return match ? match[1] : null
}

// Convert any YouTube URL to the embed URL format
function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
}

interface VideoPlayerModalProps {
  video: VideoItem
  onClose: () => void
  onCompleted: (video: VideoItem) => void
  isAlreadyCompleted: boolean
  onUpdateProgress: (videoId: string, progress: number) => void
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const mStr = mins < 10 ? `0${mins}` : `${mins}`
  const sStr = secs < 10 ? `0${secs}` : `${secs}`
  return `${mStr}:${sStr}`
}

export function VideoPlayerModal({
  video,
  onClose,
  onCompleted,
  isAlreadyCompleted,
  onUpdateProgress,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const youtubeId = getYouTubeId(video.videoUrl)
  const isYoutube = youtubeId !== null

  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasTriggeredReward, setHasTriggeredReward] = useState(isAlreadyCompleted)
  const [showRewardAnimation, setShowRewardAnimation] = useState(false)

  // Sync volume with HTML5 video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Video Time Update & Progress tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 0
    setCurrentTime(cur)
    if (dur > 0) {
      setDuration(dur)
      const percent = Math.min(100, Math.floor((cur / dur) * 100))
      onUpdateProgress(video.id, percent)

      // Mark completed when reaching 95% or end
      if (percent >= 95 && !hasTriggeredReward) {
        setHasTriggeredReward(true)
        setShowRewardAnimation(true)
        onCompleted(video)
      }
    }
  }

  // Loaded Metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setHasError(false)
      videoRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  // Replay
  const handleReplay = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  // Seek bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value)
    setCurrentTime(targetTime)
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime
    }
  }

  // Volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (val === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn select-none">
      <div
        ref={containerRef}
        className="bg-gray-950 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col border border-purple-500/20 animate-scaleUp relative"
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/30">
              {video.category}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white leading-tight line-clamp-1">
                {video.title}
              </h2>
              <p className="text-[11px] text-gray-400 font-medium truncate max-w-xs sm:max-w-md">
                {video.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-rose-600 text-gray-300 hover:text-white flex items-center justify-center font-black text-base transition-colors cursor-pointer shrink-0 ml-2"
            title="Close Player"
          >
            ✕
          </button>
        </div>

        {/* Video Player Display Screen */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Requirement 13: Error Display */}
          {hasError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-900 inset-0 absolute">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mb-3">
                ⚠️
              </div>
              <h3 className="text-base font-black text-white mb-1">
                Video unavailable. Please try again later.
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mb-4">
                The video stream could not be loaded or is currently offline.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setHasError(false)
                    if (videoRef.current) videoRef.current.load()
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  🔄 Retry
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : isYoutube ? (
            /* ── YouTube Embed ── */
            <>
              <iframe
                src={getYouTubeEmbedUrl(youtubeId!)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                title={video.title}
                onLoad={() => {
                  // Mark completed after 5 seconds for YouTube (no JS API access)
                  if (!hasTriggeredReward) {
                    setTimeout(() => {
                      setHasTriggeredReward(true)
                      setShowRewardAnimation(true)
                      onCompleted(video)
                      onUpdateProgress(video.id, 100)
                    }, 5000)
                  }
                }}
              />
              {showRewardAnimation && (
                <div className="absolute inset-0 bg-purple-950/75 backdrop-blur-xs flex flex-col items-center justify-center animate-fadeIn z-20">
                  <div className="text-6xl animate-bounce mb-2">✅</div>
                  <h3 className="text-xl font-black text-white">Reward Enjoyed!</h3>
                  <p className="text-xs font-bold text-amber-300 mt-1">
                    Hope you enjoyed your reward. Let's continue learning!
                  </p>
                  <button
                    onClick={() => setShowRewardAnimation(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs cursor-pointer shadow-lg"
                  >
                    Continue Learning
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                src={video.videoUrl}
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                  setIsPlaying(false)
                  if (!hasTriggeredReward) {
                    setHasTriggeredReward(true)
                    setShowRewardAnimation(true)
                    onCompleted(video)
                  }
                }}
                onError={() => setHasError(true)}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {showRewardAnimation && (
                <div className="absolute inset-0 bg-purple-950/75 backdrop-blur-xs flex flex-col items-center justify-center animate-fadeIn z-20">
                  <div className="text-6xl animate-bounce mb-2">✅</div>
                  <h3 className="text-xl font-black text-white">Reward Enjoyed!</h3>
                  <p className="text-xs font-bold text-amber-300 mt-1">
                    Hope you enjoyed your reward. Let's continue learning!
                  </p>
                  <button
                    onClick={() => setShowRewardAnimation(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs cursor-pointer shadow-lg"
                  >
                    Continue Learning
                  </button>
                </div>
              )}

              {/* Center Overlay Play/Pause Button on Hover */}
              {!isPlaying && !hasError && !showRewardAnimation && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center text-3xl shadow-xl hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              )}

              {/* Custom Bottom Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition-opacity z-10">
                {/* Seek Progress Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-700 accent-purple-500 rounded-lg cursor-pointer hover:h-2.5 transition-all"
                  />
                </div>

                {/* Control Buttons & Timestamp */}
                <div className="flex items-center justify-between text-white text-xs font-bold">
                  {/* Left Controls: Play/Pause, Replay, Time */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm cursor-pointer transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>

                    <button
                      onClick={handleReplay}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm cursor-pointer transition-colors"
                      title="Replay from start"
                    >
                      🔄
                    </button>

                    <span className="text-gray-300 text-[11px] sm:text-xs font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls: Volume Slider, Mute, Fullscreen */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg">
                      <button
                        onClick={toggleMute}
                        className="text-sm cursor-pointer hover:opacity-80"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-14 sm:w-20 h-1 bg-gray-600 accent-purple-400 rounded-lg cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm cursor-pointer transition-colors"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? '❐' : '⛶'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Rewards Section */}
        <div className="p-4 sm:p-5 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
              🎬
            </div>
            <div>
              <div className="font-black text-white text-xs sm:text-sm">
                Reward Video
              </div>
              <div className="text-gray-400 text-[11px] font-semibold">
                Enjoy your reward! Keep practicing to unlock more.
              </div>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
              hasTriggeredReward
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500 text-white shadow-md'
            }`}
          >
            {hasTriggeredReward ? '✓ Watched' : 'Enjoy!'}
          </div>
        </div>
      </div>
    </div>
  )
}
