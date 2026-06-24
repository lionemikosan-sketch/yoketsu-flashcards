import type { Progress, Settings } from '../types';
import { MERIDIAN_ORDER } from '../data/meridians';

const STORE_KEY = 'yoketsu_flash_v1';
const SET_KEY = 'yoketsu_settings_v1';

export const emptyProgress = (): Progress => ({
  cards: {},
  stats: { todayDate: '', todayCount: 0, streak: 0, lastStudyDate: '', totalReviews: 0 },
});

export const defaultSettings = (): Settings => ({
  mode: 'A',
  order: 'sequential',
  meridians: [...MERIDIAN_ORDER],
});

export function loadProgress(): Progress {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null');
    if (raw && raw.cards && raw.stats) return raw as Progress;
  } catch { /* noop */ }
  return emptyProgress();
}

export function saveProgress(p: Progress): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}

export function loadSettings(): Settings {
  try {
    const raw = JSON.parse(localStorage.getItem(SET_KEY) ?? 'null');
    if (raw && Array.isArray(raw.meridians) && raw.meridians.length) return raw as Settings;
  } catch { /* noop */ }
  return defaultSettings();
}

export function saveSettings(s: Settings): void {
  localStorage.setItem(SET_KEY, JSON.stringify(s));
}
