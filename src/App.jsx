import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Surveys from './pages/Surveys';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import DomoAIDashboard from './pages/DomoAIDashboard';
import Survey from './pages/Survey';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import CookieConsent from './components/CookieConsent';
import './styles/modern-design.css';
import './styles/accessibility.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/category/:category" element={<Category />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/domo-ai" element={<DomoAIDashboard />} />
                    <Route path="/survey/:id" element={<Survey />} />
              </Routes>
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
