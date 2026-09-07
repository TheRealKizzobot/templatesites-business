'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type PollFreq = 3000 | 5000 | 10000 | 0; // ms; 0 = paused
export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'metrics-theme';
const POLL_KEY = 'metrics-poll-freq';

interface SettingsContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  pollFreq: PollFreq;
  setPollFreq: (n: PollFreq) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark());
  root.classList.toggle('dark', dark);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [pollFreq, setPollFreqState] = useState<PollFreq>(5000);

  // Init from storage (client only).
  useEffect(() => {
    try {
      const t = window.localStorage.getItem(THEME_KEY) as Theme | null;
      if (t === 'light' || t === 'dark' || t === 'system') setThemeState(t);
      const p = Number(window.localStorage.getItem(POLL_KEY));
      if (p === 3000 || p === 5000 || p === 10000 || p === 0) setPollFreqState(p as PollFreq);
    } catch {
      // storage unavailable
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (theme === 'system') applyTheme('system'); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(THEME_KEY, t);
    } catch { /* ignore */ }
  };

  const setPollFreq = (n: PollFreq) => {
    setPollFreqState(n);
    try {
      window.localStorage.setItem(POLL_KEY, String(n));
    } catch { /* ignore */ }
  };

  const value = useMemo(
    () => ({ theme, setTheme, pollFreq, setPollFreq }),
    [theme, pollFreq]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}