import type { Card, DeckItem } from '../types';
import { MERIDIANS, attrColor } from '../data/meridians';
import { Ic, ICON } from './Icon';

interface FlipCardProps {
  item: DeckItem;
  flipped: boolean;
  onFlip: () => void;
}

// 3D フリップカード。タップで表裏が反転する。
export function FlipCard({ item, flipped, onFlip }: FlipCardProps) {
  return (
    <div className="stage">
      <div className={'flip' + (flipped ? ' flipped' : '')} onClick={onFlip}>
        <div className="face front">
          {item.type === 'A' ? <FrontA card={item.card} /> : <FrontB item={item} />}
        </div>
        <div className="face back">
          {item.type === 'A' ? <BackA card={item.card} /> : <BackB item={item} />}
        </div>
      </div>
    </div>
  );
}

/* ---- Mode A：経穴 → 要穴 ---- */
function FrontA({ card }: { card: Card }) {
  const M = MERIDIANS[card.meridian];
  return (
    <>
      <div className="face-top">
        <span className="m-pill" style={{ background: M.color }}>{M.short}</span>
        <span className="limb-pill">{card.limbGroup}</span>
        <span className="code-pill">{card.code}</span>
      </div>
      <div className="face-mid">
        <span className="watermark mincho">{card.pointName[0]}</span>
        <div className="pt-name mincho">{card.pointName}</div>
        <div className="pt-read">{card.pointReading}</div>
      </div>
      <div className="face-foot"><Ic d={ICON.flip} s={15} /> タップして要穴を確認</div>
    </>
  );
}

function BackA({ card }: { card: Card }) {
  const M = MERIDIANS[card.meridian];
  // 「経穴 → 要穴」の答え面。経穴名・経穴番号は表に出した問題なので裏には出さない。
  return (
    <>
      <div className="face-top">
        <span className="m-pill" style={{ background: M.color }}>{M.short}</span>
      </div>
      <div className="face-mid">
        <div className="back-name">要穴</div>
        <div className="attr-list">
          {card.keyAttributes.map((a, i) => (
            <div className="attr" key={i} style={{ ['--ac' as string]: attrColor(a) }}>
              <span className="ad" />
              <span className="al">{a.label}</span>
              <span className="acat">{a.phase ? `${a.phase}行` : a.category}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="face-foot">下のボタンで習熟度を記録</div>
    </>
  );
}

/* ---- Mode B：要穴属性 → 該当経穴 ---- */
function FrontB({ item }: { item: Extract<DeckItem, { type: 'B' }> }) {
  return (
    <>
      <div className="face-top">
        <span className="m-pill" style={{ background: '#4b5563' }}>要穴属性</span>
        <span className="code-pill">{item.points.length}穴</span>
      </div>
      <div className="face-mid">
        <span className="watermark mincho">{item.category[0]}</span>
        <div className="cat-name mincho">{item.category}</div>
        <div className="cat-hint">この属性をもつ経穴は？</div>
        <div className="cat-count">該当 {item.points.length} 穴</div>
      </div>
      <div className="face-foot"><Ic d={ICON.flip} s={15} /> タップして経穴を確認</div>
    </>
  );
}

function BackB({ item }: { item: Extract<DeckItem, { type: 'B' }> }) {
  return (
    <>
      <div className="face-top">
        <span className="m-pill" style={{ background: '#4b5563' }}>{item.category}</span>
        <span className="code-pill">{item.points.length}穴</span>
      </div>
      <div className="face-mid">
        <div className="pts-grid">
          {item.points.map((p, i) => {
            const M = MERIDIANS[p.meridian];
            return (
              <div className="ptrow" key={i}>
                <span className="pd" style={{ background: M.color }} />
                <span className="pn mincho">{p.pointName}</span>
                <span className="pr">{p.reading}</span>
                {p.sub && <span className="psub">{p.sub}</span>}
                <span className="pc">{p.code}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="face-foot">下のボタンでまとめて習熟度を記録</div>
    </>
  );
}
