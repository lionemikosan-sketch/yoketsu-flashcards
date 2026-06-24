import type { Card } from '../types';

// ============================================================
//  要穴カード（31枚）
//  ここに1行追加するだけで問題を増やせます。
//  対象：心包 / 三焦 / 胆 / 肝経 の四肢末端（上肢=肘から先 / 下肢=膝から先）
// ============================================================
export const CARDS: Card[] = [
  // ── 手の厥陰心包経（上肢）
  { id: 'PC3',  meridian: 'PC', code: 'PC3',  pointName: '曲沢',   pointReading: 'きょくたく',   limbGroup: '上肢', keyAttributes: [{ label: '合水穴', category: '合穴', phase: '水' }] },
  { id: 'PC4',  meridian: 'PC', code: 'PC4',  pointName: '郄門',   pointReading: 'げきもん',     limbGroup: '上肢', keyAttributes: [{ label: '郄穴', category: '郄穴' }] },
  { id: 'PC5',  meridian: 'PC', code: 'PC5',  pointName: '間使',   pointReading: 'かんし',       limbGroup: '上肢', keyAttributes: [{ label: '経金穴', category: '経穴', phase: '金' }] },
  { id: 'PC6',  meridian: 'PC', code: 'PC6',  pointName: '内関',   pointReading: 'ないかん',     limbGroup: '上肢', keyAttributes: [{ label: '絡穴', category: '絡穴' }, { label: '八脈交会穴（陰維脈）', category: '八脈交会穴', vessel: '陰維脈' }] },
  { id: 'PC7',  meridian: 'PC', code: 'PC7',  pointName: '大陵',   pointReading: 'だいりょう',   limbGroup: '上肢', keyAttributes: [{ label: '兪土穴', category: '兪穴', phase: '土' }, { label: '原穴', category: '原穴' }] },
  { id: 'PC8',  meridian: 'PC', code: 'PC8',  pointName: '労宮',   pointReading: 'ろうきゅう',   limbGroup: '上肢', keyAttributes: [{ label: '滎火穴', category: '滎穴', phase: '火' }] },
  { id: 'PC9',  meridian: 'PC', code: 'PC9',  pointName: '中衝',   pointReading: 'ちゅうしょう', limbGroup: '上肢', keyAttributes: [{ label: '井木穴', category: '井穴', phase: '木' }] },

  // ── 手の少陽三焦経（上肢）
  { id: 'TE1',  meridian: 'TE', code: 'TE1',  pointName: '関衝',   pointReading: 'かんしょう',   limbGroup: '上肢', keyAttributes: [{ label: '井金穴', category: '井穴', phase: '金' }] },
  { id: 'TE2',  meridian: 'TE', code: 'TE2',  pointName: '液門',   pointReading: 'えきもん',     limbGroup: '上肢', keyAttributes: [{ label: '滎水穴', category: '滎穴', phase: '水' }] },
  { id: 'TE3',  meridian: 'TE', code: 'TE3',  pointName: '中渚',   pointReading: 'ちゅうしょ',   limbGroup: '上肢', keyAttributes: [{ label: '兪木穴', category: '兪穴', phase: '木' }] },
  { id: 'TE4',  meridian: 'TE', code: 'TE4',  pointName: '陽池',   pointReading: 'ようち',       limbGroup: '上肢', keyAttributes: [{ label: '原穴', category: '原穴' }] },
  { id: 'TE5',  meridian: 'TE', code: 'TE5',  pointName: '外関',   pointReading: 'がいかん',     limbGroup: '上肢', keyAttributes: [{ label: '絡穴', category: '絡穴' }, { label: '八脈交会穴（陽維脈）', category: '八脈交会穴', vessel: '陽維脈' }] },
  { id: 'TE6',  meridian: 'TE', code: 'TE6',  pointName: '支溝',   pointReading: 'しこう',       limbGroup: '上肢', keyAttributes: [{ label: '経火穴', category: '経穴', phase: '火' }] },
  { id: 'TE7',  meridian: 'TE', code: 'TE7',  pointName: '会宗',   pointReading: 'えそう',       limbGroup: '上肢', keyAttributes: [{ label: '郄穴', category: '郄穴' }] },
  { id: 'TE10', meridian: 'TE', code: 'TE10', pointName: '天井',   pointReading: 'てんせい',     limbGroup: '上肢', keyAttributes: [{ label: '合土穴', category: '合穴', phase: '土' }] },

  // ── 足の少陽胆経（下肢）
  { id: 'GB34', meridian: 'GB', code: 'GB34', pointName: '陽陵泉', pointReading: 'ようりょうせん', limbGroup: '下肢', keyAttributes: [{ label: '合土穴', category: '合穴', phase: '土' }, { label: '筋会', category: '八会穴' }, { label: '胆の下合穴', category: '下合穴' }] },
  { id: 'GB36', meridian: 'GB', code: 'GB36', pointName: '外丘',   pointReading: 'がいきゅう',   limbGroup: '下肢', keyAttributes: [{ label: '郄穴', category: '郄穴' }] },
  { id: 'GB37', meridian: 'GB', code: 'GB37', pointName: '光明',   pointReading: 'こうめい',     limbGroup: '下肢', keyAttributes: [{ label: '絡穴', category: '絡穴' }] },
  { id: 'GB38', meridian: 'GB', code: 'GB38', pointName: '陽輔',   pointReading: 'ようほ',       limbGroup: '下肢', keyAttributes: [{ label: '経火穴', category: '経穴', phase: '火' }] },
  { id: 'GB39', meridian: 'GB', code: 'GB39', pointName: '懸鐘',   pointReading: 'けんしょう',   limbGroup: '下肢', keyAttributes: [{ label: '髄会', category: '八会穴' }] },
  { id: 'GB40', meridian: 'GB', code: 'GB40', pointName: '丘墟',   pointReading: 'きゅうきょ',   limbGroup: '下肢', keyAttributes: [{ label: '原穴', category: '原穴' }] },
  { id: 'GB41', meridian: 'GB', code: 'GB41', pointName: '足臨泣', pointReading: 'あしりんきゅう', limbGroup: '下肢', keyAttributes: [{ label: '兪木穴', category: '兪穴', phase: '木' }, { label: '八脈交会穴（帯脈）', category: '八脈交会穴', vessel: '帯脈' }] },
  { id: 'GB43', meridian: 'GB', code: 'GB43', pointName: '侠谿',   pointReading: 'きょうけい',   limbGroup: '下肢', keyAttributes: [{ label: '滎水穴', category: '滎穴', phase: '水' }] },
  { id: 'GB44', meridian: 'GB', code: 'GB44', pointName: '足竅陰', pointReading: 'あしきょういん', limbGroup: '下肢', keyAttributes: [{ label: '井金穴', category: '井穴', phase: '金' }] },

  // ── 足の厥陰肝経（下肢）
  { id: 'LR1',  meridian: 'LR', code: 'LR1',  pointName: '大敦',   pointReading: 'だいとん',     limbGroup: '下肢', keyAttributes: [{ label: '井木穴', category: '井穴', phase: '木' }] },
  { id: 'LR2',  meridian: 'LR', code: 'LR2',  pointName: '行間',   pointReading: 'こうかん',     limbGroup: '下肢', keyAttributes: [{ label: '滎火穴', category: '滎穴', phase: '火' }] },
  { id: 'LR3',  meridian: 'LR', code: 'LR3',  pointName: '太衝',   pointReading: 'たいしょう',   limbGroup: '下肢', keyAttributes: [{ label: '兪土穴', category: '兪穴', phase: '土' }, { label: '原穴', category: '原穴' }] },
  { id: 'LR4',  meridian: 'LR', code: 'LR4',  pointName: '中封',   pointReading: 'ちゅうほう',   limbGroup: '下肢', keyAttributes: [{ label: '経金穴', category: '経穴', phase: '金' }] },
  { id: 'LR5',  meridian: 'LR', code: 'LR5',  pointName: '蠡溝',   pointReading: 'れいこう',     limbGroup: '下肢', keyAttributes: [{ label: '絡穴', category: '絡穴' }] },
  { id: 'LR6',  meridian: 'LR', code: 'LR6',  pointName: '中都',   pointReading: 'ちゅうと',     limbGroup: '下肢', keyAttributes: [{ label: '郄穴', category: '郄穴' }] },
  { id: 'LR8',  meridian: 'LR', code: 'LR8',  pointName: '曲泉',   pointReading: 'きょくせん',   limbGroup: '下肢', keyAttributes: [{ label: '合水穴', category: '合穴', phase: '水' }] },
];
