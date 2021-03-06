import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Auth />} path='/auth' />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
