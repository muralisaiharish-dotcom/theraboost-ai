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
  // ── 1. Indian Culture (🇮🇳) ──────────────────────────────────────────────────
  {
    id: 'vid-culture-1',
    title: 'Story of the Taj Mahal',
    subtitle: 'Monument of love & world heritage',
    duration: '02:30',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/SeTjQHzLci0',
    thumbnailType: 'incredible_india',
    unlockCost: 10,
    isLocked: false,
    description: 'Learn about the majestic architecture and history of the Taj Mahal in Agra, India!',
  },
  {
    id: 'vid-culture-2',
    title: 'Indian National Symbols',
    subtitle: 'Peacock, Tiger, Lotus & Tricolor',
    duration: '03:12',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/I6i8cLXPGQE',
    thumbnailType: 'temples',
    unlockCost: 10,
    isLocked: false,
    description: 'Discover India’s proud national animal, bird, flower, and emblem in a fun animated guide.',
  },
  {
    id: 'vid-culture-3',
    title: 'Festival of Diwali',
    subtitle: 'Lights, diyas & joyful celebrations',
    duration: '04:05',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/GBbcYtkqVKQ',
    thumbnailType: 'diwali',
    unlockCost: 10,
    isLocked: false,
    description: 'Celebrate Diwali! See how families light up diyas, make rangolis, and share sweets.',
  },
  {
    id: 'vid-culture-4',
    title: 'Folk & Classical Dances of India',
    subtitle: 'Bhangra, Garba & Kathakali',
    duration: '03:48',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/JWhA3ldZcyY',
    thumbnailType: 'bharatanatyam',
    unlockCost: 15,
    isLocked: true,
    unlockRequirement: 'Reach Level 2 or Earn 50 Stars to Unlock',
    description: 'Explore the vibrant costumes and rhythmic dance forms across different states of India.',
  },
  {
    id: 'vid-culture-5',
    title: 'Colors of Holi Festival',
    subtitle: 'The festival of colours & joy',
    duration: '04:30',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/YlAy-nHzsdU',
    thumbnailType: 'holi',
    unlockCost: 10,
    isLocked: false,
    description: 'Celebrate the vibrant festival of Holi with splashes of color and traditional songs!',
  },
  {
    id: 'vid-culture-6',
    title: 'Indian Classical Music',
    subtitle: 'Ragas, sitar & tabla rhythms',
    duration: '05:00',
    category: 'Indian Culture',
    videoUrl: 'https://youtu.be/FM2OuVbkPVw',
    thumbnailType: 'classical_music',
    unlockCost: 15,
    isLocked: false,
    description: 'Discover the soulful world of Indian classical music — ragas, sitar, tabla and more!',
  },

  // ── 2. Animals (🐘) ────────────────────────────────────────────────────────
  {
    id: 'vid-animals-1',
    title: 'Meet the Elephant',
    subtitle: 'Gentle giants of the jungle',
    duration: '00:15',
    category: 'Animals',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'animals_elephant',
    unlockCost: 10,
    isLocked: false,
    description: 'Elephants are smart, kind, and have amazing trunks! Watch them splash and play.',
  },
  {
    id: 'vid-animals-2',
    title: 'Wild Animals & Jungle Friends',
    subtitle: 'Lions, Tigers & Monkeys',
    duration: '00:15',
    category: 'Animals',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'animals_wild',
    unlockCost: 10,
    isLocked: false,
    description: 'Take a safari into the deep forest and say hello to majestic lions and friendly monkeys.',
  },
  {
    id: 'vid-animals-3',
    title: 'Cute Farm Animals',
    subtitle: 'Cows, Sheep, Chicks & Ducks',
    duration: '00:15',
    category: 'Animals',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'animals_farm',
    unlockCost: 10,
    isLocked: false,
    description: 'Learn the sounds of farm animals! Moo, Baa, and Quack along with cute farm babies.',
  },

  // ── 3. Nature (🌿) ─────────────────────────────────────────────────────────
  {
    id: 'vid-nature-1',
    title: 'Save the Trees & Forests',
    subtitle: 'Protecting our green planet',
    duration: '00:15',
    category: 'Nature',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'nature_trees',
    unlockCost: 10,
    isLocked: false,
    description: 'Trees give us clean air, shade, and fruits. Learn why planting trees helps everyone!',
  },
  {
    id: 'vid-nature-2',
    title: 'Wonders of Mother Nature',
    subtitle: 'Mountains, Rivers & Sunshine',
    duration: '00:15',
    category: 'Nature',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'nature_earth',
    unlockCost: 10,
    isLocked: false,
    description: 'Marvel at lush valleys, cascading waterfalls, and rainbow sunsets across the world.',
  },
  {
    id: 'vid-nature-3',
    title: 'Ocean Life & Sea Creatures',
    subtitle: 'Dolphins, Turtles & Coral Reefs',
    duration: '00:15',
    category: 'Nature',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'nature_ocean',
    unlockCost: 10,
    isLocked: false,
    description: 'Dive under the blue sea and swim with colorful fishes, playful dolphins, and sea turtles.',
  },

  // ── 4. Rhymes (🎵) ──────────────────────────────────────────────────────────
  {
    id: 'vid-rhymes-1',
    title: 'ABC Learning Song',
    subtitle: 'Sing along from A to Z!',
    duration: '00:15',
    category: 'Rhymes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'rhymes_abc',
    unlockCost: 10,
    isLocked: false,
    description: 'A fun musical rhythm for kids to master the English alphabet phonics.',
  },
  {
    id: 'vid-rhymes-2',
    title: 'Twinkle Twinkle Little Star',
    subtitle: 'Soothing musical nursery rhyme',
    duration: '00:15',
    category: 'Rhymes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'rhymes_star',
    unlockCost: 10,
    isLocked: false,
    description: 'Sing along to the beloved bedtime star rhyme with sparkling animations.',
  },
  {
    id: 'vid-rhymes-3',
    title: 'Wheels on the Bus',
    subtitle: 'Go round and round all through town',
    duration: '00:15',
    category: 'Rhymes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'rhymes_bus',
    unlockCost: 10,
    isLocked: false,
    description: 'Join the happy yellow bus ride! Wipers swish, horn goes beep, and kids laugh.',
  },

  // ── 5. Educational Learning (📚) ──────────────────────────────────────────
  {
    id: 'vid-edu-1',
    title: 'Counting Numbers 1 to 10',
    subtitle: 'Easy counting for smart kids',
    duration: '00:15',
    category: 'Educational Learning',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'edu_numbers',
    unlockCost: 10,
    isLocked: false,
    description: 'Count apples, balloons, and stars from 1 to 10 with clear speech practice!',
  },
  {
    id: 'vid-edu-2',
    title: 'Colors & Shapes Adventure',
    subtitle: 'Red, Blue, Circles & Triangles',
    duration: '00:15',
    category: 'Educational Learning',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'edu_shapes',
    unlockCost: 10,
    isLocked: false,
    description: 'Identify basic geometric shapes and bright colors around our everyday world.',
  },
  {
    id: 'vid-edu-3',
    title: 'Solar System & Planets',
    subtitle: 'Explore Sun, Earth & Mars',
    duration: '00:20',
    category: 'Educational Learning',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'edu_planets',
    unlockCost: 15,
    isLocked: true,
    unlockRequirement: 'Complete 10 Speech Cards to Unlock',
    description: 'Blast off into outer space to meet the 8 planets orbiting around the Sun!',
  },

  // ── 6. Motivational Kids Videos (🌈) ──────────────────────────────────────
  {
    id: 'vid-moti-1',
    title: 'Good Habits for Kids',
    subtitle: 'Brush teeth, wash hands & smile',
    duration: '00:15',
    category: 'Motivational Kids Videos',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'moti_habits',
    unlockCost: 10,
    isLocked: false,
    description: 'Build healthy daily routines! Learn hygiene, punctuality, and polite words.',
  },
  {
    id: 'vid-moti-2',
    title: 'Never Give Up & Try Your Best',
    subtitle: 'Encouraging words for little stars',
    duration: '00:15',
    category: 'Motivational Kids Videos',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'moti_try',
    unlockCost: 10,
    isLocked: false,
    description: 'Mistakes help us learn. Keep practicing your words with confidence and courage!',
  },
  {
    id: 'vid-moti-3',
    title: 'Kindness & Sharing is Caring',
    subtitle: 'Spread happiness with friends',
    duration: '00:15',
    category: 'Motivational Kids Videos',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailType: 'moti_kindness',
    unlockCost: 10,
    isLocked: false,
    description: 'Discover how simple acts of kindness and sharing toys make everyone feel loved.',
  },
]

export const CONTINUE_WATCHING_VIDEOS: VideoItem[] = [
  ALL_REWARD_VIDEOS[0],
  ALL_REWARD_VIDEOS[4],
  ALL_REWARD_VIDEOS[7],
  ALL_REWARD_VIDEOS[10],
]

export const MORE_CULTURE_VIDEOS: VideoItem[] = ALL_REWARD_VIDEOS.slice(1)
