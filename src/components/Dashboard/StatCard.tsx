import { statCardStyle, statLabelStyle, statValueStyle } from './styles';

interface Props {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ title, value, color = '#238636' }: Props) {
  return (
    <div style={statCardStyle}>
      <div style={statLabelStyle}>{title}</div>
      <div style={{ ...statValueStyle, color }}>{value}</div>
    </div>
  );
}
