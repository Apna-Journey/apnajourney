import React from 'react';
import { useTranslation } from 'react-i18next'; // Import translation hook

function ProfilesPage() {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <div>
      <h1>{t('viewProfiles')}</h1>
      <p>{t('profilesComingSoon')}</p>
    </div>
  );
}

export default ProfilesPage;

