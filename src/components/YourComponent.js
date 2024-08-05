import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import translation hook
import { fetchData } from '../services/api';

const YourComponent = () => {
  const { t } = useTranslation(); // Hook to use translations
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData();
      setData(result);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button>{t('createProfile')}</button>
      <button>{t('viewProfiles')}</button>
    </div>
  );
};

export default YourComponent;
