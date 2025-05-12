import type { Stats } from "../types/stats";
import { containerStyle } from '@styles';

import SummaryHeader from "./Dashboard/SummaryHeader";
import Footer from "./Dashboard/Footer";

import { RefactoredDashboardSection } from "./Dashboard/Components";

interface DashboardProps {
  stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div style={containerStyle}>
      <SummaryHeader
        title={`Analysis of ${stats.basic.totalRepos.toLocaleString()} repositories`}
        description={`Across ${stats.orgData.length} organizations`}
      />
      <RefactoredDashboardSection stats={stats} />

      <Footer />
    </div>
  );
}
