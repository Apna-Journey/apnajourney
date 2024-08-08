import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';
import { apiRequest } from '../services/api'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 


const PreviewProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiRequest(`/profiles/${id}`, 'GET');
        if (response) {
          setProfile(response.data);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await generatePDF(profile);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSavePDFToFirebase = async () => {
    try {
      const pdfBlob = await generatePDF(profile);
      const storageRef = ref(`profiles/${profile.id}.pdf`);
      await uploadBytes(storageRef, pdfBlob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('PDF saved to Firebase Storage:', downloadURL);
      alert('PDF saved to Firebase Storage successfully!');
    } catch (error) {
      console.error('Error saving PDF to Firebase Storage:', error);
      alert('Failed to save PDF to Firebase Storage.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>Preview Company Profile</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{profile.name}</h2>
          <p><strong>Industry:</strong> {profile.industry}</p>
          <p><strong>Description:</strong> {profile.description}</p>
          <p><strong>Founded:</strong> {profile.foundedYear}</p>
          <p><strong>Employees:</strong> {profile.employees}</p>
          <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
          <p><strong>Location:</strong> {profile.location}</p>
          {profile.logo && <img src={profile.logo} alt="Logo" width="100" />}
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleDownloadPDF}>Download PDF</button>
        <button className="btn btn-success" onClick={handleSavePDFToFirebase}>Save PDF to Firebase</button>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/profiles')}>Back to Profiles</button>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
    </div>
  );
};

export default PreviewProfilePage;
