import type { MeridianCode, Phase, Category, KeyAttribute } from '../types';

export interface MeridianMeta {
  name: string;   // 正式名
  short: string;  // 略称
  limb: '上肢' | '下肢';
  color: string;  // CSS変数
  hex: string;    // 生の色（SVG・inline用）
}

export const MERIDIANS: Record<MeridianCode, MeridianMeta> = {
  PC: { name: '手の厥陰心包経', short: '心包経', limb: '上肢', color: 'var(--m-PC)', hex: '#fb7185' },
  TE: { name: '手の少陽三焦経', short: '三焦経', limb: '上肢', color: 'var(--m-TE)', hex: '#f7b955' },
  GB: { name: '足の少陽胆経',   short: '胆経',   limb: '下肢', color: 'var(--m-GB)', hex: '#34d399' },
  LR: { name: '足の厥陰肝経',   short: '肝経',   limb: '下肢', color: 'var(--m-LR)', hex: '#a3e635' },
};

export const MERIDIAN_ORDER: MeridianCode[] = ['PC', 'TE', 'GB', 'LR'];

// 五行カラー（要穴属性の暗記手がかり）
export const PHASE_COLOR: Record<Phase, string> = {
  '木': '#34a853', '火': '#ea4f4f', '土': '#d6a03a', '金': '#8a93a3', '水': '#3b82f6',
};

export const CAT_COLOR: Partial<Record<Category, string>> = {
  '原穴': '#8b5cf6', '絡穴': '#14b8a6', '郄穴': '#f43f5e',
  '八脈交会穴': '#6366f1', '八会穴': '#d97706', '下合穴': '#0891b2',
};

// Mode B のカテゴリ表示順
export const CATEGORY_ORDER: Category[] = [
  '井穴', '滎穴', '兪穴', '経穴', '合穴',
  '原穴', '絡穴', '郄穴', '八脈交会穴', '八会穴', '下合穴',
];

export const attrColor = (a: KeyAttribute): string =>
  a.phase ? PHASE_COLOR[a.phase] : (CAT_COLOR[a.category] ?? '#9b988e');
