// File: src/utils/statsCalculator.ts

import type { Stats } from '../types/stats';
import type { RepoData } from '../components/Uploader';

export default function calculateStats(data: RepoData[]): Stats {
  const totalRepos = data.length;
  const totalSize = data.reduce((sum, repo) => sum + (repo.Repo_Size_MB || 0), 0);
  const totalIssues = data.reduce((sum, repo) => sum + (repo.Issue_Count || 0), 0);
  const totalPRs = data.reduce((sum, repo) => sum + (repo.Pull_Request_Count || 0), 0);
  const totalCommitComments = data.reduce((sum, repo) => sum + (repo.Commit_Comment_Count || 0), 0);
  const totalMilestones = data.reduce((sum, repo) => sum + (repo.Milestone_Count || 0), 0);
  const totalReleases = data.reduce((sum, repo) => sum + (repo.Release_Count || 0), 0);

  const activityLevels: Record<string, number> = {
    'No activity': 0,
    'Low activity': 0,
    'Medium activity': 0,
    'High activity': 0,
    'Very high activity': 0,
  };

  data.forEach((repo) => {
    const activity = (repo.Issue_Count || 0) + (repo.Pull_Request_Count || 0);
    if (activity === 0) activityLevels['No activity']++;
    else if (activity < 10) activityLevels['Low activity']++;
    else if (activity < 100) activityLevels['Medium activity']++;
    else if (activity < 1000) activityLevels['High activity']++;
    else activityLevels['Very high activity']++;
  });

  const activityData = Object.entries(activityLevels).map(([name, value]) => ({ name, value }));

  const sizeGroups: Record<string, number> = {
    'Less than 1 MB': 0,
    '1-10 MB': 0,
    '10-100 MB': 0,
    '100-1000 MB': 0,
    'More than 1000 MB': 0,
  };

  data.forEach((repo) => {
    const size = repo.Repo_Size_MB || 0;
    if (size < 1) sizeGroups['Less than 1 MB']++;
    else if (size < 10) sizeGroups['1-10 MB']++;
    else if (size < 100) sizeGroups['10-100 MB']++;
    else if (size < 1000) sizeGroups['100-1000 MB']++;
    else sizeGroups['More than 1000 MB']++;
  });

  const sizeData = Object.entries(sizeGroups).map(([name, value]) => ({ name, value }));

  const now = new Date();
  const updateFrequency: Record<string, number> = {
    'Past week': 0,
    'Past month': 0,
    'Past 3 months': 0,
    'Past year': 0,
    '1-2 years ago': 0,
    '2+ years ago': 0,
  };

  data.forEach((repo) => {
    if (!repo.Last_Push) return;
    const lastPush = new Date(repo.Last_Push);
    const daysSinceUpdate = (now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceUpdate < 7) updateFrequency['Past week']++;
    else if (daysSinceUpdate < 30) updateFrequency['Past month']++;
    else if (daysSinceUpdate < 90) updateFrequency['Past 3 months']++;
    else if (daysSinceUpdate < 365) updateFrequency['Past year']++;
    else if (daysSinceUpdate < 730) updateFrequency['1-2 years ago']++;
    else updateFrequency['2+ years ago']++;
  });

  const updateData = Object.entries(updateFrequency).map(([name, value]) => ({ name, value }));

  const orgCounts: Record<string, number> = {};
  data.forEach((repo) => {
    if (repo.Org_Name) orgCounts[repo.Org_Name] = (orgCounts[repo.Org_Name] || 0) + 1;
  });
  const orgData = Object.entries(orgCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const yearCounts: Record<number, number> = {};
  data.forEach((repo) => {
    if (repo.Created) {
      const year = new Date(repo.Created).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });
  const yearData = Object.entries(yearCounts).map(([year, count]) => ({ year: parseInt(year), count })).sort((a, b) => a.year - b.year);

  const branchGroups: Record<string, number> = {
    'Single branch': 0,
    '2-5 branches': 0,
    '6-10 branches': 0,
    'More than 10 branches': 0,
  };

  data.forEach((repo) => {
    const count = repo.Branch_Count || 0;
    if (count <= 1) branchGroups['Single branch']++;
    else if (count <= 5) branchGroups['2-5 branches']++;
    else if (count <= 10) branchGroups['6-10 branches']++;
    else branchGroups['More than 10 branches']++;
  });

  const branchData = Object.entries(branchGroups).map(([name, value]) => ({ name, value }));

  const largestRepos = [...data]
    .sort((a, b) => (b.Repo_Size_MB || 0) - (a.Repo_Size_MB || 0))
    .slice(0, 10)
    .map(repo => ({
      name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
      value: repo.Repo_Size_MB || 0,
    }));

  const mostActiveRepos = [...data]
    .map(repo => ({
      name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
      issues: repo.Issue_Count || 0,
      prs: repo.Pull_Request_Count || 0,
      total: (repo.Issue_Count || 0) + (repo.Pull_Request_Count || 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const newestRepos = [...data]
    .filter(r => r.Created)
    .sort((a, b) => new Date(b.Created!).getTime() - new Date(a.Created!).getTime())
    .slice(0, 20)
    .map(repo => ({
      name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
      created: new Date(repo.Created!).toLocaleDateString(),
    }));

  const oldestRepos = [...data]
    .filter(r => r.Created)
    .sort((a, b) => new Date(a.Created!).getTime() - new Date(b.Created!).getTime())
    .slice(0, 5)
    .map(repo => ({
      name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
      created: new Date(repo.Created!).toLocaleDateString(),
    }));

  const recentlyUpdated = [...data]
    .filter(r => r.Last_Push)
    .sort((a, b) => new Date(b.Last_Push!).getTime() - new Date(a.Last_Push!).getTime())
    .slice(0, 20)
    .map(repo => ({
      name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
      lastPush: new Date(repo.Last_Push!).toLocaleDateString(),
    }));

  const metadataRatios = data
    .map(repo => {
      const size = repo.Repo_Size_MB || 0;
      const metadata = (repo.Issue_Count || 0) + (repo.Pull_Request_Count || 0) +
        (repo.Issue_Comment_Count || 0) + (repo.PR_Review_Comment_Count || 0) +
        (repo.Commit_Comment_Count || 0);
      return {
        name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
        size,
        metadata,
        ratio: metadata === 0 ? 0 : size / metadata,
      };
    })
    .filter(r => r.size > 0 && r.metadata > 0)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 10);

  const branchComplexity = data
    .map(repo => {
      const branchCount = repo.Branch_Count || 0;
      const size = repo.Repo_Size_MB || 1;
      let age = 1;
      if (repo.Created) {
        age = Math.max(1, (now.getTime() - new Date(repo.Created).getTime()) / (365 * 24 * 60 * 60 * 1000));
      }
      return {
        name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
        branches: branchCount,
        size,
        age: age.toFixed(1),
        complexityBySize: branchCount / size,
        complexityByAge: branchCount / age,
      };
    })
    .filter(r => r.branches > 1)
    .sort((a, b) => b.complexityBySize - a.complexityBySize)
    .slice(0, 10);

  const tagReleaseFrequency = data
    .map(repo => {
      const tags = repo.Tag_Count || 0;
      const releases = repo.Release_Count || 0;
      let age = 1;
      if (repo.Created) {
        age = Math.max(1, (now.getTime() - new Date(repo.Created).getTime()) / (365 * 24 * 60 * 60 * 1000));
      }
      return {
        name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
        tags,
        releases,
        age: age.toFixed(1),
        tagsPerYear: tags / age,
        releasesPerYear: releases / age,
        total: (tags + releases) / age,
      };
    })
    .filter(r => r.tags > 0 || r.releases > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const repositoryAge = data
    .filter(repo => repo.Created)
    .map(repo => {
      const ageInDays = (now.getTime() - new Date(repo.Created!).getTime()) / (1000 * 60 * 60 * 24);
      return {
        name: `${repo.Org_Name || ''}/${repo.Repo_Name || ''}`,
        ageInDays: Math.round(ageInDays),
        ageInYears: parseFloat((ageInDays / 365).toFixed(1)),
      };
    })
    .sort((a, b) => b.ageInDays - a.ageInDays)
    .slice(0, 10);

  return {
    basic: {
      totalRepos,
      totalSize,
      totalIssues,
      totalPRs,
      totalCommitComments,
      totalMilestones,
      totalReleases,
    },
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
  };
}

