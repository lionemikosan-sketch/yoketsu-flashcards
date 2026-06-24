import { useEffect } from 'react';
import type { Progress, Session, GradeStatus } from '../types';
import { STATUS_META, statusOf } from '../lib/status';
import { Ic, ICON } from '../components/Icon';
import { FlipCard } from '../components/FlipCard';
import { DoneOverlay } from './DoneOverlay';

interface Props {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  progress: Progress;
  gradeCurrent: (status: GradeStatus) => void;
  onExit: () => void;
  onReplayForgot: (keys: string[]) => void;
  onRestart: () => void;
  onHome: () => void;
}

export function StudyScreen({ session, setSession, progress, gradeCurrent, onExit, onReplayForgot, onRestart, onHome }: Props) {
  const { deck, index } = session;
  const done = index >= deck.length;

  const flip = () => setSession((s) => (s ? { ...s, flipped: !s.flipped } : s));
  const go = (dir: number) =>
    setSession((s) => {
      if (!s) return s;
      const ni = Math.min(Math.max(s.index + dir, 0), deck.length);
      return { ...s, index: ni, flipped: false };
    });

  // キーボード操作（PC）
  useEffect(() => {
    if (done) return;
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); flip(); }
      else if (e.code === 'ArrowLeft') go(-1);
      else if (e.code === 'ArrowRight') go(1);
      else if (e.key === '1') gradeCurrent('forgot');
      else if (e.key === '2') gradeCurrent('good');
      else if (e.key === '3') gradeCurrent('perfect');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  if (done) {
    return (
      <DoneOverlay session={session} progress={progress}
        onReplayForgot={onReplayForgot} onRestart={onRestart} onHome={onHome} />
    );
  }

  const item = deck[index];
  const curStatus = item.type === 'A' ? statusOf(progress, item.card.id) : null;
  const pct = Math.round((index / deck.length) * 100);

  return (
    <div className="fadein">
      <div className="study-top">
        <button className="x-btn" onClick={onExit} aria-label="閉じる"><Ic d={ICON.x} s={16} /></button>
        <div className="pbar"><i style={{ width: `${pct}%` }} /></div>
        <span className="counter">{index + 1} / {deck.length}</span>
      </div>

      <FlipCard key={item.key} item={item} flipped={session.flipped} onFlip={flip} />

      <div className="nav-row">
        <button className="nav-btn" disabled={index === 0} onClick={() => go(-1)} aria-label="前へ"><Ic d={ICON.back} s={20} /></button>
        <button className="flip-cue" onClick={flip}>
          <Ic d={ICON.flip} s={16} /> {session.flipped ? '問題に戻る' : '答えを見る'}
        </button>
        <button className="nav-btn" onClick={() => go(1)} aria-label="次へ"><Ic d={ICON.fwd} s={20} /></button>
      </div>

      <div className="status-row">
        {(Object.entries(STATUS_META) as [GradeStatus, typeof STATUS_META[GradeStatus]][]).map(([k, m]) => (
          <button key={k} className={'sbtn' + (curStatus === k ? ' cur' : '')}
            style={{
              ['--cc' as string]: m.color,
              ['--bc' as string]: `color-mix(in srgb, ${m.hex} 40%, transparent)`,
              ['--bgc' as string]: `color-mix(in srgb, ${m.hex} 12%, transparent)`,
            }}
            onClick={() => gradeCurrent(k)}>
            {m.label}<span className="k">{m.key}キー</span>
          </button>
        ))}
      </div>
      <p className="status-note">
        {item.type === 'B' ? '記録すると該当する経穴すべてに反映されます' : '記録すると自動で次のカードへ進みます'}
        ・ Space＝めくる / ←→＝移動
      </p>
    </div>
  );
}
