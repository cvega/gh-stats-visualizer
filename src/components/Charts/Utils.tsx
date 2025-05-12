import type { ReactElement } from "react";

export const CHART_COLORS = {
  GREEN: "#3fb950",
  BLUE: "#58a6ff",
  PURPLE: "#ad6eff",
  ORANGE: "#f78166",
  GRAY: "#6e7681",
  YELLOW: "#e3b341",
  RED: "#ff7b72",
  LIGHT_BLUE: "#79c0ff",
};

export const formatNumber = (num: number) => num.toLocaleString();

export const formatSize = (sizeMB: number): string => {
  const sizeB = sizeMB * 1024 * 1024;
  if (sizeB < 1024) return `${sizeB.toFixed(0)} B`;
  if (sizeB < 1024 * 1024) return `${(sizeB / 1024).toFixed(2)} KB`;
  if (sizeB < 1024 * 1024 * 1024)
    return `${(sizeB / 1024 / 1024).toFixed(2)} MB`;
  if (sizeB < 1024 * 1024 * 1024 * 1024)
    return `${(sizeB / 1024 / 1024 / 1024).toFixed(2)} GB`;
  return `${(sizeB / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
};

export const formatRepoName = (
  name: string | number | null | undefined
): string => {
  if (!name) return "";
  const nameStr = String(name);
  if (nameStr.includes("/")) {
    return nameStr.split("/").pop() || nameStr;
  }
  return nameStr;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
};

interface TickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

export const renderVerticalTick = (
  { x, y, payload }: TickProps,
  maxLength = 18
): ReactElement<SVGElement> => {
  const name = formatRepoName(payload.value);
  const label = truncateText(name, maxLength);

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
};
