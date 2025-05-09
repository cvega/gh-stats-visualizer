import { useState } from 'react';
import Header from './components/Header';
import Uploader from './components/Uploader';
import Dashboard from './components/Dashboard';
import type { Stats } from './types';

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
