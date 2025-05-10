import type { CSSProperties } from 'react';

export const chartCardStyle: CSSProperties = {
  backgroundColor: '#161b22',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

export const chartContainerStyle: CSSProperties = {
  flex: 1,
  minHeight: 0 // Important for flex child to respect parent height
};

export const titleStyle: CSSProperties = {
  color: 'white',
  fontSize: '14px',
  fontWeight: 500,
  margin: 0
};

export const subtitleStyle: CSSProperties = {
  color: '#8b949e',
  fontSize: '12px',
  margin: 0
};

export const tooltipStyle: CSSProperties = {
  backgroundColor: '#0d1117',
  borderColor: '#30363d',
  color: '#c9d1d9',
  borderRadius: '6px',
  fontSize: '12px'
};

export const tooltipItemStyle: CSSProperties = {
  color: '#c9d1d9'
}; 