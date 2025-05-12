import { formatSize } from "../Charts/Utils";
import { gridStyle, statCardStyle, statLabelStyle, statValueStyle } from "@styles";
import type { BasicStats } from "../../types/stats";

const statDefinitions = [
  { key: 'totalSize', label: 'Total Storage Size', color: '#f78166', format: formatSize },
  { key: 'totalIssues', label: 'Total Issues', color: '#3fb950' },
  { key: 'totalPRs', label: 'Total Pull Requests', color: '#ad6eff' },
  { key: 'totalProtectedBranches', label: 'Protected Branches', color: '#79c0ff' },
  { key: 'totalWikis', label: 'Total Wikis Enabled', color: '#f78166' },
  { key: 'totalForks', label: 'Total Forks', color: '#ad6eff' },
  { key: 'totalArchived', label: 'Total Archived Repos', color: '#3fb950' },
  { key: 'totalEmpty', label: 'Total Empty Repos', color: '#ff7b72' },
  { key: 'totalProjects', label: 'Total Projects', color: '#79c0ff' },
  { key: 'totalTags', label: 'Total Tags', color: '#ad6eff' },
  { key: 'totalDiscussions', label: 'Total Discussions', color: '#3fb950' },
  { key: 'totalPRReviews', label: 'Total PR Reviews', color: '#f78166' },
  { key: 'totalIssueEvents', label: 'Total Issue Events', color: '#ad6eff' },
  { key: 'totalMilestones', label: 'Total Milestones', color: '#3fb950' },
  { key: 'totalReleases', label: 'Total Releases', color: '#f78166' },
  { key: 'totalCommitComments', label: 'Total Commit Comments', color: '#ad6eff' },
];

// Inline StatCard definition
function StatCard({ title, value, color = "#238636" }: { title: string; value: string | number; color?: string }) {
  return (
    <div style={statCardStyle}>
      <div style={statLabelStyle}>{title}</div>
      <div style={{ ...statValueStyle, color }}>{value}</div>
    </div>
  );
}

export default function StatsCardGrid({ stats }: { stats: BasicStats }) {
  return (
    <div style={gridStyle}>
      {statDefinitions.map(({ key, label, color, format }) => (
        <StatCard
          key={key}
          title={label}
          value={format ? format(stats[key as keyof typeof stats]) : stats[key as keyof typeof stats]}
          color={color}
        />
      ))}
    </div>
  );
} 