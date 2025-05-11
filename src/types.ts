// File: src/types.ts

// This file is kept for backward compatibility
// New code should import directly from src/types/
export * from './types';

export interface RepoData {
  Org_Name?: string;
  Repo_Name?: string;
  Repo_Size_MB?: number;
  Issue_Count?: number;
  Pull_Request_Count?: number;
  Commit_Comment_Count?: number;
  Milestone_Count?: number;
  Release_Count?: number;
  Tag_Count?: number;
  Issue_Comment_Count?: number;
  PR_Review_Comment_Count?: number;
  Branch_Count?: number;
  Last_Push?: string;
  Created?: string;
  Collaborator_Count?: number;
  Protected_Branch_Count?: number;
  Project_Count?: number;
  Has_Wiki?: number;
  Discussion_Count?: number;
  [key: string]: unknown;
}

export interface Stats {
  basic: {
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
  };
  activityData: { name: string; value: number }[];
  sizeData: { name: string; value: number }[];
  updateData: { name: string; value: number }[];
  orgData: { name: string; value: number }[];
  yearData: { year: number; count: number }[];
  branchData: { name: string; value: number }[];
  largestRepos: { name: string; value: number }[];
  mostActiveRepos: { name: string; issues: number; prs: number; total: number }[];
  newestRepos: { name: string; created: string }[];
  oldestRepos: { name: string; created: string }[];
  recentlyUpdated: { name: string; lastPush: string }[];
  metadataRatios: { name: string; size: number; metadata: number; ratio: number }[];
  branchComplexity: {
    name: string;
    branches: number;
    size: number;
    age: string;
    complexityBySize: number;
    complexityByAge: number;
  }[];
  tagReleaseFrequency: {
    name: string;
    tags: number;
    releases: number;
    age: string;
    tagsPerYear: number;
    releasesPerYear: number;
    total: number;
  }[];
  repositoryAge: {
    name: string;
    ageInDays: number;
    ageInYears: number;
  }[];
  collaborationStats: {
    collaboratorDistribution: { range: string; count: number }[];
    topCollaboratorRepos: { name: string; collaboratorCount: number }[];
    featureDistribution: { feature: string; count: number; total: number }[];
  };
}

