# 要穴 Flash 📌 ── 経絡経穴 試験対策フラッシュカード（PWA）

**▶ ライブ版（スマホでそのまま使えます）: https://lionemikosan-sketch.github.io/yoketsu-flashcards/**

鍼灸学生のための「要穴」暗記アプリ。心包・三焦・胆・肝経の四肢末端（上肢=肘から先 / 下肢=膝から先）の要穴 **31枚** を、楽しく・繰り返し・効率よく覚えるための学習体験です。

- **2つの学習モード**：経穴→要穴 / 要穴→経穴（属性から該当経穴を一覧で回答）
- **3D フリップカード**、状態記録（忘れた・覚えた・完璧）、**忘れたものだけ復習**
- 経絡フィルター（複数選択）・順番/ランダム切替
- 進捗の可視化（習得率リング・経絡別達成率・苦手ランキング・連続学習日数）
- **PWA**：ホーム画面に追加すると、ネイティブアプリのように起動＆**完全オフライン**で使える
- 学習データは端末内（localStorage）に保存。サーバー不要・登録不要

---

## セットアップ

[Node.js](https://nodejs.org/)（18 以上）が必要です。

```bash
cd keiketsu-flash
npm install      # 初回のみ
npm run dev      # 開発サーバー起動 → 表示された http://localhost:5173 を開く
```

本番ビルド・ローカル確認：

```bash
npm run build    # dist/ に出力
npm run preview  # ビルド結果をローカルで確認（スマホ実機テストにも使える）
```

その他：`npm run typecheck`（型チェック）

---

## スマホで「アプリ」として使う（PWA インストール）

[ライブ版URL](https://lionemikosan-sketch.github.io/yoketsu-flashcards/) をスマホのブラウザで開き、

- **iPhone（Safari）**：共有ボタン → 「ホーム画面に追加」
- **Android（Chrome）**：メニュー → 「アプリをインストール」/「ホーム画面に追加」

これで全画面・**完全オフライン**で起動するアプリになります。

## 更新を反映する（再デプロイ）

カードを追加したら、以下のワンコマンドで GitHub Pages を更新できます（`gh-pages` ブランチへ自動デプロイ）。

```bash
npm run deploy
```

> 公開URLは `https://<ユーザー名>.github.io/yoketsu-flashcards/`。
> リポジトリ名を変える場合は `vite.config.ts` の `base` も合わせて変更してください。

### 同じWi-Fi内の実機で確認（任意）
`npm run preview` 実行時に表示される `http://<PCのIP>:4173/yoketsu-flashcards/` をスマホで開く。

---

## アイコンについて（任意）

現状は SVG アイコン（`public/pwa-icon.svg` / `pwa-maskable.svg`）で動作します。
iOS のホーム画面アイコンを綺麗な PNG にしたい場合は、ビルド前に一度だけ：

```bash
npx pwa-asset-generator public/pwa-icon.svg public --background "#070809" --padding "18%"
```

生成された PNG に合わせて `index.html` の `apple-touch-icon` と `vite.config.ts` の manifest を差し替えてください。

---

## ディレクトリ構成

```
keiketsu-flash/
├─ index.html               アプリのHTMLシェル（PWAメタタグ）
├─ standalone.html          ★ ビルド不要・ダブルクリックで動く単一HTML版（参考）
├─ vite.config.ts           Vite + PWA 設定（manifest / Service Worker）
├─ public/
│   ├─ pwa-icon.svg         アプリアイコン
│   └─ pwa-maskable.svg     マスカブルアイコン（Android）
└─ src/
    ├─ main.tsx             エントリ（SW登録 + マウント）
    ├─ App.tsx              画面遷移・セッション管理・永続化
    ├─ index.css            デザインシステム（ダークテーマ）
    ├─ types.ts             ドメイン型定義
    ├─ data/
    │   ├─ cards.ts         ★ 31枚の要穴データ（ここを編集して問題追加）
    │   └─ meridians.ts     経絡メタ情報・色・カテゴリ順
    ├─ lib/
    │   ├─ deck.ts          デッキ生成（Mode A/B・復習・シャッフル）
    │   ├─ status.ts        状態適用・連続日数・状態メタ
    │   ├─ storage.ts       localStorage 読み書き
    │   └─ format.ts        日付ユーティリティ
    ├─ components/
    │   ├─ FlipCard.tsx     3Dフリップカード（表裏 × 2モード）
    │   ├─ Ring.tsx         SVGドーナツリング
    │   └─ Icon.tsx         アイコン・ロゴ
    └─ screens/
        ├─ HomeScreen.tsx
        ├─ StudyScreen.tsx
        ├─ ProgressScreen.tsx
        └─ DoneOverlay.tsx  セッション完了演出
```

## 問題の追加方法

`src/data/cards.ts` の `CARDS` 配列に1行追加するだけ。要穴属性（`keyAttributes`）に `category` を付けておくと、Mode B（属性→経穴）の一覧に自動で反映されます。

```ts
{ id: 'XX1', meridian: 'PC', code: 'XX1', pointName: '○○', pointReading: '○○',
  limbGroup: '上肢', keyAttributes: [{ label: '原穴', category: '原穴' }] },
```

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
