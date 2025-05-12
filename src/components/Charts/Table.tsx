import React from "react";
import {
  tableCardStyle,
  tableCardTitleStyle,
  tableStyle,
  tableCellStyle,
  tableHeaderStyle,
  tableBodyCellStyle,
  tableFirstColStyle,
} from "@styles";

export interface TableRow {
  [key: string]: string | number | boolean | null | undefined;
}

export interface TableColumn {
  key: string;
  header: string;
  render?: (
    value: string | number | boolean | null | undefined,
    row: TableRow
  ) => React.ReactNode;
  align?: "left" | "right" | "center";
}

export interface GenericTableProps {
  title: string;
  data: TableRow[];
  columns: TableColumn[];
  limit?: number;
  fullWidth?: boolean;
  className?: string;
}

export function GenericTable({
  title,
  data,
  columns,
  limit,
  fullWidth = false,
  className,
}: GenericTableProps) {
  const rows = limit ? data.slice(0, limit) : data;

  return (
    <div
      style={
        fullWidth ? { ...tableCardStyle, gridColumn: "1 / -1" } : tableCardStyle
      }
      className={className}
    >
      <h3 style={tableCardTitleStyle}>
        {limit ? `${limit} ` : ""}
        {title}
      </h3>
      <table style={tableStyle}>
        <thead>
          <tr style={{ borderBottom: "1px solid #30363d" }}>
            {columns.map((column, index) => (
              <th
                key={column.key}
                style={{
                  ...tableCellStyle,
                  ...tableHeaderStyle,
                  ...(index === 0 ? tableFirstColStyle : {}),
                  textAlign: column.align || (index === 0 ? "left" : "right"),
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderBottom:
                  rowIndex < rows.length - 1 ? "1px solid #21262d" : "none",
              }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  style={{
                    ...tableCellStyle,
                    ...tableBodyCellStyle,
                    ...(colIndex === 0 ? tableFirstColStyle : {}),
                    textAlign:
                      column.align || (colIndex === 0 ? "left" : "right"),
                  }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
