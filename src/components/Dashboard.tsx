import type { Stats } from '../types/stats';

import BranchComplexity from './Dashboard/bar/BranchComplexity';
import BranchDistribution from './Dashboard/bar/BranchDistribution';
import Footer from './Dashboard/Footer';
import OrganizationRepositoryDistribution from './Dashboard/bar/OrganizationRepositoryDistribution';
import RepositoryActivityDistribution from './Dashboard/bar/RepositoryActivityDistribution';
import RepositoryActivityLevels from './Dashboard/pie/RepositoryActivityLevels';
import RepositoryAgeDistribution from './Dashboard/bar/RepositoryAgeDistribution';
import RepositoryCreationTime from './Dashboard/line/RepositoryCreationTime';
import RepositoryMetadataRatio from './Dashboard/bar/RepositoryMetadataRatio';
import RepositorySizeDistribution from './Dashboard/bar/RepositorySizeDistribution';
import RepositorySizeLargest from './Dashboard/bar/RepositorySizeLargest';
import RepositoryTagReleaseFrequency from './Dashboard/bar/RepositoryTagReleaseFrequency';
import RepositoryUpdateFrequency from './Dashboard/bar/RepositoryUpdateFrequency';
import DashboardHeader from './Dashboard/DashboardHeader';
import StatCard from './Dashboard/StatCard';
import RepositoryTable from './Dashboard/tables/Repository';
import { containerStyle, gridStyle, chartCellStyle } from './Dashboard/styles';

interface DashboardProps {
  stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div style={containerStyle}>
      <DashboardHeader
        title={`Analysis of ${stats.basic.totalRepos.toLocaleString()} repositories`}
        description={`Across ${stats.orgData.length} organizations`}
      />

      <div style={gridStyle}>
        {[
          { title: 'Total Repositories', value: stats.basic.totalRepos },
          { title: 'Total Storage Size', value: formatSize(stats.basic.totalSize), color: '#f78166' },
          { title: 'Total Issues', value: stats.basic.totalIssues, color: '#3fb950' },
          { title: 'Total Pull Requests', value: stats.basic.totalPRs, color: '#ad6eff' }
        ].map((card) => (
          <StatCard key={card.title} {...card} />
        ))}

        <div style={chartCellStyle}>
          <RepositoryActivityLevels data={stats.activityData} />
        </div>
        <div style={chartCellStyle}>
          <RepositorySizeDistribution data={stats.sizeData} />
        </div>
        <div style={chartCellStyle}>
          <RepositoryUpdateFrequency data={stats.updateData} />
        </div>
        <div style={chartCellStyle}>
          <RepositoryCreationTime data={stats.yearData} />
        </div>
        <div style={chartCellStyle}>
          <OrganizationRepositoryDistribution data={stats.orgData} />
        </div>
        <div style={chartCellStyle}>
          <BranchDistribution data={stats.branchData} />
        </div>  
      </div>

      <RepositoryMetadataRatio data={stats.metadataRatios} />
      <BranchComplexity data={stats.branchComplexity} />
      <RepositoryTagReleaseFrequency data={stats.tagReleaseFrequency} />
      <RepositoryAgeDistribution data={stats.repositoryAge} />
      <RepositorySizeLargest data={stats.largestRepos} />
      <RepositoryActivityDistribution data={stats.mostActiveRepos} />
      
      <div style={gridStyle}>
        <div style={chartCellStyle}>
          <RepositoryTable data={stats.newestRepos} title="Newest" limit={10} />
        </div>
        <div style={chartCellStyle}>
          <RepositoryTable data={stats.oldestRepos} title="Oldest" limit={10} />
        </div>
        <RepositoryTable data={stats.recentlyUpdated} fullWidth title="Most Recently Updated" limit={20} />
      </div>
      <Footer />
    </div>
  );
}

function formatSize(sizeMB: number): string {
  const sizeB = sizeMB * 1024 * 1024;
  if (sizeB < 1024) return `${sizeB.toFixed(0)} B`;
  if (sizeB < 1024 * 1024) return `${(sizeB / 1024).toFixed(2)} KB`;
  if (sizeB < 1024 * 1024 * 1024) return `${(sizeB / 1024 / 1024).toFixed(2)} MB`;
  if (sizeB < 1024 * 1024 * 1024 * 1024) return `${(sizeB / 1024 / 1024 / 1024).toFixed(2)} GB`;
  return `${(sizeB / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
}
