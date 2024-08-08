import React from 'react';
import { useTranslation } from 'react-i18next'; // Import translation hook
import { handleFileUpload } from '../utils/storage';

const FileUploadComponent = () => {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <div>
      <h2>{t('uploadFile')}</h2>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploadComponent;

