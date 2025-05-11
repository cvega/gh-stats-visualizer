import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  chartCardStyle,
  chartContainerStyle,
  titleStyle,
  tooltipStyle,
  tooltipItemStyle,
} from "@styles";

interface Props {
  data: { name: string; value: number }[];
}

const formatNumber = (num: number) => num.toLocaleString();

export default function OrganizationRepositoryDistribution({ data }: Props) {
  return (
    <div style={chartCardStyle}>
      <h3 style={titleStyle}>Organization Repository Distribution</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis type="number" stroke="#8b949e" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              stroke="#8b949e"
              tick={({ x, y, payload }) => {
                const label =
                  payload.value.length > 14
                    ? payload.value.slice(0, 14) + "…"
                    : payload.value;
                return (
                  <text
                    x={x}
                    y={y}
                    dy={4}
                    fontSize={12}
                    textAnchor="end"
                    transform={`rotate(-30, ${x}, ${y})`}
                    fill="#8b949e"
                  >
                    {label}
                  </text>
                );
              }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => formatNumber(value)}
              itemStyle={tooltipItemStyle}
            />
            <Bar dataKey="value" fill="#ad6eff" name="Repositories" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
