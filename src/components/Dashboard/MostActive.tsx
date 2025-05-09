// File: src/components/Dashboard/MostActive.tsx

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    name: string;
    issues: number;
    prs: number;
    total: number;
  }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function MostActive({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Top 10 Most Active Repositories</h3>
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
            formatter={(value: number) => formatNumber(value)}
            itemStyle={{ color: '#c9d1d9' }}
          />
          <Legend />
          <Bar dataKey="issues" stackId="a" fill="#f78166" name="Issues" />
          <Bar dataKey="prs" stackId="a" fill="#3fb950" name="Pull Requests" />
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

