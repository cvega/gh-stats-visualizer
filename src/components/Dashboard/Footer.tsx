// File: src/components/Dashboard/Footer.tsx

import React from 'react';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>GitHub Repository Analysis Tool for Migration Planning</p>
      <p style={{ marginTop: '8px' }}>
        Analyze repository metrics to make informed decisions about your GitHub migration.
      </p>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '24px 0',
  borderTop: '1px solid #21262d',
  color: '#8b949e',
  fontSize: '12px'
};

