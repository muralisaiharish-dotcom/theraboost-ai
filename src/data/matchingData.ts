export interface MatchingCardData {
  key: string
  name: string
  category: 'Animals' | 'Fruits' | 'Vehicles'
  emoji: string
}

export const MATCHING_ITEMS: MatchingCardData[] = [
  // Animals
  { key: 'dog', name: 'Dog', category: 'Animals', emoji: '🐶' },
  { key: 'cat', name: 'Cat', category: 'Animals', emoji: '🐱' },
  { key: 'elephant', name: 'Elephant', category: 'Animals', emoji: '🐘' },
  { key: 'lion', name: 'Lion', category: 'Animals', emoji: '🦁' },
  { key: 'tiger', name: 'Tiger', category: 'Animals', emoji: '🐯' },
  { key: 'rabbit', name: 'Rabbit', category: 'Animals', emoji: '🐰' },
  { key: 'panda', name: 'Panda', category: 'Animals', emoji: '🐼' },
  { key: 'monkey', name: 'Monkey', category: 'Animals', emoji: '🐵' },
  { key: 'cow', name: 'Cow', category: 'Animals', emoji: '🐄' },
  { key: 'horse', name: 'Horse', category: 'Animals', emoji: '🐴' },
  // Fruits
  { key: 'apple', name: 'Apple', category: 'Fruits', emoji: '🍎' },
  { key: 'banana', name: 'Banana', category: 'Fruits', emoji: '🍌' },
  { key: 'mango', name: 'Mango', category: 'Fruits', emoji: '🥭' },
  // Vehicles
  { key: 'car', name: 'Car', category: 'Vehicles', emoji: '🚗' },
  { key: 'bus', name: 'Bus', category: 'Vehicles', emoji: '🚌' },
  { key: 'train', name: 'Train', category: 'Vehicles', emoji: '🚆' },
]
