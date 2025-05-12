import type { ReactNode } from "react";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  chartCardStyle,
  chartContainerStyle,
  titleStyle,
  tooltipStyle,
  tooltipItemStyle,
} from "@styles";

export interface PieDataItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface PieProps {
  dataKey: string;
  nameKey: string;
  cx?: string;
  cy?: string;
  outerRadius?: number;
  label?: boolean | ((props: { name: string; percent: number }) => string);
  style?: { fontSize?: number };
}

export interface GenericPieChartProps {
  title: string;
  data: PieDataItem[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
  outerRadius?: number;
  formatter?: (
    value: ValueType,
    name: NameType,
    entry: Payload<ValueType, string>
  ) => ReactNode;
  showLabel?: boolean;
  labelFormatter?: (item: { name: string; percent: number }) => string;
  className?: string;
  fullWidth?: boolean;
  pieProps?: Partial<PieProps>;
}

export function GenericPieChart({
  title,
  data,
  dataKey = "value",
  nameKey = "name",
  colors = ["#3fb950", "#58a6ff", "#ad6eff", "#f78166", "#6e7681", "#e3b341"],
  height = 300,
  outerRadius = 125,
  formatter = (value: ValueType) => String(value).toLocaleString(),
  showLabel = true,
  labelFormatter = ({ name, percent }) =>
    `${name}: ${(percent * 100).toFixed(0)}%`,
  className,
  fullWidth = false,
  pieProps = {},
}: GenericPieChartProps) {
  const defaultPieProps: PieProps = {
    dataKey,
    nameKey,
    cx: "50%",
    cy: "50%",
    outerRadius,
    label: showLabel ? labelFormatter : undefined,
    style: { fontSize: 12 },
  };

  const mergedPieProps = { ...defaultPieProps, ...pieProps };

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
          <PieChart>
            <Pie data={data} {...mergedPieProps}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={formatter}
              itemStyle={tooltipItemStyle}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
