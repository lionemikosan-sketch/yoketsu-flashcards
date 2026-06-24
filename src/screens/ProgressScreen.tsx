import { useMemo } from 'react';
import type { Progress, Status } from '../types';
import { CARDS } from '../data/cards';
import { MERIDIANS, MERIDIAN_ORDER } from '../data/meridians';
import { STATUS_META, NEW_HEX, statusOf } from '../lib/status';
import { todayKey } from '../lib/format';
import { Ic, ICON } from '../components/Icon';
import { Ring } from '../components/Ring';

interface Props {
  progress: Progress;
  onReview: () => void;
  onReset: () => void;
}

export function ProgressScreen({ progress, onReview, onReset }: Props) {
  const counts = useMemo(() => {
    const c: Record<Status, number> = { new: 0, forgot: 0, good: 0, perfect: 0 };
    CARDS.forEach((card) => { c[statusOf(progress, card.id)]++; });
    return c;
  }, [progress]);

  const total = CARDS.length;
  const masteredPct = Math.round(((counts.good + counts.perfect) / total) * 100);
  const todayCount = progress.stats.todayDate === todayKey() ? progress.stats.todayCount : 0;

  const perMer = MERIDIAN_ORDER.map((m) => {
    const cs = CARDS.filter((c) => c.meridian === m);
    const c: Record<Status, number> = { new: 0, forgot: 0, good: 0, perfect: 0 };
    cs.forEach((card) => { c[statusOf(progress, card.id)]++; });
    return { m, total: cs.length, c, pct: Math.round(((c.good + c.perfect) / cs.length) * 100) };
  });

  const weak = useMemo(() =>
    CARDS.map((card) => ({ card, n: progress.cards[card.id]?.forgotCount ?? 0 }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 5),
    [progress]);

  return (
    <div className="fadein">
      <div className="prog-hero">
        <div className="ring-wrap">
          <Ring size={108} stroke={13} segments={[
            { value: counts.perfect, color: STATUS_META.perfect.hex },
            { value: counts.good, color: STATUS_META.good.hex },
            { value: counts.forgot, color: STATUS_META.forgot.hex },
          ]} />
          <div className="ring-center"><b>{masteredPct}%</b><span>習得率</span></div>
        </div>
        <div className="stats">
          <div className="legend"><span className="sw" style={{ background: NEW_HEX }} /><span>未学習</span><b>{counts.new}</b></div>
          <div className="legend"><span className="sw" style={{ background: STATUS_META.forgot.hex }} /><span>忘れた</span><b>{counts.forgot}</b></div>
          <div className="legend"><span className="sw" style={{ background: STATUS_META.good.hex }} /><span>覚えた</span><b>{counts.good}</b></div>
          <div className="legend"><span className="sw" style={{ background: STATUS_META.perfect.hex }} /><span>完璧</span><b>{counts.perfect}</b></div>
        </div>
      </div>

      <div className="mini-row" style={{ marginTop: 13 }}>
        <div className="mini"><b>{total - counts.new}/{total}</b><span>学習済み</span></div>
        <div className="mini"><b>{todayCount}</b><span>今日の枚数</span></div>
        <div className="mini"><b className="fire">{progress.stats.streak || 0}<span style={{ fontSize: 13 }}> 日</span></b><span>連続学習</span></div>
      </div>

      <div className="sec">
        <p className="sec-label">経絡別の達成率</p>
        {perMer.map(({ m, total: t, c, pct }) => {
          const M = MERIDIANS[m];
          return (
            <div className="mrow" key={m}>
              <div className="h">
                <span className="dot" style={{ background: M.color }} />
                <span className="nm">{M.short}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', marginLeft: 6 }}>{M.name}</span>
                <span className="pct">{pct}%</span>
              </div>
              <div className="sbar">
                <i style={{ width: `${(c.perfect / t) * 100}%`, background: STATUS_META.perfect.hex }} />
                <i style={{ width: `${(c.good / t) * 100}%`, background: STATUS_META.good.hex }} />
                <i style={{ width: `${(c.forgot / t) * 100}%`, background: STATUS_META.forgot.hex }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="sec">
        <p className="sec-label">苦手カードランキング</p>
        {weak.length === 0 ? (
          <div className="mrow" style={{ textAlign: 'center', color: 'var(--ink-dim)', fontSize: 13, padding: 20 }}>
            まだ「忘れた」の記録はありません
          </div>
        ) : (
          weak.map(({ card, n }, i) => {
            const M = MERIDIANS[card.meridian];
            return (
              <div className="weak-row" key={card.id}>
                <span className="rk">{i + 1}</span>
                <span className="dot" style={{ width: 9, height: 9, borderRadius: '50%', background: M.color }} />
                <span className="wn mincho">{card.pointName}</span>
                <span className="wc">{card.code}・{M.short}</span>
                <span className="wb">× {n}</span>
              </div>
            );
          })
        )}
      </div>

      <div className="sec">
        <button className="review-btn" disabled={!counts.forgot} onClick={onReview}>
          <span className="ico"><Ic d={ICON.refresh} s={18} /></span>
          <span><div className="t1">忘れたカードを復習</div><div className="t2">{counts.forgot}枚の弱点を回す</div></span>
          <span className="num">{counts.forgot}</span>
        </button>
        <button className="danger-btn" onClick={onReset}>すべての学習状態をリセット</button>
      </div>
    </div>
  );
}
