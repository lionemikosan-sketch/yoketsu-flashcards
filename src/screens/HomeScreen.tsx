import { useMemo } from 'react';
import type { Progress, Settings, Status } from '../types';
import { CARDS } from '../data/cards';
import { MERIDIANS, MERIDIAN_ORDER } from '../data/meridians';
import { STATUS_META, NEW_HEX, statusOf } from '../lib/status';
import { filterCards } from '../lib/deck';
import { todayKey } from '../lib/format';
import { Ic, ICON } from '../components/Icon';
import { Ring } from '../components/Ring';

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  progress: Progress;
  onStart: () => void;
  onReview: () => void;
  onProgress: () => void;
}

export function HomeScreen({ settings, setSettings, progress, onStart, onReview, onProgress }: Props) {
  const set = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));
  const toggleMer = (m: typeof MERIDIAN_ORDER[number]) =>
    setSettings((s) => {
      const next = s.meridians.includes(m) ? s.meridians.filter((x) => x !== m) : [...s.meridians, m];
      return { ...s, meridians: next.length ? next : s.meridians };
    });
  const allOn = settings.meridians.length === MERIDIAN_ORDER.length;

  const counts = useMemo(() => {
    const c: Record<Status, number> = { new: 0, forgot: 0, good: 0, perfect: 0 };
    CARDS.forEach((card) => { c[statusOf(progress, card.id)]++; });
    return c;
  }, [progress]);

  const total = CARDS.length;
  const studied = total - counts.new;
  const masteredPct = Math.round(((counts.good + counts.perfect) / total) * 100);
  const selCount = filterCards(settings.meridians).length;
  const todayCount = progress.stats.todayDate === todayKey() ? progress.stats.todayCount : 0;

  return (
    <div className="fadein">
      <div className="sec">
        <p className="sec-label">学習モード</p>
        <div className="seg">
          <button className={settings.mode === 'A' ? 'on' : ''} onClick={() => set({ mode: 'A' })}>
            経穴 → 要穴<span className="s2">経穴名から属性を答える</span>
          </button>
          <button className={settings.mode === 'B' ? 'on' : ''} onClick={() => set({ mode: 'B' })}>
            要穴 → 経穴<span className="s2">属性から該当経穴を答える</span>
          </button>
        </div>
      </div>

      <div className="sec">
        <p className="sec-label">経絡フィルター</p>
        <div className="chips">
          {MERIDIAN_ORDER.map((m) => {
            const M = MERIDIANS[m];
            const on = settings.meridians.includes(m);
            const n = CARDS.filter((c) => c.meridian === m).length;
            return (
              <button key={m} className={'chip' + (on ? ' on' : '')} style={{ ['--mc' as string]: M.color }} onClick={() => toggleMer(m)}>
                <span className="dot" style={{ background: M.color }} />
                <span>
                  <span className="nm">{M.short}</span>
                  <span className="meta">{M.limb}・{n}穴</span>
                </span>
                <span className="check"><Ic d={ICON.check} s={11} sw={3} /></span>
              </button>
            );
          })}
          <button className="chip-all" onClick={() => set({ meridians: [...MERIDIAN_ORDER] })}>
            <span>すべての経絡を対象にする</span>
            <span style={{ color: allOn ? 'var(--accent)' : 'inherit' }}>{allOn ? '選択中 ✓' : '全選択'}</span>
          </button>
        </div>
      </div>

      <div className="sec">
        <p className="sec-label">出題順</p>
        <div className="seg">
          <button className={settings.order === 'sequential' ? 'on' : ''} onClick={() => set({ order: 'sequential' })}>順番どおり</button>
          <button className={settings.order === 'random' ? 'on' : ''} onClick={() => set({ order: 'random' })}>ランダム</button>
        </div>
      </div>

      <div className="sec">
        <button className="cta" disabled={!selCount} onClick={onStart}>
          <Ic d={ICON.play} s={17} /> 学習を始める{settings.mode === 'A' ? `（${selCount}枚）` : '（属性別）'}
        </button>
        <button className="review-btn" disabled={!counts.forgot} onClick={onReview}>
          <span className="ico"><Ic d={ICON.refresh} s={18} /></span>
          <span>
            <div className="t1">忘れたカードを復習</div>
            <div className="t2">弱点だけを効率よく回す</div>
          </span>
          <span className="num">{counts.forgot}</span>
        </button>
      </div>

      <div className="sec">
        <p className="sec-label">学習状況</p>
        <div className="summary">
          <div className="ring-wrap">
            <Ring size={94} stroke={11} segments={[
              { value: counts.perfect, color: STATUS_META.perfect.hex },
              { value: counts.good, color: STATUS_META.good.hex },
              { value: counts.forgot, color: STATUS_META.forgot.hex },
            ]} />
            <div className="ring-center"><b>{masteredPct}%</b><span>習得</span></div>
          </div>
          <div className="stats">
            <div className="stat"><span className="sw" style={{ background: NEW_HEX }} /><span>未学習</span><b>{counts.new}</b></div>
            <div className="stat"><span className="sw" style={{ background: STATUS_META.forgot.hex }} /><span>忘れた</span><b>{counts.forgot}</b></div>
            <div className="stat"><span className="sw" style={{ background: STATUS_META.good.hex }} /><span>覚えた</span><b>{counts.good}</b></div>
            <div className="stat"><span className="sw" style={{ background: STATUS_META.perfect.hex }} /><span>完璧</span><b>{counts.perfect}</b></div>
          </div>
        </div>
        <div className="mini-row">
          <div className="mini"><b>{studied}/{total}</b><span>学習済み</span></div>
          <div className="mini"><b>{todayCount}</b><span>今日の枚数</span></div>
          <div className="mini"><b className="fire">{progress.stats.streak || 0}<span style={{ fontSize: 13 }}> 日</span></b><span>連続学習</span></div>
        </div>
        <button className="ghost-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 11 }} onClick={onProgress}>
          <Ic d={ICON.chart} s={16} /> 進捗をくわしく見る
        </button>
      </div>
    </div>
  );
}
