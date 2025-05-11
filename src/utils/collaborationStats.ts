import type { Repository } from "../types/repository";

export interface CollaborationStats {
  collaboratorDistribution: {
    range: string;
    count: number;
  }[];
  topCollaboratorRepos: {
    name: string;
    collaboratorCount: number;
  }[];
  featureDistribution: {
    feature: string;
    count: number;
    total: number;
  }[];
}

export function calculateCollaborationStats(
  repos: Repository[]
): CollaborationStats {
  // Calculate collaborator distribution ranges
  const collaboratorRanges = [
    { min: 0, max: 1, label: "0-1" },
    { min: 2, max: 5, label: "2-5" },
    { min: 6, max: 10, label: "6-10" },
    { min: 11, max: 20, label: "11-20" },
    { min: 21, max: Infinity, label: "21+" },
  ];

  const collaboratorDistribution = collaboratorRanges.map((range) => ({
    range: range.label,
    count: repos.filter(
      (repo) =>
        (repo.Collaborator_Count || 0) >= range.min &&
        (repo.Collaborator_Count || 0) <= range.max
    ).length,
  }));

  // Get top repos by collaborator count
  const topCollaboratorRepos = [...repos]
    .sort((a, b) => (b.Collaborator_Count || 0) - (a.Collaborator_Count || 0))
    .slice(0, 10)
    .map((repo) => ({
      name: repo.Repo_Name || "",
      collaboratorCount: repo.Collaborator_Count || 0,
    }));

  // Calculate feature distribution
  const featureDistribution = [
    {
      feature: "Issues",
      count: repos.filter((repo) => (repo.Issue_Count || 0) > 0).length,
      total: repos.length,
    },
    {
      feature: "Pull Requests",
      count: repos.filter((repo) => (repo.Pull_Request_Count || 0) > 0).length,
      total: repos.length,
    },
    {
      feature: "Discussions",
      count: repos.filter((repo) => (repo.Discussion_Count || 0) > 0).length,
      total: repos.length,
    },
    {
      feature: "Projects",
      count: repos.filter((repo) => (repo.Project_Count || 0) > 0).length,
      total: repos.length,
    },
    {
      feature: "Wiki",
      count: repos.filter((repo) => (repo.Has_Wiki || 0) > 0).length,
      total: repos.length,
    },
    {
      feature: "Protected Branches",
      count: repos.filter((repo) => (repo.Protected_Branch_Count || 0) > 0)
        .length,
      total: repos.length,
    },
    {
      feature: "Milestones",
      count: repos.filter((repo) => (repo.Milestone_Count || 0) > 0).length,
      total: repos.length,
    },
  ].filter((feature) => feature.count > 0); // Only include features with non-zero counts

  return {
    collaboratorDistribution,
    topCollaboratorRepos,
    featureDistribution,
  };
}
