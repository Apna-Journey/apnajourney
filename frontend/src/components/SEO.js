import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

function SEO({ title, description, keywords, business }) {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <Helmet>
      <title>{title} | {t('siteName', { defaultValue: 'Apna Journey' })}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="business" content={business} />
    </Helmet>
  );
}

export default SEO;
