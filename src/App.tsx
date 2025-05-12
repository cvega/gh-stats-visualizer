import { useState } from "react";
import Header from "./components/Header";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import type { Stats } from "@types";

export default function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [analyzeStart, setAnalyzeStart] = useState<number | null>(null);

  return (
    <>
      <Header onReset={() => setStats(null)} />
      {!stats && (
        <Upload
          onStatsReady={setStats}
          onAnalyzeStart={() => setAnalyzeStart(performance.now())}
        />
      )}
      {stats && <Dashboard stats={stats} analyzeStart={analyzeStart} />}
    </>
  );
}
