import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import type {
  Stats,
  RepositoryAge,
  RepositoryComplexity,
  RepositoryActivity,
  RepositoryMetadata,
  RepositoryReleaseInfo,
  BasicStats,
} from "@types";
import type { DataItem } from "../Charts/Bar";
import {
  GenericBarChart,
  GenericPieChart,
  GenericLineChart,
  GenericTable,
  CHART_COLORS,
  formatNumber,
  formatRepoName,
  renderVerticalTick,
} from "../Charts";
import {
  dashboardGridStyle,
  gridStyle,
  statCardStyle,
  statLabelStyle,
  statValueStyle,
  titleStyle,
  subtitleStyle,
} from "../../styles";
import { formatSize } from "../Charts/Utils";

interface SummaryHeaderProps {
  title: string;
  description?: string;
}

export function SummaryHeader({ title, description }: SummaryHeaderProps) {
  return (
    <div style={{ marginBottom: "24px", marginTop: "24px" }}>
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={subtitleStyle}>{description}</p>}
    </div>
  );
}

const statDefinitions = [
  {
    key: "totalSize",
    label: "Total Storage Size",
    color: "#f78166",
    format: formatSize,
  },
  { key: "totalIssues", label: "Total Issues", color: "#3fb950" },
  { key: "totalPRs", label: "Total Pull Requests", color: "#ad6eff" },
  {
    key: "totalProtectedBranches",
    label: "Protected Branches",
    color: "#79c0ff",
  },
  { key: "totalWikis", label: "Total Wikis Enabled", color: "#f78166" },
  { key: "totalForks", label: "Total Forks", color: "#ad6eff" },
  { key: "totalArchived", label: "Total Archived Repos", color: "#3fb950" },
  { key: "totalEmpty", label: "Total Empty Repos", color: "#ff7b72" },
  { key: "totalProjects", label: "Total Projects", color: "#79c0ff" },
  { key: "totalTags", label: "Total Tags", color: "#ad6eff" },
  { key: "totalDiscussions", label: "Total Discussions", color: "#3fb950" },
  { key: "totalPRReviews", label: "Total PR Reviews", color: "#f78166" },
  { key: "totalIssueEvents", label: "Total Issue Events", color: "#ad6eff" },
  { key: "totalMilestones", label: "Total Milestones", color: "#3fb950" },
  { key: "totalReleases", label: "Total Releases", color: "#f78166" },
  {
    key: "totalCommitComments",
    label: "Total Commit Comments",
    color: "#ad6eff",
  },
];

// Inline StatCard definition
function StatCard({
  title,
  value,
  color = "#238636",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div style={statCardStyle}>
      <div style={statLabelStyle}>{title}</div>
      <div style={{ ...statValueStyle, color }}>{value}</div>
    </div>
  );
}

function StatsCardGrid({ stats }: { stats: BasicStats }) {
  return (
    <div style={gridStyle}>
      {statDefinitions.map(({ key, label, color, format }) => (
        <StatCard
          key={key}
          title={label}
          value={
            format
              ? format(stats[key as keyof typeof stats])
              : stats[key as keyof typeof stats]
          }
          color={color}
        />
      ))}
    </div>
  );
}

export function RepositoryActivityLevels({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <GenericPieChart
      title="Repository Activity Levels"
      data={data}
      colors={[
        CHART_COLORS.GRAY, // No activity
        CHART_COLORS.GREEN, // Low activity
        CHART_COLORS.BLUE, // Medium activity
        CHART_COLORS.PURPLE, // High activity
        CHART_COLORS.ORANGE, // Very high activity
      ]}
      formatter={(value: ValueType) => formatNumber(Number(value))}
    />
  );
}

// Example refactoring of RepositorySizeDistribution
export function RepositorySizeDistribution({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  // Transform size labels to be more concise
  const transformedData = data.map((item) => ({
    ...item,
    name: item.name
      .replace("Less than 1 MB", "<1MB")
      .replace("More than 1000 MB", ">1GB")
      .replace(" MB", "MB"),
  }));

  return (
    <GenericBarChart
      title="Repository Size Distribution"
      data={transformedData}
      bars={[
        { dataKey: "value", name: "Repositories", fill: CHART_COLORS.ORANGE },
      ]}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      XAxisProps={{
        dataKey: "name",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
    />
  );
}

// Example refactoring of RepositoryUpdateFrequency
export function RepositoryUpdateFrequency({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <GenericBarChart
      title="Repository Update Frequency"
      data={data}
      bars={[
        { dataKey: "value", name: "Repositories", fill: CHART_COLORS.GREEN },
      ]}
      layout="vertical"
      formatter={(value: ValueType) => formatNumber(Number(value))}
      renderCustomTick={renderVerticalTick}
    />
  );
}

// Example refactoring of RepositoryCreationTime
export function RepositoryCreationTime({
  data,
}: {
  data: { year: number; count: number }[];
}) {
  const lineData = data.map((item) => ({
    name: item.year.toString(),
    value: item.count,
  }));

  return (
    <GenericLineChart
      title="Repository Creation Timeline"
      data={lineData}
      lines={[
        {
          dataKey: "value",
          name: "Repositories Created",
          stroke: CHART_COLORS.GREEN,
        },
      ]}
      xAxisDataKey="name"
      formatter={(value: ValueType) => formatNumber(Number(value))}
    />
  );
}

// Example refactoring of RepositorySizeLargest
export function RepositorySizeLargest({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <GenericBarChart
      title="Top 10 Largest Repositories"
      data={data}
      bars={[
        { dataKey: "value", name: "Size (MB)", fill: CHART_COLORS.ORANGE },
      ]}
      layout="vertical"
      height={400}
      formatter={(value: ValueType) => {
        const num = Number(value);
        return num >= 1000
          ? `${(num / 1000).toFixed(2)} GB`
          : `${num.toFixed(0)} MB`;
      }}
      renderCustomTick={renderVerticalTick}
      labelFormatter={(label) => formatRepoName(label)}
      fullWidth
    />
  );
}

// Example refactoring of RepositoryTable
export function RepositoryTable({
  data,
  title = "Repositories",
  limit,
  fullWidth,
}: {
  data: { name: string; created?: string; lastPush?: string }[];
  title?: string;
  limit?: number;
  fullWidth?: boolean;
}) {
  return (
    <GenericTable
      title={title}
      data={data}
      columns={[
        { key: "name", header: "Repository" },
        {
          key: "date",
          header: "Created Date",
          align: "right",
          render: (_, row) => row.created || row.lastPush,
        },
      ]}
      limit={limit}
      fullWidth={fullWidth}
    />
  );
}

export function DashboardSection({ stats }: { stats: Stats }) {
  return (
    <div>
      {/* Stat cards */}
      <StatsCardGrid stats={stats.basic} />

      {/* Main chart grid */}
      <div style={dashboardGridStyle}>
        {/* Pie and Bar Charts */}
        <RepositoryActivityLevels data={stats.activityData} />
        <RepositorySizeDistribution data={stats.sizeData} />
        <RepositoryUpdateFrequency data={stats.updateData} />
        <RepositoryCreationTime data={stats.yearData} />
        <BranchDistribution data={stats.branchData} />
        <OrganizationRepositoryDistribution data={stats.orgData} />
        <RepoCollaboratorDistribution stats={stats} />
        <RepositoryFeatureDistribution stats={stats} />
        <BranchComplexity data={stats.branchComplexity} />
        <RepositoryActivityDistribution data={stats.mostActiveRepos} />
        <RepositoryAgeDistribution data={stats.repositoryAge} />
        <RepositoryMetadataRatio data={stats.metadataRatios} />
        <RepositoryTagReleaseFrequency data={stats.tagReleaseFrequency} />
        <RepositorySizeLargest data={stats.largestRepos} />
      </div>

      {/* Largest Repos */}

      {/* Tables grid */}
      <div style={dashboardGridStyle}>
        <RepositoryTable data={stats.newestRepos} title="Newest" limit={10} />
        <RepositoryTable data={stats.oldestRepos} title="Oldest" limit={10} />
        <Collaborators stats={stats} limit={10} />
      </div>

      {/* Recently updated table */}
      <RepositoryTable
        data={stats.recentlyUpdated}
        title="Most Recently Updated"
        limit={20}
        fullWidth={true}
      />
    </div>
  );
}

export function BranchComplexity({ data }: { data: RepositoryComplexity[] }) {
  const chartData: DataItem[] = data.map((item) => ({
    name: item.name,
    complexityBySize: item.complexityBySize,
    complexityByAge: item.complexityByAge,
    branches: item.branches,
    size: item.size,
    age: item.age,
  }));

  return (
    <GenericBarChart
      title="Branch Complexity"
      data={chartData}
      bars={[
        {
          dataKey: "complexityBySize",
          name: "Branches per MB",
          fill: CHART_COLORS.PURPLE,
        },
      ]}
      layout="vertical"
      height={400}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => Number(value).toFixed(2)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      fullWidth
    />
  );
}

export function BranchDistribution({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <GenericBarChart
      title="Branch Distribution"
      data={data}
      bars={[
        { dataKey: "value", name: "Repositories", fill: CHART_COLORS.GREEN },
      ]}
      XAxisProps={{
        dataKey: "name",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      YAxisProps={{
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      height={300}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    />
  );
}

export function OrganizationRepositoryDistribution({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <GenericBarChart
      title="Organization Repository Distribution"
      data={data}
      bars={[
        { dataKey: "value", name: "Repositories", fill: CHART_COLORS.PURPLE },
      ]}
      layout="vertical"
      height={300}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    />
  );
}

export function RepoCollaboratorDistribution({ stats }: { stats: Stats }) {
  const data = stats.collaborationStats.collaboratorDistribution;
  const chartData = data.map((item) => ({
    name: item.range,
    value: item.count,
  }));

  return (
    <GenericBarChart
      title="Collaborator Distribution"
      data={chartData}
      bars={[
        { dataKey: "value", name: "Collaborators", fill: CHART_COLORS.PURPLE },
      ]}
      XAxisProps={{
        dataKey: "name",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      YAxisProps={{
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      height={300}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    />
  );
}

export function RepositoryActivityDistribution({
  data,
}: {
  data: RepositoryActivity[];
}) {
  const chartData: DataItem[] = data.map((item) => ({
    name: item.name,
    issues: item.issues,
    prs: item.prs,
    total: item.total,
  }));

  return (
    <GenericBarChart
      title="Top 10 Most Active Repositories"
      data={chartData}
      bars={[
        {
          dataKey: "issues",
          name: "Issues",
          fill: CHART_COLORS.ORANGE,
          stackId: "a",
        },
        {
          dataKey: "prs",
          name: "Pull Requests",
          fill: CHART_COLORS.GREEN,
          stackId: "a",
        },
      ]}
      layout="vertical"
      height={400}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      labelFormatter={formatRepoName}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      fullWidth
    />
  );
}

export function RepositoryAgeDistribution({ data }: { data: RepositoryAge[] }) {
  const chartData: DataItem[] = data.map((item) => ({
    name: item.name,
    ageInYears: item.ageInYears,
    ageInDays: item.ageInDays,
  }));

  return (
    <GenericBarChart
      title="Repository Age"
      data={chartData}
      bars={[
        {
          dataKey: "ageInYears",
          name: "Age in Years",
          fill: CHART_COLORS.BLUE,
        },
      ]}
      layout="vertical"
      height={400}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => `${Number(value)} years`}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      fullWidth
    />
  );
}

export function RepositoryMetadataRatio({
  data,
}: {
  data: RepositoryMetadata[];
}) {
  const chartData: DataItem[] = data.map((item) => ({
    name: item.name,
    ratio: item.ratio,
  }));

  return (
    <GenericBarChart
      title="Code to Metadata Ratio"
      data={chartData}
      bars={[
        {
          dataKey: "ratio",
          name: "Code to Metadata Ratio",
          fill: CHART_COLORS.ORANGE,
        },
      ]}
      layout="vertical"
      height={400}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => Number(value).toFixed(2)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      fullWidth
    />
  );
}

export function RepositoryTagReleaseFrequency({
  data,
}: {
  data: RepositoryReleaseInfo[];
}) {
  const chartData: DataItem[] = data.map((item) => ({
    name: item.name,
    tagsPerYear: item.tagsPerYear,
    releasesPerYear: item.releasesPerYear,
    tags: item.tags,
    releases: item.releases,
    age: item.age,
    total: item.total,
  }));

  return (
    <GenericBarChart
      title="Tag & Release Frequency"
      data={chartData}
      bars={[
        {
          dataKey: "tagsPerYear",
          name: "Tags per Year",
          fill: CHART_COLORS.GREEN,
          stackId: "a",
        },
        {
          dataKey: "releasesPerYear",
          name: "Releases per Year",
          fill: CHART_COLORS.BLUE,
          stackId: "a",
        },
      ]}
      layout="vertical"
      height={400}
      YAxisProps={{
        type: "category",
        dataKey: "name",
        width: 90,
        stroke: "#8b949e",
        tick: renderVerticalTick,
      }}
      XAxisProps={{
        type: "number",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      }}
      formatter={(value: ValueType) => Number(value).toFixed(2)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      fullWidth
    />
  );
}

export function RepositoryFeatureDistribution({ stats }: { stats: Stats }) {
  const FEATURE_COLORS: Record<string, string> = {
    Issues: "#58a6ff",
    "Pull Requests": "#3fb950",
    Discussions: "#ad6eff",
    Projects: "#f78166",
    Wiki: "#6e7681",
    "Protected Branches": "#e3b341",
    Milestones: "#ff7b72",
  };
  const FALLBACK_COLOR = "#8b949e";
  const totalCount = stats.collaborationStats.featureDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const data = stats.collaborationStats.featureDistribution.map((item) => ({
    name: item.feature,
    value: item.count,
    percent: ((item.count / totalCount) * 100).toFixed(1),
  }));
  return (
    <GenericPieChart
      title="Repository Features Distribution"
      data={data}
      colors={data.map((entry) => FEATURE_COLORS[entry.name] || FALLBACK_COLOR)}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      labelFormatter={(item) => `${item.name}: ${item.percent}%`}
    />
  );
}

export function Collaborators({
  stats,
  limit = 10,
  fullWidth,
}: {
  stats: Stats;
  limit?: number;
  fullWidth?: boolean;
}) {
  const data = stats.collaborationStats.topCollaboratorRepos.slice(0, limit);
  return (
    <GenericTable
      title={
        limit
          ? `${limit} Repositories with Most Collaborators`
          : "Repositories with Most Collaborators"
      }
      data={data}
      columns={[
        { key: "name", header: "Repository" },
        { key: "collaboratorCount", header: "Collaborators", align: "right" },
      ]}
      fullWidth={fullWidth}
    />
  );
}
