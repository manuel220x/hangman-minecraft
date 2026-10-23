interface HeartsProps {
  total: number
  remaining: number
  label: string
}

const HEART_ROWS: Array<[number, number, number]> = [
  [2, 2, 4],
  [1, 4, 6],
  [0, 6, 7],
  [0, 6, 7],
  [1, 4, 6],
  [2, 2, 4],
  [3, 0, 2],
]

function Heart({ full }: { full: boolean }) {
  return (
    <svg className="heart" viewBox="0 0 7 7" aria-hidden="true" shapeRendering="crispEdges">
      {HEART_ROWS.map(([y, x, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={1} fill={full ? '#e0342c' : '#2b2b2b'} />
      ))}
    </svg>
  )
}

export function Hearts({ total, remaining, label }: HeartsProps) {
  return (
    <div className="hearts" aria-label={`${label}: ${remaining}/${total}`}>
      <span className="hearts-label">{label}</span>
      <div className="hearts-row">
        {Array.from({ length: total }, (_, i) => (
          <Heart key={i} full={i < remaining} />
        ))}
      </div>
    </div>
  )
}
