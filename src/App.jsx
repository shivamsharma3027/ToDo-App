import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Use isLoggedIn state

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
