import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Chat from './pages/Chat';
import CodeGenerator from './pages/CodeGenerator';
import WebsiteTranslator from './pages/WebsiteTranslator';
import DocumentGenerator from './pages/DocumentGenerator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MediaGenerator from './pages/MediaGenerator';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second load time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/code" 
                element={
                  <ProtectedRoute>
                    <CodeGenerator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/translate" 
                element={
                  <ProtectedRoute>
                    <WebsiteTranslator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/document" 
                element={
                  <ProtectedRoute>
                    <DocumentGenerator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/media" 
                element={
                  <ProtectedRoute>
                    <MediaGenerator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
