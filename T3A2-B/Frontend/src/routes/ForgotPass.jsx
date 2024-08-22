import React from 'react'
import ForgotPassword from '../components/ForgotPass/ForgotPass'
import ResetPassword from '../components/ForgotPass/ResetPass'

const ForgotPass = () => {
  return (
    <>
        <div className="contentFrame">
          <ForgotPassword />
          <ResetPassword />
          <ul>
            <li>Confirm code</li>
            <li>New password</li>
          </ul>
        </div>
    </>
  )
}

export default ForgotPass