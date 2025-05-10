import React from 'react';
import type { Stats } from '../types/stats';

import StatCard from './Dashboard/StatCard';
import SectionHeader from './Dashboard/SectionHeader';
import ActivityPie from './Dashboard/ActivityPie';
import UpdateBar from './Dashboard/UpdateBar';
import OrgBar from './Dashboard/OrgBar';
import SizeBar from './Dashboard/SizeBar';
import CreationLine from './Dashboard/CreationLine';
import BranchBar from './Dashboard/BranchBar';
import MetadataRatio from './Dashboard/MetadataRatio';
import BranchComplexity from './Dashboard/BranchComplexity';
import TagRelease from './Dashboard/TagRelease';
import RepoAge from './Dashboard/RepoAge';
import LargestRepos from './Dashboard/LargestRepos';
import MostActive from './Dashboard/MostActive';
import Tables from './Dashboard/Tables';
import Footer from './Dashboard/Footer';

interface DashboardProps {
  stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px 48px',
      backgroundColor: '#0d1117'
    }}>
      <SectionHeader
        title={`Analysis of ${stats.basic.totalRepos.toLocaleString()} repositories`}
        description={`Across ${stats.orgData.length} organizations`}
      />

      {/* Unified Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          alignItems: 'stretch',
          marginBottom: '24px',
        }}
      >
        <StatCard title="Total Repositories" value={stats.basic.totalRepos} />
        <StatCard title="Total Storage Size" value={formatSize(stats.basic.totalSize)} color="#f78166" />
        <StatCard title="Total Issues" value={stats.basic.totalIssues} color="#3fb950" />
        <StatCard title="Total Pull Requests" value={stats.basic.totalPRs} color="#ad6eff" />

        <div style={chartCellStyle}><ActivityPie data={stats.activityData} /></div>
        <div style={chartCellStyle}><SizeBar data={stats.sizeData} /></div>
        <div style={chartCellStyle}><UpdateBar data={stats.updateData} /></div>
        <div style={chartCellStyle}><CreationLine data={stats.yearData} /></div>
        <div style={chartCellStyle}><OrgBar data={stats.orgData} /></div>
        <div style={chartCellStyle}><BranchBar data={stats.branchData} /></div>
      </div>

      {/* Full-Width Charts */}
      <div style={{ marginBottom: '24px' }}>
        <MetadataRatio data={stats.metadataRatios} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <BranchComplexity data={stats.branchComplexity} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <TagRelease data={stats.tagReleaseFrequency} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <RepoAge data={stats.repositoryAge} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <LargestRepos data={stats.largestRepos} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <MostActive data={stats.mostActiveRepos} />
      </div>
      <Tables
        newest={stats.newestRepos}
        oldest={stats.oldestRepos}
        updated={stats.recentlyUpdated}
      />
      

      <Footer />
    </div>
  );
}

const chartCellStyle: React.CSSProperties = {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  height: '100%',
};

function formatSize(size: number): string {
  return size >= 1000 ? `${(size / 1000).toFixed(2)} GB` : `${size.toFixed(0)} MB`;
}
