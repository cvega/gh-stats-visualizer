import { useState } from 'react';
import Header from './components/Header';
import Uploader from './components/Uploader';
import Dashboard from './components/Dashboard';
import type { Stats } from './types/stats';

export function applyThemeToDocument(): void {
  const root = document.documentElement;
  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-card', theme.colors.card);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-accent', theme.colors.accent);
}

export default function App() {
  const [stats, setStats] = useState<Stats | null>(null);

  return (
    <>
      <Header onReset={() => setStats(null)} />
      {!stats && <Uploader onStatsReady={setStats} />}
      {stats && <Dashboard stats={stats} />}
    </>
  );
}
