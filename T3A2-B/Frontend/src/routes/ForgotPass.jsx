import React from 'react'
import ForgotPassword from '../components/ForgotPass/Forgotpass'
import ResetPassword from '../components/ForgotPass/Resetpass'

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