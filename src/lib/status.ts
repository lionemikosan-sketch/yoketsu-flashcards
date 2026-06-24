import type { Progress, Status, GradeStatus } from '../types';
import { todayKey, daysBetween } from './format';

export const STATUS_META: Record<GradeStatus, { label: string; color: string; hex: string; key: string }> = {
  forgot:  { label: '忘れた', color: 'var(--s-forgot)',  hex: '#fb7185', key: '1' },
  good:    { label: '覚えた', color: 'var(--s-good)',    hex: '#56b8f0', key: '2' },
  perfect: { label: '完璧',   color: 'var(--s-perfect)', hex: '#e9c46a', key: '3' },
};

export const NEW_HEX = '#3a3f47';

export const statusOf = (prog: Progress, id: string): Status =>
  prog.cards[id]?.status ?? 'new';

// 指定IDたちに状態を適用し、今日の枚数・連続日数も更新した新しい Progress を返す（純粋関数）
export function applyStatus(prog: Progress, ids: string[], status: GradeStatus): Progress {
  const cards = { ...prog.cards };
  const now = Date.now();

  for (const id of ids) {
    const prev = cards[id] ?? { status: 'new' as Status, forgotCount: 0, reviewCount: 0, lastReviewedAt: null };
    cards[id] = {
      ...prev,
      status,
      lastReviewedAt: now,
      reviewCount: prev.reviewCount + 1,
      forgotCount: prev.forgotCount + (status === 'forgot' ? 1 : 0),
    };
  }

  const today = todayKey();
  const stats = { ...prog.stats };
  if (stats.todayDate !== today) { stats.todayDate = today; stats.todayCount = 0; }
  stats.todayCount += ids.length;
  stats.totalReviews += ids.length;

  if (stats.lastStudyDate !== today) {
    stats.streak = stats.lastStudyDate && daysBetween(stats.lastStudyDate, today) === 1
      ? stats.streak + 1
      : 1;
    stats.lastStudyDate = today;
  }

  return { cards, stats };
}
