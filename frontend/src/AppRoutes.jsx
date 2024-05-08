import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Appointments from './pages/Appointments/Appointments';



export default function Approutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/appointments' element={<Appointments />} />
    </Routes>
  )
}
