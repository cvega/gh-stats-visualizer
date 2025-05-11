import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from '../styles';

interface Props {
  data: { year: number; count: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function RepositoryCreationTime({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Creation Timeline</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis 
              dataKey="year" 
              stroke="#8b949e" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#8b949e" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => formatNumber(value)}
              itemStyle={tooltipItemStyle}
            />
            <Line type="monotone" dataKey="count" stroke="#3fb950" name="Repositories Created" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

