// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Home from './pages/Home'
import Login from './components/Login';

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <AppRoutes />
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
