import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  chartCardStyle,
  chartContainerStyle,
  titleStyle
} from '../../../styles';

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

export default function RepositorySizeDistribution({ data }: Props) {
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
