import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/Signup'
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
    <BrowserRouter>
    <Toaster position='top-center' reverseOrder={false}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
