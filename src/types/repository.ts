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