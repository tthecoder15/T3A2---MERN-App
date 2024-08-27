import React from 'react'
import Popup from 'reactjs-popup'
import LoginField from '../Login/LoginFunc'
import sessionState from '../../routes/store';
import 'reactjs-popup/dist/index.css';

const LoginPopup = ({}) => {
    const isAuthenticated = sessionState((state) => state.isAuthenticated)
    return (
        <Popup closeOnDocumentClick={false} className='popup' modal open={!isAuthenticated} position="right center">
            <LoginField/>
        </Popup>
    )
}

export default LoginPopup