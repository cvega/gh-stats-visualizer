import type { Stats, RepoData } from '../types';

export default function parseCsvAndCalculateStats(data: RepoData[]): Stats {
  // Fix common header typos
  data.forEach((repo) => {
    if ('ilestone_Count' in repo) {
      repo.Milestone_Count = (repo as Record<string, unknown>)['ilestone_Count'] as number | undefined;
      delete (repo as Record<string, unknown>)['ilestone_Count'];
    }
    if ('igration_Issue' in repo) {
      repo.Migration_Issue = (repo as Record<string, unknown>)['igration_Issue'] as string | undefined;
      delete (repo as Record<string, unknown>)['igration_Issue'];
    }
  });

  const totalRepos = data.length;
  const totalSize = data.reduce((sum, repo) => sum + (repo.Repo_Size_MB || 0), 0);
  const totalIssues = data.reduce((sum, repo) => sum + (repo.Issue_Count || 0), 0);
  const totalPRs = data.reduce((sum, repo) => sum + (repo.Pull_Request_Count || 0), 0);
  const totalCommitComments = data.reduce((sum, repo) => sum + (repo.Commit_Comment_Count || 0), 0);
  const totalMilestones = data.reduce((sum, repo) => sum + (repo.Milestone_Count || 0), 0);
  const totalReleases = data.reduce((sum, repo) => sum + (repo.Release_Count || 0), 0);

  const activityLevels = {
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

  const orgCounts: Record<string, number> = {};
  data.forEach((repo) => {
    if (repo.Org_Name) {
      orgCounts[repo.Org_Name] = (orgCounts[repo.Org_Name] || 0) + 1;
    }
  });

  const orgData = Object.entries(orgCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const now = new Date();
  const updateBuckets: Record<string, number> = {
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
    const days = (now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24);
    if (days < 7) updateBuckets['Past week']++;
    else if (days < 30) updateBuckets['Past month']++;
    else if (days < 90) updateBuckets['Past 3 months']++;
    else if (days < 365) updateBuckets['Past year']++;
    else if (days < 730) updateBuckets['1-2 years ago']++;
    else updateBuckets['2+ years ago']++;
  });

  const updateData = Object.entries(updateBuckets).map(([name, value]) => ({ name, value }));

  const yearBuckets: Record<number, number> = {};
  data.forEach((repo) => {
    if (!repo.Created) return;
    const year = new Date(repo.Created).getFullYear();
    yearBuckets[year] = (yearBuckets[year] || 0) + 1;
  });

  const yearData = Object.entries(yearBuckets)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);

  const sizeGroups = {
    'Less than 1 MB': 0,
    '1–10 MB': 0,
    '10–100 MB': 0,
    '100–1000 MB': 0,
    'More than 1000 MB': 0,
  };

  data.forEach(repo => {
    const size = repo.Repo_Size_MB || 0;
    if (size < 1) sizeGroups['Less than 1 MB']++;
    else if (size < 10) sizeGroups['1–10 MB']++;
    else if (size < 100) sizeGroups['10–100 MB']++;
    else if (size < 1000) sizeGroups['100–1000 MB']++;
    else sizeGroups['More than 1000 MB']++;
  });

  const sizeData = Object.entries(sizeGroups).map(([name, value]) => ({ name, value }));

  const branchGroups = {
    'Single branch': 0,
    '2–5 branches': 0,
    '6–10 branches': 0,
    'More than 10 branches': 0,
  };

  data.forEach(repo => {
    const branches = repo.Branch_Count || 0;
    if (branches <= 1) branchGroups['Single branch']++;
    else if (branches <= 5) branchGroups['2–5 branches']++;
    else if (branches <= 10) branchGroups['6–10 branches']++;
    else branchGroups['More than 10 branches']++;
  });

  const branchData = Object.entries(branchGroups).map(([name, value]) => ({ name, value }));

  const largestRepos = [...data]
    .sort((a, b) => (b.Repo_Size_MB || 0) - (a.Repo_Size_MB || 0))
    .slice(0, 10)
    .map(repo => ({
      name: `${repo.Org_Name}/${repo.Repo_Name}`,
      value: repo.Repo_Size_MB || 0,
    }));

  const mostActiveRepos = [...data]
    .map(repo => {
      const issues = repo.Issue_Count || 0;
      const prs = repo.Pull_Request_Count || 0;
      return {
        name: `${repo.Org_Name}/${repo.Repo_Name}`,
        issues,
        prs,
        total: issues + prs,
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const validCreated = data.filter(r => r.Created).map(r => ({
    name: `${r.Org_Name}/${r.Repo_Name}`,
    created: new Date(r.Created!),
  }));

  const newestRepos = [...validCreated]
    .sort((a, b) => b.created.getTime() - a.created.getTime())
    .slice(0, 5)
    .map(r => ({ name: r.name, created: r.created.toLocaleDateString() }));

  const oldestRepos = [...validCreated]
    .sort((a, b) => a.created.getTime() - b.created.getTime())
    .slice(0, 5)
    .map(r => ({ name: r.name, created: r.created.toLocaleDateString() }));

  const recentlyUpdated = data
    .filter(r => r.Last_Push)
    .sort((a, b) => new Date(b.Last_Push!).getTime() - new Date(a.Last_Push!).getTime())
    .slice(0, 5)
    .map(r => ({
      name: `${r.Org_Name}/${r.Repo_Name}`,
      lastPush: new Date(r.Last_Push!).toLocaleDateString(),
    }));

  const repositoryAge = data
    .filter(r => r.Created)
    .map(r => {
      const created = new Date(r.Created!);
      const now = new Date();
      const ageInDays = Math.round((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      const ageInYears = parseFloat((ageInDays / 365).toFixed(1));

      return {
        name: `${r.Org_Name}/${r.Repo_Name}`,
        ageInDays,
        ageInYears,
      };
    })
    .sort((a, b) => b.ageInDays - a.ageInDays)
    .slice(0, 10);

  const metadataRatios = data
    .map(r => {
      const size = r.Repo_Size_MB || 0;
      const metadata = (r.Issue_Count || 0) + (r.Pull_Request_Count || 0) + (r.Commit_Comment_Count || 0);
      const ratio = metadata === 0 ? 0 : size / metadata;

      return {
        name: `${r.Org_Name}/${r.Repo_Name}`,
        size,
        metadata,
        ratio,
      };
    })
    .filter(r => r.size > 0 && r.metadata > 0)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 10);

  const branchComplexity = data
    .filter(r => r.Branch_Count && r.Created)
    .map(r => {
      const branches = r.Branch_Count!;
      const size = r.Repo_Size_MB || 1;
      const created = new Date(r.Created!);
      const now = new Date();
      const ageYears = Math.max(1, (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));

      return {
        name: `${r.Org_Name}/${r.Repo_Name}`,
        branches,
        size,
        age: ageYears.toFixed(1),
        complexityBySize: branches / size,
        complexityByAge: branches / ageYears,
      };
    })
    .sort((a, b) => b.complexityBySize - a.complexityBySize)
    .slice(0, 10);

  const tagReleaseFrequency = data
    .filter(r => r.Tag_Count || r.Release_Count)
    .map(r => {
      const tags = r.Tag_Count || 0;
      const releases = r.Release_Count || 0;
      const created = new Date(r.Created || new Date());
      const now = new Date();
      const ageYears = Math.max(1, (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
      const age = ageYears.toFixed(1);

      return {
        name: `${r.Org_Name}/${r.Repo_Name}`,
        tags,
        releases,
        age,
        tagsPerYear: tags / ageYears,
        releasesPerYear: releases / ageYears,
        total: (tags + releases) / ageYears,
      };
    })
    .sort((a, b) => b.total - a.total)
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
    orgData,
    updateData,
    yearData,
    sizeData,
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
