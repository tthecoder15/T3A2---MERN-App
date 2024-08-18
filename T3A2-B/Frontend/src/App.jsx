import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './routes/Home'
import Team from './routes/Team'
import Contact from './routes/Contact'
import ForgotPass from './routes/ForgotPass'
import Login from './routes/Login'
import MyAcc from './routes/MyAcc'
import Booking from './routes/Booking'
import Admin from './routes/Admin'
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
          <Route path="forgotpassword" element={<ForgotPass />} />
          <Route path="login" element={<Login />} />
          <Route path="myaccount" element={<MyAcc />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/booking" element={<Booking />} />
        <Route path='*' element={<h3 className="contentFrame">Page not found..</h3>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
