// File: src/components/Dashboard/LargestRepos.tsx

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    name: string;
    size: number;
  }[];
}

const formatSize = (size: number) => {
  return size >= 1000
    ? `${(size / 1000).toFixed(2)} GB`
    : `${size.toFixed(0)} MB`;
};

export default function LargestRepos({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Top 10 Largest Repositories</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis type="number" stroke="#8b949e" />
          <YAxis type="category" dataKey="name" width={150} stroke="#8b949e" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1117',
              borderColor: '#30363d',
              color: '#c9d1d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            formatter={(value: number) => formatSize(value)}
            itemStyle={{ color: '#c9d1d9' }}
          />
          <Bar dataKey="size" fill="#f78166" name="Size (MB)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const chartCardStyle: React.CSSProperties = {
  backgroundColor: '#161b22',
  padding: '24px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  marginBottom: '32px'
};

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '18px',
  marginBottom: '16px'
};

