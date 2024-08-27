import React from 'react'
import LoginField from '../components/Login/LoginField'
import RegisterUser from '../components/Login/Register'

const Login = () => {
  return (
    <>
        <div className="contentFrame">
          <h2>Login</h2>
          <h3>New User? Register Now</h3>
          <LoginField previousRoute={'user/login'}/>
          <RegisterUser />
          <ul>
            <li>Email/Password field</li>
            <li>Reroute user based on admin or no_admin auth</li>
            <li>Account registration dropdown input menu</li>
          </ul>
        </div>
    </>
  );
};

export default Login;
