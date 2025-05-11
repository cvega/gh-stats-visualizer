import type { CSSProperties } from 'react';

// Layout styles
export const containerStyle: CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 16px 48px',
  backgroundColor: '#0d1117'
};

export const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  alignItems: 'stretch',
  marginBottom: '24px',
};

export const chartCellStyle: CSSProperties = {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  height: '100%',
};

// Chart styles
export const chartCardStyle: CSSProperties = {
  backgroundColor: '#161b22',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

export const chartContainerStyle: CSSProperties = {
  flex: 1,
  minHeight: 0 // Important for flex child to respect parent height
};

// Typography styles
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

// Tooltip styles
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

// Footer styles
export const footerStyle: CSSProperties = {
  textAlign: 'center',
  padding: '24px 0',
  borderTop: '1px solid #21262d',
  color: '#8b949e',
  fontSize: '12px'
};

export const statCardStyle: React.CSSProperties = {
  backgroundColor: '#161b22',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #30363d',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

export const statLabelStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#8b949e',
  marginBottom: '4px'
};

export const statValueStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold'
};

export const tablesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
};

export const tableCardStyle: React.CSSProperties = {
  background: '#161b22',
  borderRadius: '6px',
  border: '1px solid #30363d',
  padding: '24px 16px',
  margin: 0,
  boxShadow: 'none',
  display: 'block',
};

export const tableCardTitleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '16px',
  fontWeight: 600,
  margin: '0 0 20px 0',
};

export const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

export const tableCellStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '15px',
};

export const tableHeaderStyle: React.CSSProperties = {
  color: '#8b949e',
  fontWeight: 600,
};

export const tableBodyCellStyle: React.CSSProperties = {
  color: '#c9d1d9',
};

export const tableFirstColStyle: React.CSSProperties = {
  textAlign: 'left',
};