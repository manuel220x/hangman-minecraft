import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Gallows } from './components/Gallows'
import { Hearts } from './components/Hearts'
import { Keyboard } from './components/Keyboard'
import { DICT, type UiLang } from './i18n'
import { normalizeLetter, pickWord, type WordEntry } from './words'

const MAX_WRONG = 7
const STATS_KEY = 'hangman-minecraft-stats'

interface Stats {
  wins: number
  losses: number
  streak: number
  best: number
}

const EMPTY_STATS: Stats = { wins: 0, losses: 0, streak: 0, best: 0 }

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (!raw) return EMPTY_STATS
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return EMPTY_STATS
    const s = parsed as Partial<Stats>
    return {
      wins: Number(s.wins) || 0,
      losses: Number(s.losses) || 0,
      streak: Number(s.streak) || 0,
      best: Number(s.best) || 0,
    }
  } catch {
    return EMPTY_STATS
  }
}

function saveStats(stats: Stats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    /* private mode — stats just won't persist */
  }
}

function puzzleLetters(entry: WordEntry): string[] {
  return normalizeLetter(entry.word).split('')
}

export default function App() {
  const [uiLang, setUiLang] = useState<UiLang>('es')
  const [entry, setEntry] = useState<WordEntry>(() => pickWord())
  const [guessed, setGuessed] = useState<Set<string>>(() => new Set())
  const [stats, setStats] = useState<Stats>(() => loadStats())

  const t = DICT[uiLang]

  const letters = useMemo(() => puzzleLetters(entry), [entry])
  const uniqueLetters = useMemo(() => new Set(letters), [letters])

  const correctGuessed = useMemo(() => {
    const set = new Set<string>()
    for (const l of uniqueLetters) if (guessed.has(l)) set.add(l)
    return set
  }, [guessed, uniqueLetters])

  const wrongGuesses = useMemo(() => {
    let n = 0
    for (const l of guessed) if (!uniqueLetters.has(l)) n += 1
    return n
  }, [guessed, uniqueLetters])

  const lost = wrongGuesses >= MAX_WRONG
  const won = !lost && correctGuessed.size === uniqueLetters.size
  const over = won || lost

  const recordedRef = useRef<WordEntry | null>(null)

  const recordResult = useCallback((result: 'win' | 'lose') => {
    setStats((prev) => {
      const streak = result === 'win' ? prev.streak + 1 : 0
      const next: Stats = {
        wins: prev.wins + (result === 'win' ? 1 : 0),
        losses: prev.losses + (result === 'lose' ? 1 : 0),
        streak,
        best: Math.max(prev.best, streak),
      }
      saveStats(next)
      return next
    })
  }, [])

  const newGame = useCallback(() => {
    setEntry((prev) => pickWord(prev))
    setGuessed(new Set())
  }, [])

  const guess = useCallback(
    (raw: string) => {
      const letter = normalizeLetter(raw)
      if (!/^[a-zñ]$/.test(letter)) return
      setGuessed((prev) => {
        if (prev.has(letter)) return prev
        let wrongSoFar = 0
        for (const l of prev) if (!uniqueLetters.has(l)) wrongSoFar += 1
        if (wrongSoFar >= MAX_WRONG) return prev
        let allFound = true
        for (const l of uniqueLetters) {
          if (!prev.has(l)) {
            allFound = false
            break
          }
        }
        if (allFound) return prev
        const next = new Set(prev)
        next.add(letter)
        return next
      })
    },
    [uniqueLetters],
  )

  useEffect(() => {
    if (!over || recordedRef.current === entry) return
    recordedRef.current = entry
    recordResult(won ? 'win' : 'lose')
  }, [over, won, entry, recordResult])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Enter' && over) {
        newGame()
        return
      }
      guess(e.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [guess, newGame, over])

  return (
    <div className="scene">
      <div className="clouds" aria-hidden="true">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      <header className="topbar">
        <div className="brand">
          <h1 className="brand-title">{t.title}</h1>
          <p className="brand-sub">{t.subtitle}</p>
        </div>
        <div className="lang-switch" role="group" aria-label="UI language">
          <button
            type="button"
            className={`chip${uiLang === 'es' ? ' chip-active' : ''}`}
            onClick={() => setUiLang('es')}
            aria-pressed={uiLang === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            className={`chip${uiLang === 'en' ? ' chip-active' : ''}`}
            onClick={() => setUiLang('en')}
            aria-pressed={uiLang === 'en'}
          >
            EN
          </button>
        </div>
      </header>

      <main className="panel">
        <section className="panel-top">
          <div className="stage">
            <Gallows wrong={wrongGuesses} lost={lost} />
          </div>
          <div className="side">
            <Hearts total={MAX_WRONG} remaining={MAX_WRONG - wrongGuesses} label={t.lives} />
            <ul className="stats">
              <li>
                <span className="stat-label">{t.wins}</span>
                <span className="stat-value">{stats.wins}</span>
              </li>
              <li>
                <span className="stat-label">{t.losses}</span>
                <span className="stat-value">{stats.losses}</span>
              </li>
              <li>
                <span className="stat-label">{t.streak}</span>
                <span className="stat-value">{stats.streak}</span>
              </li>
              <li>
                <span className="stat-label">{t.best}</span>
                <span className="stat-value">{stats.best}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="word-area" aria-label="Word">
          <div className="word-meta">
            <span className="badge">{entry.lang.toUpperCase()}</span>
            <span className="hint">
              {t.hintLabel}: <strong>{entry.hint}</strong>
            </span>
          </div>
          <div className="word">
            {letters.map((letter, i) => {
              const revealed = guessed.has(letter) || over
              return (
                <span key={`${letter}-${i}`} className={`tile${revealed ? ' tile-open' : ''}`}>
                  {revealed ? letter : ''}
                </span>
              )
            })}
          </div>
          <p className="status" role="status">
            {won && <span className="status-win">{t.youWon}</span>}
            {lost && (
              <span className="status-lose">
                {t.youLost} — {t.wordWas} <strong>{entry.word}</strong>
              </span>
            )}
            {!over && <span className="status-play">{t.keyboardHelp}</span>}
          </p>
          {over && (
            <button type="button" className="btn btn-primary" onClick={newGame} autoFocus>
              {t.playAgain}
            </button>
          )}
        </section>

        <Keyboard guessed={guessed} correct={correctGuessed} disabled={over} onGuess={guess} />
      </main>

      <footer className="footer">{t.footer}</footer>
      <div className="ground" aria-hidden="true" />
    </div>
  )
}
