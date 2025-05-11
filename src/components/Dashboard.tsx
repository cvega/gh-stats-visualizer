import type { Stats } from '../types/stats';
import { containerStyle, gridStyle, chartCellStyle } from './Dashboard/styles';

import SummaryHeader from './Dashboard/SummaryHeader';
import Footer from './Dashboard/Footer';

import StatCard from './Dashboard/StatCard';
import BranchComplexity from './Dashboard/bar/BranchComplexity';
import BranchDistribution from './Dashboard/bar/BranchDistribution';
import OrganizationRepositoryDistribution from './Dashboard/bar/OrganizationRepositoryDistribution';
import RepositoryActivityDistribution from './Dashboard/bar/RepositoryActivityDistribution';
import RepositoryActivityLevels from './Dashboard/pie/RepositoryActivityLevels';
import RepositoryAgeDistribution from './Dashboard/bar/RepositoryAgeDistribution';
import RepositoryCreationTime from './Dashboard/line/RepositoryCreationTime';
import RepositoryMetadataRatio from './Dashboard/bar/RepositoryMetadataRatio';
import RepositorySizeDistribution from './Dashboard/bar/RepositorySizeDistribution';
import RepositorySizeLargest from './Dashboard/bar/RepositorySizeLargest';
import RepositoryTable from './Dashboard/tables/Repository';
import RepositoryTagReleaseFrequency from './Dashboard/bar/RepositoryTagReleaseFrequency';
import RepositoryUpdateFrequency from './Dashboard/bar/RepositoryUpdateFrequency';

import { CollaboratorDistribution } from './Dashboard/bar/RepoCollaboratorDistribution';
import { Collaborators } from './Dashboard/tables/Collaborators';
import { RepositoryFeatureDistribution } from './Dashboard/pie/RepositoryFeatureDistribution';

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

      <div style={gridStyle}>
        {[
          { title: 'Total Storage Size', value: formatSize(stats.basic.totalSize), color: '#f78166' },
          { title: 'Total Issues', value: stats.basic.totalIssues, color: '#3fb950' },
          { title: 'Total Pull Requests', value: stats.basic.totalPRs, color: '#ad6eff' },
          { title: 'Protected Branches', value: stats.basic.totalProtectedBranches, color: '#79c0ff' },
          { title: 'Total Wikis Enabled', value: stats.basic.totalWikis, color: '#f78166' },
          { title: 'Total Forks', value: stats.basic.totalForks, color: '#ad6eff' },
          { title: 'Total Archived Repos', value: stats.basic.totalArchived, color: '#3fb950' },
          { title: 'Total Empty Repos', value: stats.basic.totalEmpty, color: '#ff7b72' },
          { title: 'Total Projects', value: stats.basic.totalProjects, color: '#79c0ff' },
          { title: 'Total Tags', value: stats.basic.totalTags, color: '#ad6eff' },
          { title: 'Total Discussions', value: stats.basic.totalDiscussions, color: '#3fb950' },
          { title: 'Total PR Reviews', value: stats.basic.totalPRReviews, color: '#f78166' },
          { title: 'Total Issue Events', value: stats.basic.totalIssueEvents, color: '#ad6eff' },
          { title: 'Total Milestones', value: stats.basic.totalMilestones, color: '#3fb950' },
          { title: 'Total Releases', value: stats.basic.totalReleases, color: '#f78166' },
          { title: 'Total Commit Comments', value: stats.basic.totalCommitComments, color: '#ad6eff' },
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
        <div style={chartCellStyle}>
          <CollaboratorDistribution stats={stats} />
        </div>
        <div style={chartCellStyle}>
          <RepositoryFeatureDistribution stats={stats} />
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
          <Collaborators stats={stats} fullWidth limit={10} />
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
