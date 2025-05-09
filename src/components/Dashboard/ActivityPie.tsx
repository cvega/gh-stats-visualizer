import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ACTIVITY_COLORS: Record<string, string> = {
  'No activity': '#6e7681',
  'Low activity': '#768390',
  'Medium activity': '#8b949e',
  'High activity': '#adbac7',
  'Very high activity': '#cdd9e5'
};

interface Props {
  data: { name: string; value: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function ActivityPie({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Activity Levels</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={ACTIVITY_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1117',
              borderColor: '#30363d',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            itemStyle={{
              color: '#c9d1d9' // ✅ enforce light tooltip text color
            }}
            formatter={(value: number) => formatNumber(value)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const chartCardStyle: React.CSSProperties = {
  backgroundColor: '#161b22',
  padding: '24px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  height: '100%', // fill the grid row completely
  display: 'flex',
  flexDirection: 'column'
};

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '18px',
  marginBottom: '16px'
};
