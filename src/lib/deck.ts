import type { Card, DeckItem, MeridianCode, Order, Progress, BPoint } from '../types';
import { CARDS } from '../data/cards';
import { CATEGORY_ORDER } from '../data/meridians';
import { statusOf } from './status';

export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const filterCards = (mers: MeridianCode[]): Card[] =>
  CARDS.filter((c) => mers.includes(c.meridian));

// Mode A：経穴 → 要穴
export function buildDeckA(mers: MeridianCode[], order: Order): DeckItem[] {
  const deck: DeckItem[] = filterCards(mers).map((card) => ({ type: 'A', key: card.id, card }));
  return order === 'random' ? shuffle(deck) : deck;
}

// Mode B：要穴属性 → 該当経穴（カテゴリ横断・選択中の経絡に連動）
export function buildDeckB(mers: MeridianCode[], order: Order): DeckItem[] {
  const cards = filterCards(mers);
  const deck: DeckItem[] = [];

  for (const cat of CATEGORY_ORDER) {
    const points: BPoint[] = [];
    for (const c of cards) {
      const a = c.keyAttributes.find((x) => x.category === cat);
      if (!a) continue;
      let sub: string | null = null;
      if (a.phase) sub = a.label;            // 例: 兪木穴
      else if (a.vessel) sub = a.vessel;     // 例: 陰維脈
      else if (cat === '八会穴') sub = a.label; // 例: 筋会 / 髄会
      points.push({ id: c.id, code: c.code, pointName: c.pointName, reading: c.pointReading, meridian: c.meridian, sub });
    }
    if (points.length) deck.push({ type: 'B', key: cat, category: cat, points });
  }

  return order === 'random' ? shuffle(deck) : deck;
}

// 復習：状態が「忘れた」のカードのみ（Mode A レイアウトで出題）
export function buildReviewDeck(prog: Progress, order: Order): DeckItem[] {
  const deck: DeckItem[] = CARDS
    .filter((c) => statusOf(prog, c.id) === 'forgot')
    .map((card) => ({ type: 'A', key: card.id, card }));
  return order === 'random' ? shuffle(deck) : deck;
}
