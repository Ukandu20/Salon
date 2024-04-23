import React from 'react';
import Approutes from './AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
        <Navbar />
        <Approutes />
        <Footer />
    </>
  )
}
