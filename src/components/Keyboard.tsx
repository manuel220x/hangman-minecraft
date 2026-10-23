import { KEY_ROWS } from '../alphabet'

interface KeyboardProps {
  guessed: Set<string>
  correct: Set<string>
  disabled: boolean
  onGuess: (letter: string) => void
}

export function Keyboard({ guessed, correct, disabled, onGuess }: KeyboardProps) {
  return (
    <div className="keyboard" role="group" aria-label="Keyboard">
      {KEY_ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((letter) => {
            const used = guessed.has(letter)
            const hit = correct.has(letter)
            return (
              <button
                key={letter}
                type="button"
                className={`key${used ? (hit ? ' key-correct' : ' key-wrong') : ''}`}
                disabled={used || disabled}
                onClick={() => onGuess(letter)}
                aria-label={letter}
              >
                {letter}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
