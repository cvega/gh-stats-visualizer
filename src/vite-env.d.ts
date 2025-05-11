/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '@styles' {
  export const theme: {
    colors: {
      bg: string;
      card: string;
      border: string;
      text: string;
      accent: string;
      subtle: string;
    };
    space: { xs: number; sm: number; md: number; lg: number };
    radius: { sm: number; md: number };
  };
  export const containerStyle: import('react').CSSProperties;
  export const gridStyle: import('react').CSSProperties;
  export const chartCellStyle: import('react').CSSProperties;
  export const cardStyle: import('react').CSSProperties;
  export const chartCardStyle: import('react').CSSProperties;
  export const statCardStyle: import('react').CSSProperties;
  export const titleStyle: import('react').CSSProperties;
  export const subtitleStyle: import('react').CSSProperties;
  export const statLabelStyle: import('react').CSSProperties;
  export const statValueStyle: import('react').CSSProperties;
  export const chartContainerStyle: import('react').CSSProperties;
  export const chartMargin: { top: number; right: number; left: number; bottom: number };
  export const tooltipStyle: import('react').CSSProperties;
  export const tooltipItemStyle: import('react').CSSProperties;
  export const footerStyle: import('react').CSSProperties;
  export const tablesGridStyle: import('react').CSSProperties;
  export const tableCardStyle: import('react').CSSProperties;
  export const tableCardTitleStyle: import('react').CSSProperties;
  export const tableStyle: import('react').CSSProperties;
  export const tableCellStyle: import('react').CSSProperties;
  export const tableFirstColStyle: import('react').CSSProperties;
  export const tableHeaderStyle: import('react').CSSProperties;
  export const tableBodyCellStyle: import('react').CSSProperties;
}

declare module '@types' {
  export interface BasicStats {
    totalRepos: number;
    totalSize: number;
    totalIssues: number;
    totalPRs: number;
    totalCommitComments: number;
    totalMilestones: number;
    totalReleases: number;
    totalCollaborators: number;
    totalProtectedBranches: number;
    totalProjects: number;
    totalTags: number;
    totalIssueComments: number;
    totalPRReviewComments: number;
    totalBranches: number;
    totalDiscussions: number;
    totalPRReviews: number;
    totalIssueEvents: number;
    totalWikis: number;
    totalForks: number;
    totalArchived: number;
    totalEmpty: number;
  }

  export interface DataPoint {
    name: string;
    value: number;
  }

  export interface YearData {
    year: number;
    count: number;
  }

  export interface RepositoryActivity {
    name: string;
    issues: number;
    prs: number;
    total: number;
  }

  export interface RepositoryMetadata {
    name: string;
    ratio: number;
  }

  export interface RepositoryComplexity {
    name: string;
    branches: number;
    size: number;
    age: string;
    complexityBySize: number;
    complexityByAge: number;
  }

  export interface RepositoryReleaseInfo {
    name: string;
    tags: number;
    releases: number;
    age: string;
    tagsPerYear: number;
    releasesPerYear: number;
    total: number;
  }

  export interface RepositoryAge {
    name: string;
    ageInDays: number;
    ageInYears: number;
  }

  export interface Stats {
    basic: BasicStats;
    activityData: DataPoint[];
    sizeData: DataPoint[];
    updateData: DataPoint[];
    orgData: DataPoint[];
    yearData: YearData[];
    branchData: DataPoint[];
    largestRepos: { name: string; value: number }[];
    mostActiveRepos: RepositoryActivity[];
    newestRepos: { name: string; created: string }[];
    oldestRepos: { name: string; created: string }[];
    recentlyUpdated: { name: string; lastPush: string }[];
    metadataRatios: RepositoryMetadata[];
    branchComplexity: RepositoryComplexity[];
    tagReleaseFrequency: RepositoryReleaseInfo[];
    repositoryAge: RepositoryAge[];
    collaborationStats: {
      collaboratorDistribution: { range: string; count: number }[];
      topCollaboratorRepos: { name: string; collaboratorCount: number }[];
      featureDistribution: { feature: string; count: number; total: number }[];
    };
  }
}


