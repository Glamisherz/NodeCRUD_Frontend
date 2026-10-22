import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import StudentManagemnet from './StudentManagemnet'
import Signup from './Signup'
import Login from './Login'

function App() {



  return (
    <>
      <Routes>
        <Route path='/' element={<StudentManagemnet />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
