import { useState, useRef, useEffect, useCallback } from 'react'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'
import type { MagicSymbolId, MagicSymbolConfig, MagicScanLog } from '../../types'
import { ALL_REWARD_VIDEOS, VideoItem } from '../RewardVideosData'
import { VideoPlayerModal } from '../VideoPlayerModal'

// ─── Magic Symbol Definitions ─────────────────────────────────────────────────
const MAGIC_SYMBOLS: (MagicSymbolConfig & { video: VideoItem })[] = [
  {
    id: 'star',     name: 'Star',       symbol: '⭐',
    xp: 20,  stars: 10,
    rewardText: '+20 XP · Star Magic Celebration',
    unlockedPerk: 'Star Reward Video',
    description: 'Boosts confidence with star power!',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    glowColor: '#F59E0B', video: ALL_REWARD_VIDEOS[0],
  },
  {
    id: 'smile',    name: 'Smile',      symbol: '😊',
    xp: 15,  stars: 8,
    rewardText: '+15 XP · Smile Happy Moments',
    unlockedPerk: 'Smile Reward Video',
    description: 'Sparks positive emotion.',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    glowColor: '#EAB308', video: ALL_REWARD_VIDEOS[1],
  },
  {
    id: 'music',    name: 'Music Note', symbol: '🎵',
    xp: 25,  stars: 12,
    rewardText: '+25 XP · Music Rhythmic Fun',
    unlockedPerk: 'Music Reward Video',
    description: 'Activates music rewards.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    glowColor: '#06B6D4', video: ALL_REWARD_VIDEOS[2],
  },
  {
    id: 'moon',     name: 'Moon',       symbol: '🌙',
    xp: 25,  stars: 15,
    rewardText: '+25 XP · Moon Night Sky Magic',
    unlockedPerk: 'Moon Reward Video',
    description: 'Soothing focus for practice.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    glowColor: '#A855F7', video: ALL_REWARD_VIDEOS[3],
  },
  {
    id: 'heart',    name: 'Heart',      symbol: '❤️',
    xp: 30,  stars: 20,
    rewardText: '+30 XP · Heart Love & Kindness',
    unlockedPerk: 'Heart Reward Video',
    description: 'Unlocks rare golden rewards.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    glowColor: '#F43F5E', video: ALL_REWARD_VIDEOS[4],
  },
  {
    id: 'rainbow',  name: 'Rainbow',    symbol: '🌈',
    xp: 35,  stars: 25,
    rewardText: '+35 XP · Rainbow Colors & Wonder',
    unlockedPerk: 'Rainbow Reward Video',
    description: 'Ultimate reward glyph!',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    glowColor: '#10B981', video: ALL_REWARD_VIDEOS[5],
  },
]

// ─── Shape Feature Extractor ──────────────────────────────────────────────────
interface ShapeFeatures {
  aspectRatio: number       // bbox width / height
  fillRatio: number         // dark pixels / bbox area
  circularity: number       // 4π·Area / Perimeter² — KEY discriminator
  horizontalSymmetry: number // 0–1
  topBottomRatio: number    // top-half / bottom-half dark pixel count
  verticalCOM: number       // 0=top … 1=bottom
  leftRightAsymmetry: number // |left−right| / total
  darkPixelRatio: number
}

function extractShapeFeatures(
  videoEl: HTMLVideoElement,
  analysisCanvas: HTMLCanvasElement
): ShapeFeatures | null {
  const W = 200, H = 150
  analysisCanvas.width = W
  analysisCanvas.height = H
  const ctx = analysisCanvas.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(videoEl, 0, 0, W, H)
  const { data } = ctx.getImageData(0, 0, W, H)

  // ── Luminance + Otsu threshold ───────────────────────────────────────────
  const luma = new Float32Array(W * H)
  let lumaSum = 0
  for (let i = 0; i < data.length; i += 4) {
    const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    luma[i >> 2] = l
    lumaSum += l
  }
  const lumaMean = lumaSum / (W * H)

  // Otsu-inspired two-pass threshold
  let sumBelow = 0, countBelow = 0
  let sumAbove = 0, countAbove = 0
  const thresh0 = lumaMean * 0.70
  for (let i = 0; i < luma.length; i++) {
    if (luma[i] < thresh0) { sumBelow += luma[i]; countBelow++ }
    else { sumAbove += luma[i]; countAbove++ }
  }
  const thresh = countBelow > 0 && countAbove > 0
    ? (sumBelow / countBelow + sumAbove / countAbove) / 2
    : thresh0

  // ── Binary image + bounding box ──────────────────────────────────────────
  const binary = new Uint8Array(W * H)
  let darkCount = 0
  let minX = W, maxX = 0, minY = H, maxY = 0
  for (let idx = 0; idx < luma.length; idx++) {
    if (luma[idx] < thresh) {
      binary[idx] = 1
      darkCount++
      const x = idx % W, y = (idx / W) | 0
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  const darkPixelRatio = darkCount / (W * H)
  if (darkPixelRatio < 0.008 || darkPixelRatio > 0.65) return null

  const bboxW = Math.max(maxX - minX, 1)
  const bboxH = Math.max(maxY - minY, 1)
  const bboxArea = bboxW * bboxH

  // ── True perimeter: border pixels (4-connected) ──────────────────────────
  // A dark pixel is on the perimeter if any N/S/E/W neighbour is light.
  let perimeter = 0
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!binary[y * W + x]) continue
      const n = y > 0       ? binary[(y - 1) * W + x] : 0
      const s = y < H - 1   ? binary[(y + 1) * W + x] : 0
      const e = x < W - 1   ? binary[y * W + x + 1]   : 0
      const w = x > 0       ? binary[y * W + x - 1]   : 0
      if (!n || !s || !e || !w) perimeter++
    }
  }
  // Circularity: 1.0 = perfect circle, star ≈ 0.1–0.25, heart ≈ 0.4–0.65
  const circularity = perimeter > 0
    ? (4 * Math.PI * darkCount) / (perimeter * perimeter)
    : 0

  // ── Mass distribution features ───────────────────────────────────────────
  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  let leftCount = 0, rightCount = 0, topCount = 0, bottomCount = 0, yCOMsum = 0

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!binary[y * W + x]) continue
      if (x < midX) leftCount++; else rightCount++
      if (y < midY) topCount++; else bottomCount++
      yCOMsum += (y - minY)
    }
  }

  const horizontalSymmetry = Math.min(leftCount, rightCount) / Math.max(leftCount, rightCount, 1)
  const topBottomRatio     = topCount / Math.max(bottomCount, 1)
  const verticalCOM        = yCOMsum / Math.max(darkCount * bboxH, 1)
  const leftRightAsymmetry = Math.abs(leftCount - rightCount) / Math.max(darkCount, 1)
  const fillRatio          = darkCount / bboxArea
  const aspectRatio        = bboxW / bboxH

  return { aspectRatio, fillRatio, circularity, horizontalSymmetry, topBottomRatio, verticalCOM, leftRightAsymmetry, darkPixelRatio }
}

// ─── Shape Classifier (priority-ordered decision tree) ──────────────────────
// KEY insight: circularity is the best discriminator:
//   Circle/Smile : circularity ≈ 0.55–1.0
//   Heart        : circularity ≈ 0.35–0.60  (but symmetric + top-heavy)
//   Moon         : circularity ≈ 0.30–0.60  (but asymmetric horizontally)
//   Rainbow      : circularity ≈ 0.10–0.40  (but wide aspect ratio)
//   Music Note   : circularity ≈ 0.15–0.45  (but tall aspect ratio)
//   Star         : circularity ≈ 0.08–0.28  (very spiky = low circularity)
function classifyShape(f: ShapeFeatures): { symbolId: string; confidence: number } | null {
  // ── 1. RAINBOW: always wide ───────────────────────────────────────────────
  if (f.aspectRatio >= 1.55) {
    const conf = 75 + Math.min(20, (f.aspectRatio - 1.55) * 30)
    return { symbolId: 'rainbow', confidence: conf }
  }

  // ── 2. MUSIC NOTE: tall (narrow) AND asymmetric AND low circularity ───────
  if (f.aspectRatio <= 0.75 && f.leftRightAsymmetry > 0.08 && f.circularity < 0.50) {
    const conf = 72 + Math.min(22, (0.75 - f.aspectRatio) * 40 + f.leftRightAsymmetry * 30)
    return { symbolId: 'music', confidence: conf }
  }

  // ── 3. SMILE (circle/face): HIGH circularity is the definitive test ───────
  //    This is what fixes Smile vs Star confusion.
  if (f.circularity >= 0.50) {
    const conf = 75 + Math.min(22, (f.circularity - 0.50) * 80)
    return { symbolId: 'smile', confidence: conf }
  }

  // ── 4. HEART: symmetric + top-heavy + medium circularity ─────────────────
  if (f.horizontalSymmetry >= 0.82 && f.topBottomRatio >= 1.05 && f.circularity >= 0.30) {
    const conf = 72 + Math.min(22, (f.horizontalSymmetry - 0.82) * 80)
    return { symbolId: 'heart', confidence: conf }
  }

  // ── 5. MOON: asymmetric horizontally + medium circularity ────────────────
  if (f.horizontalSymmetry < 0.72 && f.leftRightAsymmetry > 0.12 && f.circularity >= 0.22) {
    const conf = 70 + Math.min(22, f.leftRightAsymmetry * 60)
    return { symbolId: 'moon', confidence: conf }
  }

  // ── 6. STAR: low circularity (spiky), near-square ────────────────────────
  if (f.circularity < 0.38 && f.aspectRatio >= 0.7 && f.aspectRatio <= 1.5) {
    const conf = 70 + Math.min(22, (0.38 - f.circularity) * 80)
    return { symbolId: 'star', confidence: conf }
  }

  // ── Fallback: not confident enough to report ──────────────────────────────
  return null
}

// ─── Web Audio Chime ──────────────────────────────────────────────────────────
function playChime() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
    const ctx = new AC()
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = f
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
      g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.08 + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35)
      osc.connect(g); g.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.08)
      osc.stop(ctx.currentTime + i * 0.08 + 0.4)
    })
  } catch { /* ignore */ }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MagicRewardScannerScreen() {
  const { state: appState, addXP, addStars, logReward } = useApp()
  const { state: authState } = useAuth()
  const user = authState.user

  // Refs
  const videoRef          = useRef<HTMLVideoElement>(null)
  const analysisCanvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef  = useRef<HTMLCanvasElement>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef      = useRef<HTMLInputElement>(null)
  const detectionLoopRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const consecutiveRef    = useRef<{ id: string; count: number }>({ id: '', count: 0 })

  // Camera State
  const [isCameraActive, setIsCameraActive]   = useState(false)
  const [cameraError, setCameraError]         = useState<string | null>(null)
  const [facingMode, setFacingMode]           = useState<'user' | 'environment'>('environment')
  const [isFlashOn, setIsFlashOn]             = useState(false)

  // Scanner State
  const [isScanning, setIsScanning]               = useState(false)
  const [scanStatus, setScanStatus]               = useState('Open camera and hold a symbol card up clearly')
  const [confidence, setConfidence]               = useState(0)
  const [liveDetection, setLiveDetection]         = useState<string>('')  // live label
  const [activeSymbol, setActiveSymbol]           = useState<(MagicSymbolConfig & { video: VideoItem }) | null>(null)
  const [selectedRewardVideo, setSelectedRewardVideo] = useState<VideoItem | null>(null)
  const [laserTop, setLaserTop]                   = useState(20)
  const [showHint, setShowHint]                   = useState(true)

  // History
  const [scanHistory, setScanHistory]     = useState<MagicScanLog[]>([])
  const [collectedToday, setCollectedToday] = useState<Set<MagicSymbolId>>(new Set())
  const [aiMsg, setAiMsg]                 = useState(
    `Hi${user?.name ? ' ' + user.name : ''}! Hold up a clearly drawn symbol on white paper in front of the camera — ⭐ Star, 🌙 Moon, ❤️ Heart, 😊 Smile, 🌈 Rainbow, or 🎵 Music Note!`
  )

  // Animate laser line
  useEffect(() => {
    const id = setInterval(() => setLaserTop((p) => { const n = p + 1.2; return n > 82 ? 15 : n }), 25)
    return () => clearInterval(id)
  }, [])

  // ─── Camera ──────────────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      if (videoRef.current?.srcObject)
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop())
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsCameraActive(true)
        setScanStatus('Camera active — hold a drawn symbol up clearly!')
        setShowHint(false)
      }
    } catch {
      setCameraError('Camera access denied. Tap a symbol card below to manually trigger a reward.')
      setIsCameraActive(false)
    }
  }, [facingMode])

  const stopCamera = useCallback(() => {
    if (detectionLoopRef.current) clearInterval(detectionLoopRef.current)
    if (videoRef.current?.srcObject)
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setIsCameraActive(false)
    setScanStatus('Camera stopped')
  }, [])

  useEffect(() => { startCamera(); return () => stopCamera() }, [startCamera, stopCamera])

  // ─── Confetti ─────────────────────────────────────────────────────────────
  const triggerConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    canvas.width = canvas.parentElement?.clientWidth ?? 640
    canvas.height = canvas.parentElement?.clientHeight ?? 480
    const cols = ['#10B981','#F59E0B','#3B82F6','#EC4899','#8B5CF6','#F43F5E','#EAB308']
    const pts = Array.from({ length: 120 }, () => ({
      x: canvas.width/2, y: canvas.height/2,
      vx: (Math.random()-0.5)*20, vy: (Math.random()-0.8)*16,
      s: Math.random()*9+4, c: cols[Math.floor(Math.random()*cols.length)],
      a: 1, r: Math.random()*Math.PI*2, vr: (Math.random()-0.5)*0.3,
    }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = 0
      pts.forEach((p) => {
        if (p.a <= 0) return; alive++
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.a -= 0.012; p.r += p.vr
        ctx.save(); ctx.globalAlpha = Math.max(0, p.a)
        ctx.translate(p.x, p.y); ctx.rotate(p.r)
        ctx.fillStyle = p.c; ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s)
        ctx.restore()
      })
      if (alive > 0) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  // ─── Core: fire reward for a recognized symbol ────────────────────────────
  const fireReward = useCallback((sym: MagicSymbolConfig & { video: VideoItem }, conf: number) => {
    if (selectedRewardVideo) return

    setActiveSymbol(sym)
    setConfidence(conf)
    setScanStatus(`✅ Recognized: ${sym.symbol} ${sym.name}!`)
    setLiveDetection('')

    playChime()
    triggerConfetti()

    addXP(sym.xp)
    addStars(sym.stars)
    logReward({
      videoId: sym.video.id, title: sym.video.title,
      category: sym.video.category, starsEarned: sym.stars,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })

    setScanHistory((prev) => [{
      id: `scan-${Date.now()}`,
      symbolId: sym.id as MagicSymbolId,
      name: sym.name, symbol: sym.symbol,
      xpEarned: sym.xp, starsEarned: sym.stars,
      rewardText: sym.rewardText,
      confidence: conf,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }, ...prev.slice(0, 29)])

    setCollectedToday((prev) => new Set([...prev, sym.id as MagicSymbolId]))
    setAiMsg(`🎉 Recognized ${sym.symbol} ${sym.name} at ${conf.toFixed(1)}% confidence! Auto-playing "${sym.video.title}"!`)

    // 🎬 Auto-play video
    setSelectedRewardVideo(sym.video)
    consecutiveRef.current = { id: '', count: 0 }
  }, [selectedRewardVideo, triggerConfetti, addXP, addStars, logReward])

  // ─── Manual Scan Now ──────────────────────────────────────────────────────
  const scanNow = useCallback(() => {
    const video = videoRef.current
    const canvas = analysisCanvasRef.current
    if (!video || !canvas || video.readyState < 2) return
    if (selectedRewardVideo) return

    setIsScanning(true)
    setScanStatus('Analyzing shape…')

    setTimeout(() => {
      const features = extractShapeFeatures(video, canvas)
      if (!features) {
        setIsScanning(false)
        setScanStatus('No clear symbol detected — hold symbol closer & steady')
        return
      }

      // Draw debug overlay
      const overlay = overlayCanvasRef.current
      if (overlay) {
        overlay.width = video.videoWidth || 640
        overlay.height = video.videoHeight || 480
        const octx = overlay.getContext('2d')!
        octx.clearRect(0, 0, overlay.width, overlay.height)
        // Show features text
        octx.fillStyle = 'rgba(16,185,129,0.9)'
        octx.fillRect(8, 8, 260, 80)
        octx.fillStyle = '#fff'
        octx.font = 'bold 11px monospace'
        octx.fillText(`Aspect: ${features.aspectRatio.toFixed(2)}  Fill: ${(features.fillRatio*100).toFixed(0)}%`, 14, 24)
        octx.fillText(`HSymm: ${(features.horizontalSymmetry*100).toFixed(0)}%  T/B: ${features.topBottomRatio.toFixed(2)}`, 14, 40)
        octx.fillText(`EdgeDen: ${(features.edgeDensity*100).toFixed(0)}%  vCOM: ${features.verticalCOM.toFixed(2)}`, 14, 56)
        octx.fillText(`DarkPx: ${(features.darkPixelRatio*100).toFixed(1)}%`, 14, 72)
      }

      const result = classifyShape(features)
      setIsScanning(false)

      if (!result) {
        setScanStatus('Shape unclear — ensure good lighting, dark marker on white paper')
        return
      }

      const sym = MAGIC_SYMBOLS.find((s) => s.id === result.symbolId)
      if (sym) fireReward(sym, result.confidence)
    }, 400)
  }, [selectedRewardVideo, fireReward])

  // ─── Auto-detection loop (every 1.2 s, needs 3 consecutive matches) ───────
  useEffect(() => {
    if (detectionLoopRef.current) clearInterval(detectionLoopRef.current)
    if (!isCameraActive) return

    detectionLoopRef.current = setInterval(() => {
      const video = videoRef.current
      const canvas = analysisCanvasRef.current
      if (!video || !canvas || video.readyState < 2 || selectedRewardVideo) return

      const features = extractShapeFeatures(video, canvas)
      if (!features) {
        setLiveDetection('')
        return
      }

      const result = classifyShape(features)
      if (!result) {
        setLiveDetection('')
        setScanStatus('Scanning… Hold symbol steady and close to camera')
        consecutiveRef.current = { id: '', count: 0 }
        return
      }

      const sym = MAGIC_SYMBOLS.find((s) => s.id === result.symbolId)
      if (!sym) return

      setLiveDetection(`${sym.symbol} ${sym.name} — ${result.confidence.toFixed(0)}% confidence`)
      setScanStatus(`Detecting: ${sym.symbol} ${sym.name} — hold steady…`)

      // Require 3 consecutive same detections → fire reward
      if (consecutiveRef.current.id === result.symbolId) {
        consecutiveRef.current.count++
        if (consecutiveRef.current.count >= 3) {
          fireReward(sym, result.confidence)
        }
      } else {
        consecutiveRef.current = { id: result.symbolId, count: 1 }
      }
    }, 1200)

    return () => { if (detectionLoopRef.current) clearInterval(detectionLoopRef.current) }
  }, [isCameraActive, selectedRewardVideo, fireReward])

  return (
    <div className="flex flex-col h-full w-full bg-[#061A12] text-emerald-100 rounded-3xl overflow-hidden border border-emerald-900/60 shadow-2xl relative select-none">
      {/* Hidden canvases for analysis */}
      <canvas ref={analysisCanvasRef} className="hidden" />
      <input type="file" ref={fileInputRef} accept="image/*" className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const img = new Image()
          const url = URL.createObjectURL(file)
          img.onload = () => {
            const c = analysisCanvasRef.current!
            c.width = img.width; c.height = img.height
            c.getContext('2d')!.drawImage(img, 0, 0)
            // Fake a video-like object for shape extraction
            const fakeVideo = { videoWidth: img.width, videoHeight: img.height } as HTMLVideoElement
            // Draw directly via getImageData path
            const features = (() => {
              const ctx2 = c.getContext('2d', { willReadFrequently: true })!
              const W = 160, H = 120
              const tmp = document.createElement('canvas')
              tmp.width = W; tmp.height = H
              tmp.getContext('2d')!.drawImage(img, 0, 0, W, H)
              return extractShapeFeatures({ readyState: 4, videoWidth: W, videoHeight: H } as HTMLVideoElement, tmp)
            })()
            URL.revokeObjectURL(url)
            if (!features) { setScanStatus('No clear symbol found in image'); return }
            const result = classifyShape(features)
            if (!result) { setScanStatus('Could not classify symbol in image'); return }
            const sym = MAGIC_SYMBOLS.find((s) => s.id === result.symbolId)
            if (sym) fireReward(sym, result.confidence)
          }
          img.src = url
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-[#061A12] to-[#030D09] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ── */}
      <div className="relative z-10 px-6 py-4 bg-[#0A261B]/80 backdrop-blur-md border-b border-emerald-800/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-2xl shadow-lg border border-emerald-400/40 ring-4 ring-emerald-500/20">📷</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-black tracking-wide text-white">Magic Reward Scanner</h1>
              <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                isCameraActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                {isCameraActive ? 'Shape AI Active' : 'Camera Off'}
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 font-medium">Hold drawn symbol to camera — shape AI auto-recognizes & plays reward!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black px-4 py-2 rounded-2xl text-xs shadow-lg cursor-pointer transition-all">
            📁 Upload Image
          </button>
          <div className="flex items-center gap-2 bg-[#061A12]/90 border border-emerald-700/50 rounded-2xl px-3.5 py-2 text-xs font-bold">
            <span className="text-amber-400">⚡</span>
            <span className="text-white font-extrabold">{appState.stats.xp} XP</span>
          </div>
        </div>
      </div>

      {/* ── Main Body ── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 min-h-0 overflow-y-auto">

        {/* Left: Camera + Controls */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Tip banner */}
          {showHint && (
            <div className="bg-amber-500/15 border border-amber-400/40 rounded-2xl px-4 py-3 flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">💡</span>
              <div>
                <p className="text-xs font-extrabold text-amber-300">How to get best results:</p>
                <p className="text-[11px] text-amber-200/80 font-medium">Use a <strong>black marker on white paper</strong>. Hold the symbol inside the green frame, filling it. Good lighting is key. The AI needs ~3 consistent detections before triggering.</p>
              </div>
              <button onClick={() => setShowHint(false)} className="text-amber-400/60 hover:text-amber-400 font-bold text-lg cursor-pointer shrink-0">✕</button>
            </div>
          )}

          {/* Camera Viewfinder */}
          <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <video ref={videoRef} playsInline muted
              className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

            {/* AI overlay canvas */}
            <canvas ref={overlayCanvasRef}
              className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`} />

            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center bg-gradient-to-b from-[#0B2E21] to-[#020A07]">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-4 rounded-full border border-emerald-400/20 animate-ping" style={{ animationDuration: '4s' }} />
                  <span className="text-5xl">🔮</span>
                </div>
                <p className="text-sm font-bold text-emerald-200/90 max-w-xs">{cameraError ?? 'Click "Open Camera" to start symbol recognition!'}</p>
                <button onClick={startCamera}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm border border-emerald-400/40 cursor-pointer flex items-center gap-2">
                  🎥 Open Camera
                </button>
              </div>
            )}

            {isFlashOn && <div className="absolute inset-0 bg-white/20 pointer-events-none z-20" />}

            {/* Neon HUD Frame */}
            <div className="absolute inset-8 sm:inset-12 border-2 border-emerald-500/30 rounded-3xl pointer-events-none flex flex-col justify-between p-4 z-20">
              {/* Corner brackets */}
              {['top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl', 'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
                'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl', 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl'].map((c, i) => (
                <div key={i} className={`absolute w-9 h-9 border-emerald-400 shadow-[0_0_15px_#10B981] ${c}`} />
              ))}

              {/* Animated laser */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_18px_#10B981] absolute left-0 right-0"
                style={{ top: `${laserTop}%`, transition: 'top 25ms linear' }} />

              {/* Top HUD */}
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-emerald-300 bg-[#061A12]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-600/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Shape Recognition Engine
                </span>
                {liveDetection && <span className="text-amber-300 font-extrabold normal-case">{liveDetection}</span>}
              </div>

              {/* Center reticle */}
              <div className="self-center flex flex-col items-center gap-2 my-auto">
                <div className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center text-4xl transition-all duration-300 shadow-2xl ${
                  activeSymbol ? 'border-amber-400 bg-amber-500/20 scale-110 shadow-[0_0_30px_#F59E0B]'
                  : isScanning  ? 'border-emerald-400 bg-emerald-500/10 animate-pulse'
                  : 'border-emerald-400/40 bg-emerald-950/40 backdrop-blur-sm'
                }`}>
                  {isScanning ? <span className="text-2xl animate-spin">⟳</span>
                    : activeSymbol ? activeSymbol.symbol : '🎯'}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-xs font-black text-emerald-200 text-center max-w-xs">
                  {scanStatus}
                </div>
                {confidence > 0 && (
                  <div className="text-[11px] font-extrabold text-amber-300">{confidence.toFixed(1)}% Match Confidence</div>
                )}
              </div>

              {/* Bottom HUD */}
              <div className="flex items-center justify-between text-[10px] text-emerald-300/70 font-bold bg-[#061A12]/80 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-emerald-700/30">
                <span>Shape Geometry Analysis</span>
                <span>Auto-Play on 3× Match</span>
              </div>
            </div>

            <canvas ref={confettiCanvasRef} className="absolute inset-0 pointer-events-none z-30" />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0A261B] border border-emerald-800/60 p-4 rounded-3xl shadow-xl">
            <div className="flex flex-wrap gap-2">
              <button onClick={isCameraActive ? stopCamera : startCamera}
                className={`px-5 py-3 rounded-2xl font-black text-xs shadow-lg border transition-all cursor-pointer flex items-center gap-2 ${
                  isCameraActive ? 'bg-rose-600/30 border-rose-400/40 text-rose-300 hover:bg-rose-600/40'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white border-emerald-300/30'
                }`}>
                {isCameraActive ? '⏹ Stop Camera' : '🎥 Open Camera'}
              </button>
              <button onClick={scanNow} disabled={!isCameraActive || isScanning}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs shadow-lg border border-purple-400/40 cursor-pointer disabled:opacity-50 flex items-center gap-2 transition-all">
                {isScanning ? '⟳ Scanning…' : '🔍 Scan Now'}
              </button>
              <button onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all">
                📁 Upload Image
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsFlashOn((p) => !p)}
                className={`p-3 rounded-2xl border font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all ${
                  isFlashOn ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_#F59E0B]' : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900'
                }`}>
                {isFlashOn ? '⚡' : '💡'} <span className="hidden sm:inline">Flash</span>
              </button>
              <button onClick={() => setFacingMode((p) => p === 'user' ? 'environment' : 'user')}
                className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all">
                🔄 <span className="hidden sm:inline">Flip</span>
              </button>
            </div>
          </div>

          {/* Symbol Quick-Tap Cards */}
          <div className="bg-[#0A261B]/90 border border-emerald-800/60 p-4 rounded-3xl shadow-xl flex flex-col gap-3">
            <span className="text-xs font-black text-emerald-200 uppercase tracking-wide">
              🪄 Symbol Cards — Tap any to instantly trigger its reward video
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {MAGIC_SYMBOLS.map((sym) => {
                const collected = collectedToday.has(sym.id as MagicSymbolId)
                return (
                  <button key={sym.id} onClick={() => fireReward(sym, 99.0)} disabled={isScanning}
                    className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 ${
                      collected ? 'bg-emerald-900/50 border-emerald-500/60 text-white shadow-md' : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300/70 hover:border-emerald-500/50'
                    }`} style={collected ? { boxShadow: `0 0 12px ${sym.glowColor}44` } : {}}>
                    <span className="text-3xl drop-shadow">{sym.symbol}</span>
                    <span className="text-[10px] font-extrabold">{sym.name}</span>
                    <span className="text-[9px] text-amber-400 font-bold">+{sym.xp} XP</span>
                    {collected && <span className="text-[8px] text-emerald-400 font-extrabold">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Mascot + History */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* AI Mascot */}
          <div className="bg-gradient-to-br from-emerald-900/60 via-[#0A261B] to-[#04140E] border border-emerald-700/50 p-5 rounded-3xl shadow-2xl flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl animate-bounce" style={{ animationDuration: '3s' }}>🐘</div>
              <div>
                <h3 className="text-sm font-black text-amber-300">Jungle AI Mascot Twin</h3>
                <span className="text-[10px] text-emerald-300 font-extrabold uppercase">Shape Recognition Engine</span>
              </div>
            </div>
            <div className="bg-[#061A12]/90 border border-emerald-800/60 p-3.5 rounded-2xl text-xs font-semibold text-emerald-100 leading-relaxed z-10">
              "{aiMsg}"
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2 z-10">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
                <span>Symbols Collected Today</span>
                <span className="text-amber-400 font-extrabold">{collectedToday.size} / {MAGIC_SYMBOLS.length}</span>
              </div>
              <div className="w-full h-2.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/50 p-0.5">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${(collectedToday.size / MAGIC_SYMBOLS.length) * 100}%` }} />
              </div>
            </div>

            {/* Symbol → Video legend */}
            <div className="flex flex-col gap-2 z-10">
              <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-wide">Symbol → Reward Video</span>
              <div className="grid grid-cols-1 gap-1.5">
                {MAGIC_SYMBOLS.map((sym) => (
                  <div key={sym.id} className="flex items-center gap-2 p-2 rounded-xl bg-[#061A12]/70 border border-emerald-800/30 group">
                    <span className="text-lg">{sym.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-extrabold text-white block">{sym.name}</span>
                      <span className="text-[9px] text-emerald-300/70 truncate block">🎬 {sym.video.title}</span>
                    </div>
                    <button onClick={() => setSelectedRewardVideo(sym.video)}
                      className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg bg-purple-600 text-white text-[9px] font-extrabold cursor-pointer transition-all">
                      ▶ Play
                    </button>
                    <span className="text-[9px] text-amber-400 font-extrabold shrink-0">+{sym.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scan History */}
          <div className="bg-[#0A261B]/80 border border-emerald-800/60 p-5 rounded-3xl shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📜</span>
                <h3 className="text-sm font-black text-white">Scan History</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                {scanHistory.length} Scans
              </span>
            </div>
            {scanHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-emerald-500/60 text-xs font-bold text-center gap-2">
                <span className="text-4xl">🔍</span>
                <p>No scans yet!<br />Hold a symbol to the camera.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                {scanHistory.map((item) => {
                  const sym = MAGIC_SYMBOLS.find((s) => s.id === item.symbolId)
                  return (
                    <div key={item.id}
                      className="p-3.5 rounded-2xl bg-[#061A12]/90 border border-emerald-800/50 flex items-center justify-between gap-3 hover:border-emerald-600/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-2xl">{item.symbol}</div>
                        <div>
                          <h4 className="text-xs font-black text-white">{item.name}</h4>
                          <p className="text-[10px] text-emerald-300/80">{item.rewardText}</p>
                          <p className="text-[9px] text-emerald-500">{item.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {sym && (
                          <button onClick={() => setSelectedRewardVideo(sym.video)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[10px] cursor-pointer flex items-center gap-1">
                            🎬 Play
                          </button>
                        )}
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-amber-400 block">+{item.xpEarned} XP</span>
                          <span className="text-[9px] text-emerald-400/70">{item.confidence.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Video Player ── */}
      {selectedRewardVideo && (
        <VideoPlayerModal
          video={selectedRewardVideo}
          onClose={() => {
            setSelectedRewardVideo(null)
            setScanStatus('Camera active — hold a drawn symbol up clearly!')
            setConfidence(0)
            setActiveSymbol(null)
          }}
          onCompleted={(v) => {
            logReward({
              videoId: v.id, title: v.title, category: v.category,
              watchCompletion: 100, starsEarned: 15,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            })
          }}
          isAlreadyCompleted={false}
          onUpdateProgress={() => {}}
        />
      )}
    </div>
  )
}
