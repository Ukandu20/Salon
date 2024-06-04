import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin';



export default function Adminroutes() {
  return (
    <Routes>
        <Route path='/admin' element={<Admin/>} />
    </Routes>
  )
}
