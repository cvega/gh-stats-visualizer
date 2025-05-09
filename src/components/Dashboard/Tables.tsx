// File: src/components/Dashboard/Tables.tsx

import React from 'react';

interface RepoDate {
  name: string;
  created?: string;
  lastPush?: string;
}

interface Props {
  newest: RepoDate[];
  oldest: RepoDate[];
  updated: RepoDate[];
}

export default function Tables({ newest, oldest, updated }: Props) {
  return (
    <div style={gridStyle}>
      <RepoTable title="5 Newest Repositories" data={newest} dateKey="created" />
      <RepoTable title="5 Oldest Repositories" data={oldest} dateKey="created" />
      <RepoTable title="5 Most Recently Updated Repositories" data={updated} dateKey="lastPush" fullWidth />
    </div>
  );
}

function RepoTable({
  title,
  data,
  dateKey,
  fullWidth = false
}: {
  title: string;
  data: RepoDate[];
  dateKey: 'created' | 'lastPush';
  fullWidth?: boolean;
}) {
  return (
    <div style={{
    backgroundColor: '#161b22',
    padding: '24px',
    borderRadius: '6px',
    border: '1px solid #30363d',
    ...(fullWidth
      ? {
          gridColumn: '1 / -1',
          marginTop: '0',        // prevent stacking margin collapse
        }
      : {}),
  }}>
      <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #30363d' }}>
            <th style={thStyle}>Repository</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>
              {dateKey === 'created' ? 'Created Date' : 'Last Push Date'}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((repo, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index < data.length - 1 ? '1px solid #21262d' : 'none'
              }}
            >
              <td style={tdStyle}>{repo.name}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{repo[dateKey]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginBottom: '24px'
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 16px',
  color: '#8b949e',
  fontWeight: 600,
  fontSize: '14px'
};

const tdStyle: React.CSSProperties = {
  padding: '8px 16px',
  color: '#c9d1d9',
  fontSize: '14px'
};

