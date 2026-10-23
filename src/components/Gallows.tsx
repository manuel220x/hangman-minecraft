interface GallowsProps {
  /** Number of wrong guesses so far (0-7). */
  wrong: number
  lost: boolean
}

const WOOD = '#7c4a24'
const WOOD_DARK = '#5b3418'
const ROPE = '#c8a165'
const SKIN = '#e8b88a'
const SHIRT = '#3aa8c8'
const PANTS = '#3a56c8'
const OUTLINE = '#1d1d1d'

/**
 * Pixel-art gallows, drawn on a 12x14 grid (unit = 8px).
 * The gallows is always visible; body parts appear with each wrong guess:
 * 1 head, 2 body, 3 left arm, 4 right arm, 5 left leg, 6 right leg, 7 dead face.
 */
export function Gallows({ wrong, lost }: GallowsProps) {
  return (
    <svg
      className="gallows"
      viewBox="0 0 96 112"
      role="img"
      aria-label={`Gallows, ${wrong} wrong guesses`}
      shapeRendering="crispEdges"
    >
      <rect x="8" y="100" width="72" height="8" fill={WOOD_DARK} />
      <rect x="8" y="96" width="72" height="8" fill={WOOD} />
      <rect x="16" y="12" width="8" height="84" fill={WOOD} />
      <rect x="16" y="12" width="56" height="8" fill={WOOD} />
      <rect x="24" y="20" width="8" height="8" fill={WOOD_DARK} />
      <rect x="32" y="28" width="8" height="8" fill={WOOD_DARK} />
      <rect x="40" y="36" width="8" height="8" fill={WOOD_DARK} />
      <rect x="64" y="20" width="8" height="12" fill={ROPE} />

      {wrong >= 1 && (
        <>
          <rect x="56" y="32" width="24" height="24" fill={OUTLINE} />
          <rect x="60" y="36" width="16" height="16" fill={SKIN} />
          {lost ? (
            <>
              <rect x="62" y="40" width="4" height="4" fill={OUTLINE} />
              <rect x="70" y="40" width="4" height="4" fill={OUTLINE} />
              <rect x="64" y="48" width="8" height="2" fill={OUTLINE} />
            </>
          ) : (
            <>
              <rect x="63" y="41" width="3" height="3" fill={OUTLINE} />
              <rect x="70" y="41" width="3" height="3" fill={OUTLINE} />
            </>
          )}
        </>
      )}

      {wrong >= 2 && (
        <>
          <rect x="58" y="56" width="20" height="28" fill={OUTLINE} />
          <rect x="62" y="58" width="12" height="24" fill={SHIRT} />
        </>
      )}

      {wrong >= 3 && <rect x="46" y="58" width="16" height="8" fill={SHIRT} />}
      {wrong >= 4 && <rect x="74" y="58" width="16" height="8" fill={SHIRT} />}

      {wrong >= 5 && (
        <>
          <rect x="62" y="84" width="8" height="16" fill={PANTS} />
          <rect x="62" y="96" width="8" height="4" fill={OUTLINE} />
        </>
      )}
      {wrong >= 6 && (
        <>
          <rect x="72" y="84" width="8" height="16" fill={PANTS} />
          <rect x="72" y="96" width="8" height="4" fill={OUTLINE} />
        </>
      )}

      {wrong >= 7 && (
        <>
          <rect x="60" y="34" width="4" height="4" fill="#c0392b" />
          <rect x="72" y="34" width="4" height="4" fill="#c0392b" />
        </>
      )}
    </svg>
  )
}
