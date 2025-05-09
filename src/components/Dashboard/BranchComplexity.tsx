// File: src/components/Dashboard/BranchComplexity.tsx

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    name: string;
    branches: number;
    size: number;
    age: string;
    complexityBySize: number;
    complexityByAge: number;
  }[];
}

export default function BranchComplexity({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Branch Complexity</h3>
      <p style={subtitleStyle}>
        Repositories with highest branch count relative to repository size
      </p>
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
            formatter={(value: number) => value.toFixed(2)}
            itemStyle={{ color: '#c9d1d9' }}
          />
          <Legend />
          <Bar dataKey="complexityBySize" fill="#ad6eff" name="Branches per MB" />
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

