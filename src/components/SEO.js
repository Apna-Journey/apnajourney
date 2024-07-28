import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ title, description, keywords,business }) {
  return (
    <Helmet>
      <title>{title} | Apna Journey</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="business" content={business} />
    </Helmet>
  );
}

export default SEO;