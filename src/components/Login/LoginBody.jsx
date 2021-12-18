import React from 'react'
import LoginBox from "./LoginBox"
import "./Login.css"


const LoginBody = ({setAuthenticatedUser}) => {
    return (
        <div className="contain">
            
            <LoginBox setAuthenticatedUser={setAuthenticatedUser}/>
        </div>
    )
}

export default LoginBody
