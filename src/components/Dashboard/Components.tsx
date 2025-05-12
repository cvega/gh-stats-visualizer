import type { Stats } from "../../types/stats";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { 
  RepositoryAge, 
  RepositoryComplexity, 
  RepositoryActivity, 
  RepositoryMetadata, 
  RepositoryReleaseInfo 
} from "../../types/repository";
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
import { dashboardGridStyle } from "../../styles";
import StatsCardGrid from "./StatsCardGrid";

export function RefactoredRepositoryActivityLevels({
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
export function RefactoredRepositorySizeDistribution({
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
export function RefactoredRepositoryUpdateFrequency({
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
export function RefactoredRepositoryCreationTime({
  data,
}: {
  data: { year: number; count: number }[];
}) {
  const lineData = data.map(item => ({
    name: item.year.toString(),
    value: item.count
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
export function RefactoredRepositorySizeLargest({
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
export function RefactoredRepositoryTable({
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

export function RefactoredDashboardSection({ stats }: { stats: Stats }) {
  return (
    <div>
      {/* Stat cards */}
      <StatsCardGrid stats={stats.basic} />

      {/* Main chart grid */}
      <div style={dashboardGridStyle}>
        {/* Pie and Bar Charts */}
        <RefactoredRepositoryActivityLevels data={stats.activityData} />
        <RefactoredRepositorySizeDistribution data={stats.sizeData} />
        <RefactoredRepositoryUpdateFrequency data={stats.updateData} />
        <RefactoredRepositoryCreationTime data={stats.yearData} />
        <RefactoredBranchDistribution data={stats.branchData} />
        <RefactoredOrganizationRepositoryDistribution data={stats.orgData} />
        <RefactoredRepoCollaboratorDistribution stats={stats} />
        <RefactoredRepositoryFeatureDistribution stats={stats} />
        <RefactoredBranchComplexity data={stats.branchComplexity} />
        <RefactoredRepositoryActivityDistribution
          data={stats.mostActiveRepos}
        />
        <RefactoredRepositoryAgeDistribution data={stats.repositoryAge} />
        <RefactoredRepositoryMetadataRatio data={stats.metadataRatios} />
        <RefactoredRepositoryTagReleaseFrequency
          data={stats.tagReleaseFrequency}
        />
        <RefactoredRepositorySizeLargest data={stats.largestRepos} />
      </div>

      {/* Largest Repos */}

      {/* Tables grid */}
      <div style={dashboardGridStyle}>
        <RefactoredRepositoryTable
          data={stats.newestRepos}
          title="Newest"
          limit={10}
        />
        <RefactoredRepositoryTable
          data={stats.oldestRepos}
          title="Oldest"
          limit={10}
        />
        <RefactoredCollaborators stats={stats} limit={10} />
      </div>

      {/* Recently updated table */}
      <RefactoredRepositoryTable
        data={stats.recentlyUpdated}
        title="Most Recently Updated"
        limit={20}
        fullWidth={true}
      />
    </div>
  );
}

export function RefactoredBranchComplexity({ data }: { data: RepositoryComplexity[] }) {
  const chartData: DataItem[] = data.map(item => ({
    name: item.name,
    complexityBySize: item.complexityBySize,
    complexityByAge: item.complexityByAge,
    branches: item.branches,
    size: item.size,
    age: item.age
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

export function RefactoredBranchDistribution({ data }: { data: { name: string; value: number }[] }) {
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

export function RefactoredOrganizationRepositoryDistribution({
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

export function RefactoredRepoCollaboratorDistribution({
  stats,
}: {
  stats: Stats;
}) {
  const data = stats.collaborationStats.collaboratorDistribution;
  const chartData = data.map(item => ({
    name: item.range,
    value: item.count
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

export function RefactoredRepositoryActivityDistribution({
  data,
}: {
  data: RepositoryActivity[];
}) {
  const chartData: DataItem[] = data.map(item => ({
    name: item.name,
    issues: item.issues,
    prs: item.prs,
    total: item.total
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

export function RefactoredRepositoryAgeDistribution({ data }: { data: RepositoryAge[] }) {
  const chartData: DataItem[] = data.map(item => ({
    name: item.name,
    ageInYears: item.ageInYears,
    ageInDays: item.ageInDays
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

export function RefactoredRepositoryMetadataRatio({ data }: { data: RepositoryMetadata[] }) {
  const chartData: DataItem[] = data.map(item => ({
    name: item.name,
    ratio: item.ratio,
    size: item.size,
    metadata: item.metadata
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

export function RefactoredRepositoryTagReleaseFrequency({
  data,
}: {
  data: RepositoryReleaseInfo[];
}) {
  const chartData: DataItem[] = data.map(item => ({
    name: item.name,
    tagsPerYear: item.tagsPerYear,
    releasesPerYear: item.releasesPerYear,
    tags: item.tags,
    releases: item.releases,
    age: item.age,
    total: item.total
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

export function RefactoredRepositoryFeatureDistribution({
  stats,
}: {
  stats: Stats;
}) {
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
  const data = stats.collaborationStats.featureDistribution.map(
    (item) => ({
      name: item.feature,
      value: item.count,
      percent: ((item.count / totalCount) * 100).toFixed(1),
    })
  );
  return (
    <GenericPieChart
      title="Repository Features Distribution"
      data={data}
      colors={data.map(
        (entry) => FEATURE_COLORS[entry.name] || FALLBACK_COLOR
      )}
      formatter={(value: ValueType) => formatNumber(Number(value))}
      labelFormatter={(item) => `${item.name}: ${item.percent}%`}
    />
  );
}

export function RefactoredCollaborators({
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
