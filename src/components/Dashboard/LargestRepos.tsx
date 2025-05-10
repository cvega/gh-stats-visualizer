import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from './styles';

interface Props {
  data: { name: string; value: number }[];
}

const formatSize = (size: number) =>
  size >= 1000 ? `${(size / 1000).toFixed(2)} GB` : `${size.toFixed(0)} MB`;

const formatRepoName = (name: string) => name.split('/').pop() || name;

export default function LargestRepos({ data }: Props) {
  console.log('LargestRepos data:', data);
  console.log('Data type:', typeof data);
  console.log('Is array?', Array.isArray(data));
  console.log('First item:', data?.[0]);
  console.log('Data length:', data?.length);
  console.log('All items:', data?.map(item => ({ name: item.name, value: item.value })));
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Top 10 Largest Repositories</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis 
              type="number" 
              stroke="#8b949e"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={90} 
              stroke="#8b949e"
              tick={({ x, y, payload }) => {
                const repo = formatRepoName(payload.value);
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
              formatter={(value: number) => formatSize(value)}
              itemStyle={tooltipItemStyle}
              labelFormatter={(label) => formatRepoName(label)}
            />
            <Legend />
            <Bar dataKey="value" fill="#f78166" name="Size (MB)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
