import React from 'react';

interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div style={{ marginBottom: description ? '8px' : '16px' }}>
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={descStyle}>{description}</p>}
    </div>
  );
}

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '18px',
  marginBottom: '4px',
  fontWeight: 600
};

const descStyle: React.CSSProperties = {
  color: '#8b949e',
  fontSize: '14px',
  margin: 0
};

