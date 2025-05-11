import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { Stats } from '../../../types';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from '../styles';

const FEATURE_COLORS: Record<string, string> = {
  'Issues': '#58a6ff',      // blue
  'Pull Requests': '#3fb950', // green
  'Discussions': '#ad6eff',   // purple
  'Projects': '#f78166',      // orange
  'Wiki': '#6e7681',          // gray
  'Protected Branches': '#e3b341', // yellow/gold
  'Milestones': '#ff7b72',     // coral
};
const FALLBACK_COLOR = '#8b949e'; // fallback gray

interface Props {
  stats: Stats;
}

const formatNumber = (num: number) => num.toLocaleString();

export function RepositoryFeatureDistribution({ stats }: Props) {
  // Calculate total sum of all counts
  const totalCount = stats.collaborationStats.featureDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const data = stats.collaborationStats.featureDistribution.map(item => ({
    name: item.feature,
    value: item.count,
    percentage: ((item.count / totalCount) * 100).toFixed(1)
  }));

  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Features Distribution</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              style={{ fontSize: 12 }}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={FEATURE_COLORS[entry.name] || FALLBACK_COLOR} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={tooltipItemStyle}
              formatter={(value: number) => formatNumber(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 