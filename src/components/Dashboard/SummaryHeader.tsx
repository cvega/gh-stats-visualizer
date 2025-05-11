import { titleStyle, subtitleStyle } from './styles';

interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div style={{ marginBottom: description ? '8px' : '16px' }}>
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={subtitleStyle}>{description}</p>}
    </div>
  );
}

