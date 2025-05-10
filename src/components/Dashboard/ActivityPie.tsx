import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartCardStyle, chartContainerStyle, titleStyle, tooltipStyle, tooltipItemStyle } from './styles';

const ACTIVITY_COLORS: Record<string, string> = {
  'No activity': '#6e7681',      // or pick a palette color
  'Low activity': '#3fb950',     // green
  'Medium activity': '#58a6ff',  // blue
  'High activity': '#ad6eff',    // purple
  'Very high activity': '#f78166'// orange
};

interface Props {
  data: { name: string; value: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function ActivityPie({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Repository Activity Levels</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={125}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              style={{ fontSize: 12 }}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={ACTIVITY_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={tooltipItemStyle}
              formatter={(value: number) => formatNumber(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

