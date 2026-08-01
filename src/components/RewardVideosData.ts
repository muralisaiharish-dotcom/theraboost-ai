export interface VideoItem {
  id: string
  title: string
  subtitle: string
  duration: string
  category:
  | 'Indian Culture'
  | 'Animals'
  | 'Nature'
  | 'Rhymes'
  | 'Educational Learning'
  | 'Motivational Kids Videos'
  videoUrl: string
  thumbnailType:
  | 'incredible_india'
  | 'folk_dances'
  | 'diwali'
  | 'bharatanatyam'
  | 'kathakali'
  | 'holi'
  | 'temples'
  | 'classical_music'
  | 'animals_elephant'
  | 'animals_wild'
  | 'animals_farm'
  | 'nature_trees'
  | 'nature_earth'
  | 'nature_ocean'
  | 'rhymes_abc'
  | 'rhymes_star'
  | 'rhymes_bus'
  | 'edu_numbers'
  | 'edu_shapes'
  | 'edu_planets'
  | 'moti_habits'
  | 'moti_try'
  | 'moti_kindness'
  unlockCost: number
  isLocked?: boolean
  unlockRequirement?: string
  description?: string
}

export const VIDEO_CATEGORIES = [
  { name: 'All', icon: '✨' },
  { name: 'Indian Culture', icon: '🇮🇳' },
  { name: 'Animals', icon: '🐘' },
  { name: 'Nature', icon: '🌿' },
  { name: 'Rhymes', icon: '🎵' },
  { name: 'Educational Learning', icon: '📚' },
  { name: 'Motivational Kids Videos', icon: '🌈' },
]

export const ALL_REWARD_VIDEOS: VideoItem[] = [
  {
    id: 'vid-star-reward',
    title: 'Star Reward — Magic Celebration',
    subtitle: 'Unlocked by Star Symbol ⭐',
    duration: '00:30',
    category: 'Indian Culture',
    videoUrl: 'https://videotourl.com/videos/1785583370486-20b45015-b0ae-450a-a5f2-4f3897004b84.mp4',
    thumbnailType: 'incredible_india',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Star reward video celebration for great performance!',
  },
  {
    id: 'vid-smile-reward',
    title: 'Smile Reward — Happy Moments',
    subtitle: 'Unlocked by Smile Symbol 😊',
    duration: '00:30',
    category: 'Animals',
    videoUrl: 'https://videotourl.com/videos/1785583266561-66850c74-991c-48b8-a569-604e6577405b.mp4',
    thumbnailType: 'animals_elephant',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Smile reward video celebrating joyful learning moments!',
  },
  {
    id: 'vid-music-reward',
    title: 'Music Note Reward — Rhythmic Fun',
    subtitle: 'Unlocked by Music Note Symbol 🎵',
    duration: '00:30',
    category: 'Rhymes',
    videoUrl: 'https://videotourl.com/videos/1785583397522-b8749910-72ae-4fa9-bd10-658d1f6c503f.mp4',
    thumbnailType: 'classical_music',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Music Note reward video with magical tunes & rhythms!',
  },
  {
    id: 'vid-moon-reward',
    title: 'Moon Reward — Night Sky Magic',
    subtitle: 'Unlocked by Moon Symbol 🌙',
    duration: '00:30',
    category: 'Nature',
    videoUrl: 'https://videotourl.com/videos/1785583493718-ce7d9a6a-491b-412a-a8e7-e45dfbeba3e8.mp4',
    thumbnailType: 'nature_earth',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Moon reward video featuring serene night sky & stars!',
  },
  {
    id: 'vid-heart-reward',
    title: 'Heart Reward — Love & Kindness',
    subtitle: 'Unlocked by Heart Symbol ❤️',
    duration: '00:30',
    category: 'Motivational Kids Videos',
    videoUrl: 'https://videotourl.com/videos/1785583591361-cd79a184-4253-4442-848e-8d979e3eee0a.mp4',
    thumbnailType: 'moti_kindness',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Heart reward video celebrating love, care & positivity!',
  },
  {
    id: 'vid-rainbow-reward',
    title: 'Rainbow Reward — Colors & Wonder',
    subtitle: 'Unlocked by Rainbow Symbol 🌈',
    duration: '00:30',
    category: 'Educational Learning',
    videoUrl: 'https://videotourl.com/videos/1785583714901-eb18cff0-96ad-4f0c-9611-ca12d14065cf.mp4',
    thumbnailType: 'holi',
    unlockCost: 0,
    isLocked: false,
    description: 'Special Rainbow reward video showcasing bright colors & wonder!',
  },
]

export const CONTINUE_WATCHING_VIDEOS: VideoItem[] = [
  ALL_REWARD_VIDEOS[0],
  ALL_REWARD_VIDEOS[1],
  ALL_REWARD_VIDEOS[2],
]

export const MORE_CULTURE_VIDEOS: VideoItem[] = ALL_REWARD_VIDEOS
