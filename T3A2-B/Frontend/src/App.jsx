import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Team from './Team'
import Contact from './Contact'
import ForgotPass from './ForgotPass'
import Login from './Login'
import MyAcc from './MyAcc'
import Booking from './Booking'
import Admin from './Admin'

const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ourteam" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user">
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAcc />} />
      </Route>
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App