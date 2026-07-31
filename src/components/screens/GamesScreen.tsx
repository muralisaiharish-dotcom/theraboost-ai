import { MatchingGame } from '../MatchingGame'

export function GamesScreen() {
  return (
    <div className="w-full h-full flex flex-col min-h-0 animate-slideUp">
      <MatchingGame />
    </div>
  )
}
