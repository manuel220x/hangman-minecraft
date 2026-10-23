export type UiLang = 'es' | 'en'

interface Dict {
  title: string
  subtitle: string
  lives: string
  wins: string
  losses: string
  streak: string
  best: string
  youWon: string
  youLost: string
  wordWas: string
  playAgain: string
  keepStreak: string
  streakLost: string
  hintLabel: string
  keyboardHelp: string
  footer: string
}

export const DICT: Record<UiLang, Dict> = {
  es: {
    title: 'AHORCADO',
    subtitle: 'Edicion Minecraft',
    lives: 'Vidas',
    wins: 'Victorias',
    losses: 'Derrotas',
    streak: 'Racha',
    best: 'Mejor racha',
    youWon: '¡Ganaste!',
    youLost: '¡Perdiste!',
    wordWas: 'La palabra era',
    playAgain: 'Jugar de nuevo',
    keepStreak: '¡Racha en aumento!',
    streakLost: 'Racha perdida',
    hintLabel: 'Pista',
    keyboardHelp: 'Toca las letras o usa tu teclado',
    footer: 'Hecho con bloques y cariño',
  },
  en: {
    title: 'HANGMAN',
    subtitle: 'Minecraft Edition',
    lives: 'Lives',
    wins: 'Wins',
    losses: 'Losses',
    streak: 'Streak',
    best: 'Best streak',
    youWon: 'You won!',
    youLost: 'You lost!',
    wordWas: 'The word was',
    playAgain: 'Play again',
    keepStreak: 'Streak keeps growing!',
    streakLost: 'Streak lost',
    hintLabel: 'Hint',
    keyboardHelp: 'Tap the letters or use your keyboard',
    footer: 'Made with blocks and love',
  },
}
