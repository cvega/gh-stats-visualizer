// Repository Types
export interface Repository {
  Org_Name: string;
  Repo_Name: string;
  Repo_Size_MB: number;
  Issue_Count: number;
  Pull_Request_Count: number;
  Commit_Comment_Count: number;
  Milestone_Count: number;
  Release_Count: number;
  Tag_Count: number;
  Issue_Comment_Count: number;
  PR_Review_Comment_Count: number;
  Branch_Count: number;
  Last_Push: string;
  Created: string;
  Collaborator_Count: number;
  Protected_Branch_Count: number;
  Project_Count: number;
  Has_Wiki: number;
  Discussion_Count: number;
  PR_Review_Count: number;
  Issue_Event_Count: number;
  Is_Empty: boolean;
  Is_Fork: boolean;
  Is_Archived: boolean;
  Last_Update: string;
  Repo_URL: string;
  Migration_Issue: boolean;
}

// Repository Analysis Types
export interface RepositoryAge {
  name: string;
  ageInDays: number;
  ageInYears: number;
}

export interface RepositoryComplexity {
  name: string;
  branches: number;
  size: number;
  age: string;
  complexityBySize: number;
  complexityByAge: number;
}

export interface RepositoryActivity {
  name: string;
  issues: number;
  prs: number;
  total: number;
}

export interface RepositoryMetadata {
  name: string;
  size: number;
  metadata: number;
  ratio: number;
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

// Stats Types
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

export interface CollaborationStats {
  collaboratorDistribution: { range: string; count: number }[];
  topCollaboratorRepos: { name: string; collaboratorCount: number }[];
  featureDistribution: { feature: string; count: number; total: number }[];
}

export interface Stats {
  basic: BasicStats;
  activityData: DataPoint[];
  sizeData: DataPoint[];
  updateData: DataPoint[];
  orgData: DataPoint[];
  yearData: YearData[];
  branchData: DataPoint[];
  largestRepos: DataPoint[];
  mostActiveRepos: RepositoryActivity[];
  newestRepos: { name: string; created: string }[];
  oldestRepos: { name: string; created: string }[];
  recentlyUpdated: { name: string; lastPush: string }[];
  metadataRatios: RepositoryMetadata[];
  branchComplexity: RepositoryComplexity[];
  tagReleaseFrequency: RepositoryReleaseInfo[];
  repositoryAge: RepositoryAge[];
  collaborationStats: CollaborationStats;
}

// Legacy type for backward compatibility
export type RepoData = Repository;
