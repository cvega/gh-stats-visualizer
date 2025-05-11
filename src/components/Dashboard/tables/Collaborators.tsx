import type { Stats } from "../../../types";
import {
  tableCardStyle,
  tableCardTitleStyle,
  tableStyle,
  tableCellStyle,
  tableHeaderStyle,
  tableBodyCellStyle,
  tableFirstColStyle,
} from "@styles";

interface Props {
  stats: Stats;
  limit?: number;
  fullWidth?: boolean;
}

export function Collaborators({ stats, limit = 10, fullWidth }: Props) {
  const data = stats.collaborationStats.topCollaboratorRepos.slice(0, limit);

  return (
    <div
      style={
        fullWidth ? { ...tableCardStyle, gridColumn: "1 / -1" } : tableCardStyle
      }
    >
      <h3 style={tableCardTitleStyle}>
        {limit ? `${limit} ` : ""}Repositories with Most Collaborators
      </h3>
      <table style={tableStyle}>
        <thead>
          <tr style={{ borderBottom: "1px solid #30363d" }}>
            <th
              style={{
                ...tableCellStyle,
                ...tableHeaderStyle,
                ...tableFirstColStyle,
              }}
            >
              Repository
            </th>
            <th
              style={{
                ...tableCellStyle,
                ...tableHeaderStyle,
                textAlign: "right",
              }}
            >
              Collaborators
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((repo, index) => (
            <tr
              key={repo.name}
              style={{
                borderBottom:
                  index < data.length - 1 ? "1px solid #21262d" : "none",
              }}
            >
              <td
                style={{
                  ...tableCellStyle,
                  ...tableBodyCellStyle,
                  ...tableFirstColStyle,
                }}
              >
                {repo.name}
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  ...tableBodyCellStyle,
                  textAlign: "right",
                }}
              >
                {repo.collaboratorCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
