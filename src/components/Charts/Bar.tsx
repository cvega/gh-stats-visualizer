import type { ReactNode, ReactElement } from "react";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  chartCardStyle,
  chartContainerStyle,
  titleStyle,
  tooltipStyle,
  tooltipItemStyle,
} from "@styles";

export interface DataItem {
  name: string;
  [key: string]: string | number;
}

export interface GenericBarConfig {
  dataKey: string;
  name?: string;
  fill?: string;
  stackId?: string;
}

interface AxisProps {
  type?: "number" | "category";
  dataKey?: string;
  stroke?: string;
  width?: number;
  tick?:
    | {
        fontSize?: number;
      }
    | ((props: {
        x: number;
        y: number;
        payload: { value: string | number };
      }) => ReactElement<SVGElement>);
}

export interface GenericBarChartProps {
  title: string;
  data: DataItem[];
  bars: GenericBarConfig[];
  layout?: "horizontal" | "vertical";
  height?: number;
  colors?: string[];
  renderCustomTick?: (props: {
    x: number;
    y: number;
    payload: { value: string | number };
  }) => ReactElement<SVGElement>;
  formatter?: (
    value: ValueType,
    name: NameType,
    entry: Payload<ValueType, string>
  ) => ReactNode;
  labelFormatter?: (label: string) => ReactNode;
  margin?: { top: number; right: number; left: number; bottom: number };
  XAxisProps?: Partial<AxisProps>;
  YAxisProps?: Partial<AxisProps>;
  className?: string;
  fullWidth?: boolean;
}

export function GenericBarChart({
  title,
  data,
  bars,
  layout = "horizontal",
  height = 300,
  colors,
  renderCustomTick,
  formatter = (value: ValueType) => String(value).toLocaleString(),
  labelFormatter,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  XAxisProps = {},
  YAxisProps = {},
  className,
  fullWidth = false,
}: GenericBarChartProps) {
  const isVertical = layout === "vertical";

  // Default props for axes based on layout
  const defaultXAxisProps: AxisProps = isVertical
    ? { type: "number", stroke: "#8b949e", tick: { fontSize: 12 } }
    : {
        type: "category",
        dataKey: "name",
        stroke: "#8b949e",
        tick: { fontSize: 12 },
      };

  const defaultYAxisProps: AxisProps = isVertical
    ? { type: "category", dataKey: "name", width: 90, stroke: "#8b949e" }
    : { type: "number", stroke: "#8b949e", tick: { fontSize: 12 } };

  // Merge default and custom props
  const xAxisProps = { ...defaultXAxisProps, ...XAxisProps };
  const yAxisProps = { ...defaultYAxisProps, ...YAxisProps };

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
          <BarChart data={data} layout={layout} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />

            <XAxis {...xAxisProps} tick={renderCustomTick || xAxisProps.tick} />

            <YAxis
              {...yAxisProps}
              tick={
                renderCustomTick && isVertical
                  ? renderCustomTick
                  : yAxisProps.tick
              }
            />

            <Tooltip
              contentStyle={tooltipStyle}
              formatter={formatter}
              itemStyle={tooltipItemStyle}
              labelFormatter={labelFormatter}
            />

            {bars.length > 1 && <Legend />}

            {bars.map((bar: GenericBarConfig, index: number) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name || bar.dataKey}
                fill={
                  bar.fill ||
                  (colors ? colors[index % colors.length] : "#238636")
                }
                stackId={bar.stackId}
              >
                {colors &&
                  !bar.fill &&
                  data.map((_: DataItem, idx: number) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={colors[idx % colors.length]}
                    />
                  ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
