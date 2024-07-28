import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Loading from './components/Loading';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { AuthProvider } from './services/auth';
import FileUploadComponent from './components/FileUploadComponent'; 

const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilesPage = lazy(() => import('./pages/ProfilesPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CreateProfilePage = lazy(() => import('./pages/CreateProfilePage'));
const ProfileDetailPage = lazy(() => import('./pages/ProfileDetailPage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EmailVerificationPage = lazy(() => import('./pages/EmailVerificationPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const PreviewProfilePage = lazy(() => import('./pages/PreviewProfilePage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavigationBar />
          <main className="container">
            <Suspense fallback={<Loading />}>
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
                <Route path="/preview/:id" element={<PreviewProfilePage />} />
                <Route path="/upload" element={<FileUploadComponent />} /> {/* Add file upload route */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

