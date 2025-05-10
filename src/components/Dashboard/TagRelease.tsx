import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from './styles';

interface Props {
  data: {
    name: string;
    tags: number;
    releases: number;
    age: string;
    tagsPerYear: number;
    releasesPerYear: number;
    total: number;
  }[];
}

export default function TagRelease({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Tag & Release Frequency</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis type="number" stroke="#8b949e" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              stroke="#8b949e"
              tick={({ x, y, payload }) => {
                let repo = payload.value;
                if (repo.includes('/')) {
                  repo = repo.split('/').pop();
                }
                const label = repo.length > 18 ? repo.slice(0, 18) + '…' : repo;
                return (
                  <text
                    x={x}
                    y={y}
                    dy={4}
                    fontSize={12}
                    textAnchor="end"
                    transform={`rotate(-30, ${x}, ${y})`}
                    fill="#8b949e"
                  >
                    {label}
                  </text>
                );
              }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => value.toFixed(2)}
              itemStyle={tooltipItemStyle}
            />
            <Legend />
            <Bar dataKey="tagsPerYear" stackId="a" fill="#3fb950" name="Tags per Year" />
            <Bar dataKey="releasesPerYear" stackId="a" fill="#58a6ff" name="Releases per Year" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

