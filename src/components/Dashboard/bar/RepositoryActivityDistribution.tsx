import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  chartContainerStyle,
  titleStyle,
  tooltipStyle,
  tooltipItemStyle,
  chartCardStyle,
} from "../../../styles";

interface Props {
  data: {
    name: string;
    issues: number;
    prs: number;
    total: number;
  }[];
}

const formatNumber = (num: number) => num.toLocaleString();
const formatRepoName = (name: string) => name.split("/").pop() || name;

export default function RepositoryActivityDistribution({ data }: Props) {
  return (
    <div style={{ ...chartCardStyle, marginBottom: "24px" }}>
      <h3 style={titleStyle}>Top 10 Most Active Repositories</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis type="number" stroke="#8b949e" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              stroke="#8b949e"
              tick={({ x, y, payload }) => {
                const repo = formatRepoName(payload.value);
                const label = repo.length > 18 ? repo.slice(0, 18) + "…" : repo;
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
              labelFormatter={(label) => formatRepoName(label)}
            />
            <Legend />
            <Bar dataKey="issues" stackId="a" fill="#f78166" name="Issues" />
            <Bar
              dataKey="prs"
              stackId="a"
              fill="#3fb950"
              name="Pull Requests"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
