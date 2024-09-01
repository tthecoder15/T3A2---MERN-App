import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './routes/Home'
import Team from './routes/Team'
import Contact from './routes/Contact'
import Login from './routes/Login'
import MyAcc from './routes/MyAcc'
import Booking from './routes/Booking'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourteam" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user">
          <Route path="login" element={<Login />} />
          <Route path="myaccount" element={<MyAcc />} />
        </Route>
        <Route path="/booking" element={<Booking />} />
        <Route path='*' element={<h3 className="contentFrame">404 - Page not found..</h3>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
