export interface SpeechSentence {
  id: string
  sentence: string
  highlightedWords: string[]
  level: 'Easy' | 'Medium' | 'Hard'
  category: string
  illustrationKey: string
  targetPhonetics: string
}

export const SPEECH_SENTENCES: SpeechSentence[] = [
  {
    id: 'sp-1',
    sentence: 'The cat is sitting on the mat.',
    highlightedWords: ['cat', 'mat'],
    level: 'Easy',
    category: 'Animals',
    illustrationKey: 'cat',
    targetPhonetics: '/ðə kæt ɪz ˈsɪt.ɪŋ ɒn ðə mæt/',
  },
  {
    id: 'sp-2',
    sentence: 'The friendly elephant waved its trunk.',
    highlightedWords: ['elephant', 'trunk'],
    level: 'Easy',
    category: 'Animals',
    illustrationKey: 'elephant',
    targetPhonetics: '/ðə ˈfrend.li ˈel.ɪ.fənt weɪvd ɪts trʌŋk/',
  },
  {
    id: 'sp-3',
    sentence: 'Rahul took a crunchy bite of the red apple.',
    highlightedWords: ['apple', 'crunchy'],
    level: 'Easy',
    category: 'Food & Drinks',
    illustrationKey: 'apple',
    targetPhonetics: '/ˈæp.əl ˈkrʌn.tʃi/',
  },
  {
    id: 'sp-4',
    sentence: 'The shiny red car zoomed down the road.',
    highlightedWords: ['car', 'zoomed'],
    level: 'Easy',
    category: 'Transport',
    illustrationKey: 'car',
    targetPhonetics: '/ðə ˈʃaɪ.ni red kɑːr zuːmd/',
  },
  {
    id: 'sp-5',
    sentence: 'Monkeys love climbing high in green trees.',
    highlightedWords: ['Monkeys', 'trees'],
    level: 'Medium',
    category: 'Animals',
    illustrationKey: 'monkey',
    targetPhonetics: '/ˈmʌŋ.kiːz lʌv ˈklaɪ.mɪŋ/',
  },
  {
    id: 'sp-6',
    sentence: 'Clear speech helps us share ideas with confidence.',
    highlightedWords: ['speech', 'confidence'],
    level: 'Hard',
    category: 'Communication',
    illustrationKey: 'face',
    targetPhonetics: '/klɪər spiːtʃ helps ʌs ʃeər/',
  },
]
