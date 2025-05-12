import type { Stats, Repository } from "@types";
import { calculateCollaborationStats } from "./collaborationStats";

export function calculateStats(repos: Repository[]): Stats {
  const basic = {
    totalRepos: repos.length,
    totalSize: repos.reduce((sum, repo) => sum + (repo.Repo_Size_MB || 0), 0),
    totalIssues: repos.reduce((sum, repo) => sum + (repo.Issue_Count || 0), 0),
    totalPRs: repos.reduce(
      (sum, repo) => sum + (repo.Pull_Request_Count || 0),
      0
    ),
    totalCommitComments: repos.reduce(
      (sum, repo) => sum + (repo.Commit_Comment_Count || 0),
      0
    ),
    totalMilestones: repos.reduce(
      (sum, repo) => sum + (repo.Milestone_Count || 0),
      0
    ),
    totalReleases: repos.reduce(
      (sum: number, repo) => sum + (repo.Release_Count || 0),
      0
    ),
    totalCollaborators: repos.reduce(
      (sum: number, repo) => sum + (repo.Collaborator_Count || 0),
      0
    ),
    totalProtectedBranches: repos.reduce(
      (sum: number, repo) => sum + (repo.Protected_Branch_Count || 0),
      0
    ),
    totalProjects: repos.reduce(
      (sum: number, repo) => sum + (repo.Project_Count || 0),
      0
    ),
    totalTags: repos.reduce(
      (sum: number, repo) => sum + (repo.Tag_Count || 0),
      0
    ),
    totalIssueComments: repos.reduce(
      (sum: number, repo) => sum + (repo.Issue_Comment_Count || 0),
      0
    ),
    totalPRReviewComments: repos.reduce(
      (sum: number, repo) => sum + (repo.PR_Review_Comment_Count || 0),
      0
    ),
    totalBranches: repos.reduce(
      (sum: number, repo) => sum + (repo.Branch_Count || 0),
      0
    ),
    totalDiscussions: repos.reduce(
      (sum: number, repo) => sum + (repo.Discussion_Count || 0),
      0
    ),
    totalPRReviews: repos.reduce(
      (sum: number, repo) => sum + (repo.PR_Review_Count || 0),
      0
    ),
    totalIssueEvents: repos.reduce(
      (sum: number, repo) => sum + (repo.Issue_Event_Count || 0),
      0
    ),
    totalWikis: repos.reduce(
      (sum: number, repo) => sum + (repo.Has_Wiki || 0),
      0
    ),
    totalForks: repos.filter((repo) => repo.Is_Fork).length,
    totalArchived: repos.filter((repo) => repo.Is_Archived).length,
    totalEmpty: repos.filter((repo) => repo.Is_Empty).length,
  };

  // Calculate activity data
  const activityData = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      value: (repo.Issue_Count || 0) + (repo.Pull_Request_Count || 0),
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate size data
  const sizeData = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      value: repo.Repo_Size_MB || 0,
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate update data
  const updateData = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      value: new Date(repo.Last_Push || "").getTime(),
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate org data
  const orgMap = new Map<string, number>();
  repos.forEach((repo) => {
    const org = repo.Org_Name || "Unknown";
    orgMap.set(org, (orgMap.get(org) || 0) + 1);
  });
  const orgData = Array.from(orgMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate year data
  const yearMap = new Map<number, number>();
  repos.forEach((repo) => {
    const year = new Date(repo.Created || "").getFullYear();
    yearMap.set(year, (yearMap.get(year) || 0) + 1);
  });
  const yearData = Array.from(yearMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  // Calculate branch data
  const branchData = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      value: repo.Branch_Count || 0,
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate largest repos
  const largestRepos = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      value: repo.Repo_Size_MB || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Calculate most active repos
  const mostActiveRepos = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      issues: repo.Issue_Count || 0,
      prs: repo.Pull_Request_Count || 0,
      total: (repo.Issue_Count || 0) + (repo.Pull_Request_Count || 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  // Calculate newest repos
  const newestRepos = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      created: repo.Created || "",
    }))
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .slice(0, 20);

  // Calculate oldest repos
  const oldestRepos = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      created: repo.Created || "",
    }))
    .sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    )
    .slice(0, 20);

  // Calculate recently updated repos
  const recentlyUpdated = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      lastPush: repo.Last_Push || "",
    }))
    .sort(
      (a, b) => new Date(b.lastPush).getTime() - new Date(a.lastPush).getTime()
    )
    .slice(0, 20);

  // Calculate metadata ratios
  const metadataRatios = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      size: repo.Repo_Size_MB || 0,
      metadata:
        (repo.Issue_Count || 0) +
        (repo.Pull_Request_Count || 0) +
        (repo.Commit_Comment_Count || 0),
      ratio:
        ((repo.Issue_Count || 0) +
          (repo.Pull_Request_Count || 0) +
          (repo.Commit_Comment_Count || 0)) /
        (repo.Repo_Size_MB || 1),
    }))
    .sort((a, b) => b.ratio - a.ratio);

  // Calculate branch complexity
  const branchComplexity = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      branches: repo.Branch_Count || 0,
      size: repo.Repo_Size_MB || 0,
      age: repo.Created || "",
      complexityBySize: (repo.Branch_Count || 0) / (repo.Repo_Size_MB || 1),
      complexityByAge:
        (repo.Branch_Count || 0) /
        (new Date().getTime() - new Date(repo.Created || "").getTime()),
    }))
    .sort((a, b) => b.complexityBySize - a.complexityBySize);

  // Calculate tag release frequency
  const tagReleaseFrequency = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      tags: repo.Tag_Count || 0,
      releases: repo.Release_Count || 0,
      age: repo.Created || "",
      tagsPerYear:
        (repo.Tag_Count || 0) /
        ((new Date().getTime() - new Date(repo.Created || "").getTime()) /
          (1000 * 60 * 60 * 24 * 365)),
      releasesPerYear:
        (repo.Release_Count || 0) /
        ((new Date().getTime() - new Date(repo.Created || "").getTime()) /
          (1000 * 60 * 60 * 24 * 365)),
      total: (repo.Tag_Count || 0) + (repo.Release_Count || 0),
    }))
    .sort((a, b) => b.total - a.total);

  // Calculate repository age
  const repositoryAge = repos
    .map((repo) => ({
      name: repo.Repo_Name || "",
      ageInDays: Math.floor(
        (new Date().getTime() - new Date(repo.Created || "").getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      ageInYears: Math.floor(
        (new Date().getTime() - new Date(repo.Created || "").getTime()) /
          (1000 * 60 * 60 * 24 * 365)
      ),
    }))
    .sort((a, b) => b.ageInDays - a.ageInDays);

  // Calculate collaboration stats
  const collaborationStats = calculateCollaborationStats(repos);

  return {
    basic,
    activityData,
    sizeData,
    updateData,
    orgData,
    yearData,
    branchData,
    largestRepos,
    mostActiveRepos,
    newestRepos,
    oldestRepos,
    recentlyUpdated,
    metadataRatios,
    branchComplexity,
    tagReleaseFrequency,
    repositoryAge,
    collaborationStats,
  };
}
