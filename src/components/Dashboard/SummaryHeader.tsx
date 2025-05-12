import { titleStyle, subtitleStyle } from "@styles";

interface Props {
  title: string;
  description?: string;
}

export default function SummaryHeader({ title, description }: Props) {
  return (
    <div style={{ marginBottom: "24px", marginTop: "24px" }}>
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={subtitleStyle}>{description}</p>}
    </div>
  );
}
