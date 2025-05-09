// File: src/components/Dashboard/CreationLine.tsx

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { year: number; count: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function CreationLine({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Creation Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="year" stroke="#8b949e" />
          <YAxis stroke="#8b949e" />
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
          <Line type="monotone" dataKey="count" stroke="#3fb950" name="Repositories Created" />
        </LineChart>
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

