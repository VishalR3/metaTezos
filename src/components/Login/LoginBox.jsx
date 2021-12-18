import React, {useState} from 'react'
import './Login.css'
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const LoginBox = ({setAuthenticatedUser}) => {

    const history = useHistory();
    
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]:value
        });
    }

    axios.defaults.withCredentials=true;
    const headers = {
        "Content-Type": "application/json"
    }

    const Login = () => {
        const data=JSON.stringify(user)
        axios.post("http://localhost:3001/login", data, headers)
        .then((res, err) => {
            setAuthenticatedUser(res.data.user);
            console.log(res.data.user)
            history.push('/');
            //console.log(AuthenticatedUser);
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

    const redirectSignup = () => {
        history.push("/register")
    }

    return (
        <div className="box">
            
            <Form>
                <div className="welcome-header">
                    Login
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name="username" value={user.username} onChange={handleChange} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    
                </Form.Group>
                    <Form.Control type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter Password" />
                <Form.Group>

                </Form.Group>
                <br/>

                <div>
                    By continuing, I agree to the terms of use and Privacy Policy.
                </div>

                <br/>

                <Button variant="dark" onClick={Login}>
                    CONTINUE
                </Button>
            </Form>
            <br/><br/>
            <div className="welcome-header-small">
                    New User? 
                    <br/>
                    <Button variant="dark" onClick={redirectSignup}>
                        SIGNUP
                    </Button>
            </div>

        </div>
    )
}

export default LoginBox
