import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Appointments from './pages/Appointments/Appointments';
import Gallery from './pages/Gallery/Gallery';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Signup from './pages/Login/SignUp';




export default function Approutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}
