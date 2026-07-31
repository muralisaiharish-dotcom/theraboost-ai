export interface VideoItem {
  id: string
  title: string
  subtitle: string
  duration: string
  progress?: number
  category: string
  thumbnailType:
    | 'incredible_india'
    | 'folk_dances'
    | 'diwali'
    | 'bharatanatyam'
    | 'kathakali'
    | 'holi'
    | 'temples'
    | 'classical_music'
  rewardStars: number
}

export const CONTINUE_WATCHING_VIDEOS: VideoItem[] = [
  {
    id: 'vw-1',
    title: 'Our Incredible India',
    subtitle: 'Amazing facts about India',
    duration: '05:20',
    progress: 70,
    category: 'History',
    thumbnailType: 'incredible_india',
    rewardStars: 10,
  },
  {
    id: 'vw-2',
    title: 'Folk Dances of India',
    subtitle: 'Bhangra, Garba and more!',
    duration: '06:15',
    progress: 40,
    category: 'Dance & Music',
    thumbnailType: 'folk_dances',
    rewardStars: 10,
  },
  {
    id: 'vw-3',
    title: 'Diwali – The Festival of Lights',
    subtitle: "Let's celebrate together",
    duration: '04:45',
    progress: 80,
    category: 'Festivals',
    thumbnailType: 'diwali',
    rewardStars: 10,
  },
  {
    id: 'vw-4',
    title: 'Bharatanatyam Explained',
    subtitle: 'Grace in every move',
    duration: '05:10',
    progress: 90,
    category: 'Dance & Music',
    thumbnailType: 'bharatanatyam',
    rewardStars: 10,
  },
]

export const MORE_CULTURE_VIDEOS: VideoItem[] = [
  {
    id: 'vw-5',
    title: 'Kathakali - The Story',
    subtitle: 'The art of storytelling',
    duration: '04:30',
    category: 'Dance & Music',
    thumbnailType: 'kathakali',
    rewardStars: 10,
  },
  {
    id: 'vw-6',
    title: 'Holi - Festival of Colors',
    subtitle: 'Colors of happiness',
    duration: '04:50',
    category: 'Festivals',
    thumbnailType: 'holi',
    rewardStars: 10,
  },
  {
    id: 'vw-7',
    title: 'Famous Temples of India',
    subtitle: 'Spiritual journey',
    duration: '05:30',
    category: 'Monuments',
    thumbnailType: 'temples',
    rewardStars: 10,
  },
  {
    id: 'vw-8',
    title: 'Indian Classical Music',
    subtitle: 'Melodies of India',
    duration: '04:25',
    category: 'Dance & Music',
    thumbnailType: 'classical_music',
    rewardStars: 10,
  },
]

export const VIDEO_CATEGORIES = [
  { name: 'Festivals', count: 18, icon: '🪔' },
  { name: 'Dance & Music', count: 15, icon: '🎵' },
  { name: 'History & Freedom Fighters', count: 12, icon: '🕌' },
  { name: 'Monuments', count: 10, icon: '🏛️' },
  { name: 'Stories & Legends', count: 8, icon: '📜' },
  { name: 'Languages', count: 6, icon: '🗣️' },
]
