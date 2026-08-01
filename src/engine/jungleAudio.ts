/**
 * Web Audio API synthesizer for ReinforceAI Jungle sound effects & ambient chirps.
 * Zero external assets required – generates pure, crystal-clear sound effects directly!
 */

class JungleAudioSynthesizer {
  private ctx: AudioContext | null = null

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  /**
   * Plays a magical unlock chime (Apple/Disney style pentatonic arpeggio)
   */
  playUnlockChime() {
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)

        gain.gain.setValueAtTime(0, now + idx * 0.08)
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.5)
      })
    } catch {
      // Audio playback safety fallback
    }
  }

  /**
   * Plays a bird chirp effect
   */
  playBirdChirp() {
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.1)
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.2)

      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Plays a gentle water splash sound
   */
  playSplashSound() {
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.linearRampToValueAtTime(150, now + 0.3)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.3)
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Plays a tree growth shimmer effect
   */
  playGrowthShimmer() {
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.35)
    } catch {
      // Audio safety fallback
    }
  }
}

export const jungleAudio = new JungleAudioSynthesizer()
