import { footerStyle } from "@styles";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>GitHub Repository Analysis Tool for Migration Planning</p>
      <p style={{ marginTop: "8px" }}>
        Analyze repository metrics to make informed decisions about your GitHub
        migration.
      </p>
    </footer>
  );
}
