import { tableCardStyle, tableCardTitleStyle, tableStyle, tableCellStyle, tableHeaderStyle, tableBodyCellStyle, tableFirstColStyle } from '../styles';

interface Repo {
  name: string;
  created?: string;
  lastPush?: string;
}

interface RepositoryTableProps {
  data: Repo[];
  fullWidth?: boolean;
  title?: string;
  limit?: number;
}

export default function RepositoryTable({ data, fullWidth, title, limit }: RepositoryTableProps) {
  const rows = limit ? data.slice(0, limit) : data;
  return (
    <div style={fullWidth ? { ...tableCardStyle, gridColumn: '1 / -1' } : tableCardStyle}>
      <h3 style={tableCardTitleStyle}>
        {limit ? `${limit} ` : ''}{title} Repositories
      </h3>
      <table style={tableStyle}>
        <thead>
          <tr style={{ borderBottom: '1px solid #30363d' }}>
            <th style={{ ...tableCellStyle, ...tableHeaderStyle, ...tableFirstColStyle }}>Repository</th>
            <th style={{ ...tableCellStyle, ...tableHeaderStyle, textAlign: 'right' }}>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((repo, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index < rows.length - 1 ? '1px solid #21262d' : 'none'
              }}
            >
              <td style={{ ...tableCellStyle, ...tableBodyCellStyle, ...tableFirstColStyle }}>{repo.name}</td>
              <td style={{ ...tableCellStyle, ...tableBodyCellStyle, textAlign: 'right' }}>
                {repo.created || repo.lastPush}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}