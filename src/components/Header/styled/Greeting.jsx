import React from 'react'
import {Button, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom';


const Greeting = (props) => {

    if(props.AuthenticatedUser && props.AuthenticatedUser.hasOwnProperty('name')){
        return(
            <div>
                Hi {props.AuthenticatedUser.name}!
            </div>
        )
    }
    else{
       return(
           <>
           </>
       )
    }
}

export default Greeting