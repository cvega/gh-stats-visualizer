import type { ReactNode } from "react";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  chartCardStyle,
  chartContainerStyle,
  titleStyle,
  tooltipStyle,
  tooltipItemStyle,
} from "@styles";

export interface LineDataItem {
  name: string;
  [key: string]: string | number;
}

export interface LineConfig {
  dataKey: string;
  name?: string;
  stroke?: string;
  type?:
    | "monotone"
    | "linear"
    | "step"
    | "stepBefore"
    | "stepAfter"
    | "basis"
    | "basisOpen"
    | "basisClosed"
    | "natural";
}

export interface GenericLineChartProps {
  title: string;
  data: LineDataItem[];
  lines: LineConfig[];
  height?: number;
  colors?: string[];
  formatter?: (value: ValueType, name: NameType, entry: Payload<ValueType, string>) => ReactNode;
  xAxisDataKey?: string;
  margin?: { top: number; right: number; left: number; bottom: number };
  className?: string;
  fullWidth?: boolean;
}

export function GenericLineChart({
  title,
  data,
  lines,
  height = 300,
  colors = ["#3fb950", "#58a6ff", "#ad6eff", "#f78166"],
  formatter = (value: ValueType) => String(value).toLocaleString(),
  xAxisDataKey = "name",
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  className,
  fullWidth = false,
}: GenericLineChartProps) {
  return (
    <div
      style={
        fullWidth ? { ...chartCardStyle, gridColumn: "1 / -1" } : chartCardStyle
      }
      className={className}
    >
      <h3 style={titleStyle}>{title}</h3>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke="#8b949e"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#8b949e" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={formatter}
              itemStyle={tooltipItemStyle}
            />
            {lines.length > 1 && <Legend />}
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type={line.type || "monotone"}
                dataKey={line.dataKey}
                stroke={line.stroke || colors[index % colors.length]}
                name={line.name || line.dataKey}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
