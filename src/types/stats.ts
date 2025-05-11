import type { 
  RepositoryAge, 
  RepositoryComplexity, 
  RepositoryActivity, 
  RepositoryMetadata, 
  RepositoryReleaseInfo 
} from './repository';

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