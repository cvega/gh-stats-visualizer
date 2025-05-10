import '../../styles/TableCard.css';
import { chartCardStyle, titleStyle } from './styles';

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
    <div
      className="table-card"
      style={fullWidth ? { gridColumn: '1 / -1', marginTop: '32px' } : {}}
    >
      <h3>{title}</h3>
      <table>
        <thead>
          <tr style={{ borderBottom: '1px solid #30363d' }}>
            <th>Repository</th>
            <th style={{ textAlign: 'right' }}>
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
              <td>{repo.name}</td>
              <td style={{ textAlign: 'right' }}>{repo[dateKey]}</td>
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
  // marginBottom: '24px',
  // marginTop: '24px'
};

