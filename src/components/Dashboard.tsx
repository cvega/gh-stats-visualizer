import type { Stats } from "@types";
import { containerStyle } from '@styles';

import { DashboardSection, SummaryHeader } from "./Dashboard/Components";
import Footer from "./Footer";


interface DashboardProps {
  stats: Stats;
  analyzeStart: number | null;
}

export default function Dashboard({ stats, analyzeStart }: DashboardProps) {
  return (
    <div style={containerStyle}>
      <SummaryHeader
        title={`Analysis of ${stats.basic.totalRepos.toLocaleString()} repositories`}
        description={`Across ${stats.orgData.length} organizations`}
      />
      <DashboardSection stats={stats} />
      <Footer analyzeStart={analyzeStart} />
    </div>
  );
}
