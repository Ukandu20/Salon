import React from 'react';
import { useLocation } from 'react-router-dom';
import Approutes from './AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export default function App() {
  const location = useLocation();

  // Determine if the current route is the admin route
  const isAdminRoute = location.pathname === '/admin';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Approutes />
      {!isAdminRoute && <Footer />}
    </>
  );
}
