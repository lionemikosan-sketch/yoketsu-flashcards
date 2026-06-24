// ============================================================
//  型定義 ── アプリ全体で共有するドメインモデル
// ============================================================
export type MeridianCode = 'PC' | 'TE' | 'GB' | 'LR';
export type Phase = '木' | '火' | '土' | '金' | '水';
export type Category =
  | '井穴' | '滎穴' | '兪穴' | '経穴' | '合穴'
  | '原穴' | '絡穴' | '郄穴' | '八脈交会穴' | '八会穴' | '下合穴';
export type LimbGroup = '上肢' | '下肢';

export type Status = 'new' | 'forgot' | 'good' | 'perfect';
export type GradeStatus = Exclude<Status, 'new'>;

export interface KeyAttribute {
  label: string;       // 例: 兪土穴, 八脈交会穴（陰維脈）
  category: Category;   // Mode B のグルーピングに使う
  phase?: Phase;        // 五行（五兪穴のみ）
  vessel?: string;      // 奇経（八脈交会穴のみ）
}

export interface Card {
  id: string;
  meridian: MeridianCode;
  code: string;          // 例: PC7
  pointName: string;     // 経穴名
  pointReading: string;  // 読み
  limbGroup: LimbGroup;
  keyAttributes: KeyAttribute[];
}

export interface CardProgress {
  status: Status;
  forgotCount: number;
  reviewCount: number;
  lastReviewedAt: number | null;
}

export interface Stats {
  todayDate: string;
  todayCount: number;
  streak: number;
  lastStudyDate: string;
  totalReviews: number;
}

export interface Progress {
  cards: Record<string, CardProgress>;
  stats: Stats;
}

export type StudyMode = 'A' | 'B';
export type Order = 'sequential' | 'random';

export interface Settings {
  mode: StudyMode;
  order: Order;
  meridians: MeridianCode[];
}

export interface BPoint {
  id: string;
  code: string;
  pointName: string;
  reading: string;
  meridian: MeridianCode;
  sub: string | null;
}

// デッキの1枚は Mode A（経穴カード）か Mode B（属性カード）のどちらか
export type DeckItem =
  | { type: 'A'; key: string; card: Card }
  | { type: 'B'; key: string; category: string; points: BPoint[] };

export type SessionSource = 'study' | 'review';

export interface Session {
  deck: DeckItem[];
  index: number;
  flipped: boolean;
  mode: StudyMode;
  source: SessionSource;
  results: Record<string, GradeStatus>;
}
