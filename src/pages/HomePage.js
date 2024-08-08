import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { apiRequest } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HomePage = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [foundedYear, setFoundedYear] = useState(null);
  const [employees, setEmployees] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('industry', industry);
    formData.append('description', description);
    if (foundedYear) {
      formData.append('foundedYear', foundedYear.getFullYear());
    }
    formData.append('employees', employees);
    formData.append('website', website);
    formData.append('location', location);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await apiRequest('/profiles', 'POST', formData, true);
      setProfileId(response.id);
      navigate('/profiles');
    } catch (error) {
      alert(t('profileCreationError'));
    }
  };

  const handlePreview = () => {
    if (profileId) {
      navigate(`/preview/${profileId}`);
    } else {
      alert('No profile to preview. Please create a profile first.');
    }
  };

  return (
    <div className="container mt-5">
      <SEO
        title={t('homeTitle')}
        description={t('homeDescription')}
        keywords={t('homeKeywords')}
      />
      <h1>{t('welcome')}</h1>
      <p>{t('Create and manage your company profiles with ease.')}</p>

      <h2>{t('createProfile')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">{t('Company Name')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">{t('Industry')}</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">{t('Description')}</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foundedYear">{t('Year of Foundation')}</label>
          <DatePicker
            selected={foundedYear}
            onChange={(date) => setFoundedYear(date)}
            showYearPicker
            dateFormat="yyyy"
            placeholderText={t('Select year')}
          />
        </div>
        <div>
          <label htmlFor="employees">{t('No. of Employees')}</label>
          <input
            type="number"
            id="employees"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            placeholder={t('Enter number')}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="website">{t('Website Link')}</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">{t('Location')}</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="logo">{t('Logo')}</label>
          <input
            type="file"
            id="logo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>
        <button type="submit">{t('Create Profile')}</button>
      </form>

      <button onClick={handlePreview}>{t('Preview')}</button>

      <u><h2>{t('Quick Links')}</h2></u>
      <Link to="/login" className="btn btn-primary">{t('Login')}</Link>
      <pre></pre>
      <Link to="/register" className="btn btn-secondary">{t('Register')}</Link>
    </div>
  );
}

export default HomePage;
