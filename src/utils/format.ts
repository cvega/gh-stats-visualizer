// File: src/utils/format.ts

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatSize(size: number): string {
  return size >= 1000
    ? `${(size / 1000).toFixed(2)} GB`
    : `${size.toFixed(0)} MB`;
}
