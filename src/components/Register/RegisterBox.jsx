import React, {useState} from 'react'
import './Register.css'
import {Form, Button, FormGroup} from 'react-bootstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const RegisterBox = ({setAuthenticatedUser}) => {
    
    const [user, setUser] = useState({
        username: "",
        name: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
        console.log(user);
    }

    axios.defaults.withCredentials=true;
    const headers={
        'Content-Type':'application/json'
    }
    const history=useHistory();

    const register = () => {
        if(user.name && user.username && user.password){
            const data=JSON.stringify(user)
            console.log(data)
            axios.post("http://localhost:3001/signup", data, headers)
            .then((res) => {
                setAuthenticatedUser(res.data.user)
                history.push('/')
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  alert(error.response.data.message);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
        }
        else{
            if(!user.name){
                alert("Enter your Name!");
            }
            else if(!user.username){
                alert("Enter your Email!");
            }
            else{
                alert("Enter a Password!");
            }
        }
    }

    return (
        <div className="box">
            <Form>
                <div className="welcome-header">
                    Signup
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name="username" value={user.username} onChange={handleChange} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="name" value={user.name} onChange={handleChange} placeholder="Your Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" name="password" value={user.password} onChange={handleChange} placeholder="Set Password" />
                </Form.Group>
                <br/>

                <div>
                    By continuing, I agree to the terms of use and Privacy Policy.
                </div>

                <br/>

                <Button variant="dark" onClick={register}>
                    CONTINUE
                </Button>
            </Form>
        </div>
    )
}

export default RegisterBox
