import React from 'react'
import LoginField from '../components/Login/LoginField'
import RegisterDropDown from '../components/Login/RegisterDropDown'

const Login = () => {
  return (
        <div className="contentFrame">
          <div>
          <h1>Login or Register</h1>
          <p>Use the below tools to login to your account, or if you are new to Pawfect Care, use the register button to register your details with us.</p>
          <LoginField previousRoute={'user/login'}/>
          <h3>New User?</h3>
          <RegisterDropDown />
        </div>
        </div>
  );
};

export default Login;