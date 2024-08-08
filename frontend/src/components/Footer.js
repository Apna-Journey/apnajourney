import React from 'react';
import { useTranslation } from 'react-i18next'; // Import translation hook

function Footer() {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <footer style={{ background: '#f0f0f0', padding: '10px', textAlign: 'center', marginTop: '20px' }}>
      <p>&copy; 2024 {t('Apna Journey')}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
