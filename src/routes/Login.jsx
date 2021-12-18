import React from 'react'
import Header from '../components/Header/Header'
import LoginBody from '../components/Login/LoginBody'

const Login = ({setAuthenticatedUser}) => {
    return (
        <div>
           <Header/> 
           <LoginBody setAuthenticatedUser={setAuthenticatedUser}/>
        </div>
    )
}

export default Login
