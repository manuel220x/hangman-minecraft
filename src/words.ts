export type WordLang = 'en' | 'es'

export interface WordEntry {
  /** Lowercase, no accented vowels (keyboard covers a-z + ñ). */
  word: string
  lang: WordLang
  /** Category hint shown in the word's own language. */
  hint: string
}

export const WORDS: WordEntry[] = [
  { word: 'diamante', lang: 'es', hint: 'mineral' },
  { word: 'esmeralda', lang: 'es', hint: 'gema' },
  { word: 'castillo', lang: 'es', hint: 'construcción' },
  { word: 'montaña', lang: 'es', hint: 'naturaleza' },
  { word: 'serpiente', lang: 'es', hint: 'animal' },
  { word: 'mariposa', lang: 'es', hint: 'animal' },
  { word: 'elefante', lang: 'es', hint: 'animal' },
  { word: 'jirafa', lang: 'es', hint: 'animal' },
  { word: 'cucaracha', lang: 'es', hint: 'animal' },
  { word: 'caballo', lang: 'es', hint: 'animal' },
  { word: 'gallina', lang: 'es', hint: 'animal' },
  { word: 'abeja', lang: 'es', hint: 'animal' },
  { word: 'ballena', lang: 'es', hint: 'animal' },
  { word: 'cangrejo', lang: 'es', hint: 'animal' },
  { word: 'rinoceronte', lang: 'es', hint: 'animal' },
  { word: 'computadora', lang: 'es', hint: 'tecnología' },
  { word: 'guitarra', lang: 'es', hint: 'música' },
  { word: 'invierno', lang: 'es', hint: 'estación' },
  { word: 'tormenta', lang: 'es', hint: 'clima' },
  { word: 'aventura', lang: 'es', hint: 'idea' },
  { word: 'dinamita', lang: 'es', hint: 'explosivo' },
  { word: 'zanahoria', lang: 'es', hint: 'comida' },
  { word: 'manzana', lang: 'es', hint: 'comida' },
  { word: 'sombrero', lang: 'es', hint: 'ropa' },
  { word: 'ventana', lang: 'es', hint: 'casa' },
  { word: 'semilla', lang: 'es', hint: 'planta' },
  { word: 'esqueleto', lang: 'es', hint: 'monstruo' },
  { word: 'herramienta', lang: 'es', hint: 'objeto' },
  { word: 'laberinto', lang: 'es', hint: 'juego' },
  { word: 'pirata', lang: 'es', hint: 'personaje' },
  { word: 'creeper', lang: 'en', hint: 'monster' },
  { word: 'enderman', lang: 'en', hint: 'monster' },
  { word: 'skeleton', lang: 'en', hint: 'monster' },
  { word: 'pickaxe', lang: 'en', hint: 'tool' },
  { word: 'diamond', lang: 'en', hint: 'mineral' },
  { word: 'emerald', lang: 'en', hint: 'gem' },
  { word: 'redstone', lang: 'en', hint: 'mineral' },
  { word: 'crafting', lang: 'en', hint: 'action' },
  { word: 'furnace', lang: 'en', hint: 'block' },
  { word: 'torch', lang: 'en', hint: 'item' },
  { word: 'lantern', lang: 'en', hint: 'item' },
  { word: 'treasure', lang: 'en', hint: 'reward' },
  { word: 'dragon', lang: 'en', hint: 'monster' },
  { word: 'knight', lang: 'en', hint: 'character' },
  { word: 'wizard', lang: 'en', hint: 'character' },
  { word: 'volcano', lang: 'en', hint: 'nature' },
  { word: 'glacier', lang: 'en', hint: 'nature' },
  { word: 'thunder', lang: 'en', hint: 'weather' },
  { word: 'blizzard', lang: 'en', hint: 'weather' },
  { word: 'mushroom', lang: 'en', hint: 'nature' },
  { word: 'pumpkin', lang: 'en', hint: 'food' },
  { word: 'butterfly', lang: 'en', hint: 'animal' },
  { word: 'dolphin', lang: 'en', hint: 'animal' },
  { word: 'penguin', lang: 'en', hint: 'animal' },
  { word: 'giraffe', lang: 'en', hint: 'animal' },
  { word: 'scorpion', lang: 'en', hint: 'animal' },
  { word: 'octopus', lang: 'en', hint: 'animal' },
  { word: 'rainbow', lang: 'en', hint: 'nature' },
  { word: 'sandwich', lang: 'en', hint: 'food' },
  { word: 'adventure', lang: 'en', hint: 'idea' },
]

/** Normalizes keyboard input so accented vowels match unaccented puzzle letters. */
export function normalizeLetter(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function pickWord(previous?: WordEntry): WordEntry {
  let candidate = WORDS[Math.floor(Math.random() * WORDS.length)]
  while (previous && candidate.word === previous.word && WORDS.length > 1) {
    candidate = WORDS[Math.floor(Math.random() * WORDS.length)]
  }
  return candidate
}
