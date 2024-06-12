import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  const user = jwtDecode(token);
  return user && user.isAdmin ? children : <Navigate to="/login" />;
};

export default function Adminroutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Admin /></PrivateRoute>} />
    </Routes>
  );
}
