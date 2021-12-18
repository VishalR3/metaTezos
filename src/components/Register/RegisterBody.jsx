import React from 'react'
import RegisterBox from "./RegisterBox"
import "./Register.css"

const RegisterBody = ({setAuthenticatedUser}) => {
    return (
        <div className="contain">
            <RegisterBox setAuthenticatedUser={setAuthenticatedUser}/>
        </div>
    )
}

export default RegisterBody
