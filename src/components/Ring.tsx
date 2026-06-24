export interface RingSegment { value: number; color: string; }

interface RingProps { size?: number; stroke?: number; segments: RingSegment[]; }

// SVG ドーナツリング（習得状況の可視化）
export function Ring({ size = 84, stroke = 10, segments }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={stroke} />
      {segments.filter((s) => s.value > 0).map((s, i) => {
        const len = (s.value / total) * c;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={s.color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${Math.max(len - 2, 0)} ${c}`} strokeDashoffset={-offset} />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}
