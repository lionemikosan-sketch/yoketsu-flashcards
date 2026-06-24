import { useMemo } from 'react';
import type { Progress, Session, GradeStatus } from '../types';
import { STATUS_META } from '../lib/status';
import { Ic, ICON } from '../components/Icon';

interface Props {
  session: Session;
  progress: Progress;
  onReplayForgot: (keys: string[]) => void;
  onRestart: () => void;
  onHome: () => void;
}

// セッション終了時のミニ達成演出
export function DoneOverlay({ session, progress, onReplayForgot, onRestart, onHome }: Props) {
  const results = session.results;
  const vals = Object.values(results);
  const cnt: Record<GradeStatus, number> = { forgot: 0, good: 0, perfect: 0 };
  vals.forEach((v) => { cnt[v]++; });
  const forgotKeys = Object.entries(results).filter(([, v]) => v === 'forgot').map(([k]) => k);

  const confetti = useMemo(() => {
    const colors = ['#e9c46a', '#7dd3c0', '#fb7185', '#56b8f0', '#a3e635'];
    return Array.from({ length: 90 }).map((_, i) => ({
      left: Math.random() * 100,
      bg: colors[i % colors.length],
      dur: 2.2 + Math.random() * 2.2,
      delay: Math.random() * 1.2,
      rot: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="overlay">
      <div className="done fadein">
        {confetti.map((c, i) => (
          <span key={i} className="confetti" style={{
            left: `${c.left}%`, background: c.bg,
            animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`,
            transform: `rotate(${c.rot}deg)`,
          }} />
        ))}
        <div className="seal"><Ic d={ICON.check} s={36} sw={3} /></div>
        <h2>セッション完了！</h2>
        <p>
          {session.source === 'review' ? '弱点の復習' : 'このデッキ'}を{vals.length}枚やりきりました
          {progress.stats.streak > 1 ? ` ・ ${progress.stats.streak}日連続` : ''}
        </p>
        <div className="done-stats">
          <div className="ds"><b style={{ color: STATUS_META.forgot.hex }}>{cnt.forgot}</b><span>忘れた</span></div>
          <div className="ds"><b style={{ color: STATUS_META.good.hex }}>{cnt.good}</b><span>覚えた</span></div>
          <div className="ds"><b style={{ color: STATUS_META.perfect.hex }}>{cnt.perfect}</b><span>完璧</span></div>
        </div>
        {forgotKeys.length > 0 && (
          <button className="cta" onClick={() => onReplayForgot(forgotKeys)}>
            <Ic d={ICON.refresh} s={16} /> 忘れたカードをもう一周（{forgotKeys.length}枚）
          </button>
        )}
        <button className="ghost-btn" onClick={onRestart}><Ic d={ICON.refresh} s={15} /> 同じ条件でもう一度</button>
        <button className="ghost-btn" onClick={onHome}>ホームへ戻る</button>
      </div>
    </div>
  );
}
