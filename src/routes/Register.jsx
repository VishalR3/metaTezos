import React from 'react'
import Header from '../components/Header/Header'
import RegisterBody from '../components/Register/RegisterBody'

const Register = ({setAuthenticatedUser}) => {
    return (
        <div>
           <Header/> 
           <RegisterBody setAuthenticatedUser={setAuthenticatedUser}/>
        </div>
    )
}

export default Register
