import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages のプロジェクトページ（/yoketsu-flashcards/ 配下）で配信するため base を指定。
// 別ホスティング（Netlify などルート配信）に変えるときは './' に戻す。
export default defineConfig({
  base: '/yoketsu-flashcards/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-icon.svg', 'pwa-maskable.svg'],
      manifest: {
        name: '要穴 Flash ── 経絡経穴 試験対策',
        short_name: '要穴Flash',
        description:
          '鍼灸国試対策・要穴フラッシュカード（心包 / 三焦 / 胆 / 肝経・四肢末端）',
        lang: 'ja',
        dir: 'ltr',
        theme_color: '#08090c',
        background_color: '#070809',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'pwa-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,png}'],
      },
    }),
  ],
});
