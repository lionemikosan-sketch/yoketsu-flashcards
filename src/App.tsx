import { useCallback, useEffect, useState } from 'react';
import type { Progress, Session, Settings, GradeStatus } from './types';
import { CARDS } from './data/cards';
import { loadProgress, saveProgress, loadSettings, saveSettings, emptyProgress } from './lib/storage';
import { applyStatus } from './lib/status';
import { buildDeckA, buildDeckB, buildReviewDeck, shuffle } from './lib/deck';
import { Logo } from './components/Icon';
import { HomeScreen } from './screens/HomeScreen';
import { StudyScreen } from './screens/StudyScreen';
import { ProgressScreen } from './screens/ProgressScreen';

type Screen = 'home' | 'study' | 'progress';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [session, setSession] = useState<Session | null>(null);

  // 永続化（localStorage）
  useEffect(() => { saveProgress(progress); }, [progress]);
  useEffect(() => { saveSettings(settings); }, [settings]);

  const startSession = useCallback((source: 'study' | 'review') => {
    const deck = source === 'review'
      ? buildReviewDeck(progress, settings.order)
      : settings.mode === 'A'
        ? buildDeckA(settings.meridians, settings.order)
        : buildDeckB(settings.meridians, settings.order);
    if (!deck.length) return;
    setSession({ deck, index: 0, flipped: false, mode: source === 'review' ? 'A' : settings.mode, source, results: {} });
    setScreen('study');
  }, [progress, settings]);

  const gradeCurrent = useCallback((status: GradeStatus) => {
    setSession((s) => {
      if (!s) return s;
      const item = s.deck[s.index];
      const ids = item.type === 'A' ? [item.card.id] : item.points.map((p) => p.id);
      setProgress((p) => applyStatus(p, ids, status));
      return { ...s, results: { ...s.results, [item.key]: status }, index: s.index + 1, flipped: false };
    });
  }, []);

  // 「忘れたカードをもう一周」── Mode A のカードのみ再構成
  const replayForgot = useCallback((keys: string[]) => {
    const deck = keys
      .map((id) => CARDS.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((card) => ({ type: 'A' as const, key: card.id, card }));
    if (!deck.length) { setSession(null); setScreen('home'); return; }
    setSession({ deck, index: 0, flipped: false, mode: 'A', source: 'review', results: {} });
  }, []);

  const restart = useCallback(() => {
    setSession((s) => (s ? { ...s, index: 0, flipped: false, results: {}, deck: settings.order === 'random' ? shuffle(s.deck) : s.deck } : s));
  }, [settings]);

  const resetAll = useCallback(() => {
    if (window.confirm('すべての学習状態（覚えた・忘れた等）と連続日数をリセットします。よろしいですか？')) {
      setProgress(emptyProgress());
    }
  }, []);

  const goHome = () => { setSession(null); setScreen('home'); };

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand" onClick={goHome}>
          <Logo />
          <div>
            <h1 className="mincho">要穴 <span style={{ color: 'var(--gold)' }}>Flash</span></h1>
            <div className="sub">経絡経穴 ・ 試験対策</div>
          </div>
        </div>
        <div className="spacer" />
        {screen !== 'home' && <button className="ghost-btn" onClick={goHome}>ホーム</button>}
      </div>

      {screen === 'home' && (
        <HomeScreen
          settings={settings} setSettings={setSettings} progress={progress}
          onStart={() => startSession('study')} onReview={() => startSession('review')}
          onProgress={() => setScreen('progress')}
        />
      )}

      {screen === 'study' && session && (
        <StudyScreen
          session={session} setSession={setSession} progress={progress} gradeCurrent={gradeCurrent}
          onExit={goHome} onReplayForgot={replayForgot} onRestart={restart} onHome={goHome}
        />
      )}

      {screen === 'progress' && (
        <ProgressScreen progress={progress} onReview={() => startSession('review')} onReset={resetAll} />
      )}

      <div className="foot">31の要穴カード ・ 心包 / 三焦 / 胆 / 肝 経 ── 四肢末端</div>
    </div>
  );
}
