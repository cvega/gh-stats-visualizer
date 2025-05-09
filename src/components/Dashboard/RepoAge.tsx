// File: src/components/Dashboard/RepoAge.tsx

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    name: string;
    ageInDays: number;
    ageInYears: number;
  }[];
}

export default function RepoAge({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Age</h3>
      <p style={subtitleStyle}>Oldest repositories in your organization</p>
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
            label={{
              value: 'Age (Years)',
              position: 'insideBottom',
              offset: -5,
              fill: '#8b949e',
            }}
          />
          <YAxis type="category" dataKey="name" width={150} stroke="#8b949e" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1117',
              borderColor: '#30363d',
              color: '#c9d1d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            formatter={(value: number) => `${value} years`}
            itemStyle={{ color: '#c9d1d9' }}
          />
          <Bar dataKey="ageInYears" fill="#58a6ff" name="Age in Years" />
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
  marginBottom: '8px'
};

const subtitleStyle: React.CSSProperties = {
  color: '#8b949e',
  fontSize: '14px',
  marginBottom: '16px'
};

