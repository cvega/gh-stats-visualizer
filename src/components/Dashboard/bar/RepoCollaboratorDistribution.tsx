import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Stats } from '../../../types';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from '../styles';

interface Props {
  stats: Stats;
}

const formatNumber = (num: number) => num.toLocaleString();

export function CollaboratorDistribution({ stats }: Props) {
  const data = stats.collaborationStats.collaboratorDistribution;

  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Collaborator Distribution</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis dataKey="range" stroke="#8b949e" tick={{ fontSize: 12 }} />
            <YAxis stroke="#8b949e" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => formatNumber(value)}
              itemStyle={tooltipItemStyle}
            />
            <Bar dataKey="count" fill="#ad6eff" name="Collaborators" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
