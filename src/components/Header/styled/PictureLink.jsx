import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const pictureLinkComp = function (props) {
  
  var flag=false;
  if(props.AuthenticatedUser && props.AuthenticatedUser.hasOwnProperty('name')){
    flag=true;
  }
  console.log(props.AuthenticatedUser)
    return (
    
    <div>
       { console.log(arguments)}
    <div className={props.className}>
    <FontAwesomeIcon  icon={props.icon}/>
    </div>
  
    <a  href={ (flag) ? props.link : '/login' } className={props.className}>
    {props.name}
    </a>
  
    </div>
  );
} 
const PictureLink = styled(pictureLinkComp)`
text-decoration:none;
display:block;
color:#000;
text-align:center;
padding: 0 10px;

`

export default PictureLink