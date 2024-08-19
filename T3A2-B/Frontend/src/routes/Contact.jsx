import React from 'react'
import ContactForm from '../components/Contact/ContactForm'

const Contact = () => {
  return (
    <>
        <div className="contentFrame">
          <h2>Contact Us</h2>
          <ul>
            <li>How to visit</li>
            <li>How to call</li>
          </ul>
          <ContactForm />
        </div>
    </>
  )
}

export default Contact