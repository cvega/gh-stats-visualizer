import React from 'react';

export const chartCellStyle: React.CSSProperties = {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  height: '100%',
};

export function formatSize(sizeMB: number): string {
  const sizeB = sizeMB * 1024 * 1024;
  if (sizeB < 1024) return `${sizeB.toFixed(0)} B`;
  if (sizeB < 1024 * 1024) return `${(sizeB / 1024).toFixed(2)} KB`;
  if (sizeB < 1024 * 1024 * 1024) return `${(sizeB / 1024 / 1024).toFixed(2)} MB`;
  if (sizeB < 1024 * 1024 * 1024 * 1024) return `${(sizeB / 1024 / 1024 / 1024).toFixed(2)} GB`;
  return `${(sizeB / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
} 