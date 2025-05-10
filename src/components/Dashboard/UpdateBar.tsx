import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { chartCardStyle, chartContainerStyle, titleStyle } from './styles';

interface Props {
  data: { name: string; value: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function UpdateBar({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Update Frequency</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis
              type="number"
              stroke="#8b949e"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              stroke="#8b949e"
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  dy={4}
                  fontSize={12}
                  textAnchor="end"
                  transform={`rotate(-30, ${x}, ${y})`}
                  fill="#8b949e"
                >
                  {payload.value}
                </text>
              )}
            />
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
            <Bar dataKey="value" fill="#3fb950" name="Repositories" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
