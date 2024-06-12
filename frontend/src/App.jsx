import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export default function App() {
  const location = useLocation();

  // Determine if the current route is the admin route, login route, or sign-up route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAdminRoute && !isAuthRoute && <Navbar />}
      <AppRoutes />
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </>
  );
}
