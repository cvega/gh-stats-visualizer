import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { name: string; value: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

// Transform size labels to be more concise
const transformData = (data: Props['data']) => data.map(item => ({
  ...item,
  name: item.name
    .replace('Less than 1 MB', '<1MB')
    .replace('More than 1000 MB', '>1GB')
    .replace(' MB', 'MB')
}));

export default function SizeBar({ data }: Props) {
  const transformedData = transformData(data);
  
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Size Distribution</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis 
              dataKey="name" 
              stroke="#8b949e" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#8b949e" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                color: '#c9d1d9',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value: number) => formatNumber(value)}
              itemStyle={{ color: '#c9d1d9' }}
            />
            <Bar dataKey="value" fill="#f78166" name="Repositories" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const chartCardStyle: React.CSSProperties = {
  backgroundColor: '#161b22',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const chartContainerStyle: React.CSSProperties = {
  flex: 1,
  minHeight: 0 // Important for flex child to respect parent height
};

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '14px',
  fontWeight: 500,
  margin: 0
};


