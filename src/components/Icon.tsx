// 軽量な線アイコン（依存ライブラリなし）
export const ICON = {
  play: 'M6 4l14 8-14 8z',
  refresh: 'M3 12a9 9 0 1 1 3 6.7M3 19v-4h4',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  x: 'M6 6l12 12M18 6L6 18',
  back: 'M15 18l-6-6 6-6',
  fwd: 'M9 18l6-6-6-6',
  flip: 'M4 7h13l-3-3M20 17H7l3 3',
  check: 'M5 12l4 4 8-9',
} as const;

export type IconName = keyof typeof ICON;

interface IcProps { d: string; s?: number; sw?: number; }

export function Ic({ d, s = 18, sw = 2 }: IcProps) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18.5" stroke="#e9c46a" strokeWidth="1.2" opacity=".55" />
      <circle cx="20" cy="20" r="12.5" stroke="#7dd3c0" strokeWidth="1.2" opacity=".7" />
      <circle cx="20" cy="20" r="4.4" fill="#e9c46a" />
      <path d="M20 1.5v7M20 31.5v7M1.5 20h7M31.5 20h7" stroke="#7dd3c0" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
