// File: src/components/Dashboard/StatCard.tsx

import React from 'react';

interface Props {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ title, value, color = '#238636' }: Props) {
  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{title}</div>
      <div style={{ ...valueStyle, color }}>{value}</div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#161b22',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#8b949e',
  marginBottom: '4px'
};

const valueStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold'
};

