import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateProfilePage from './pages/CreateProfilePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import EditProfilePage from './pages/EditProfilePage';
import DashboardPage from './pages/DashboardPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthProvider } from './services/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavigationBar />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/profiles/:id" element={<ProfileDetailPage />} />
              <Route path="/profiles/:id/edit" element={<EditProfilePage />} />
              <Route path="/create-profile" element={<CreateProfilePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

