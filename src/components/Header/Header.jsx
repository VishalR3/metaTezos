import HeaderStyled from "./styled/HeaderStyle";
import NavLink from "./styled/NavLink";
import BrandLogo from "./styled/BrandLogo";
import SearchBar from "./styled/SearchBar";
import PictureLink from "./styled/PictureLink";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalHover } from 'react-modal-hover'
import React, {useState} from "react";
import {Modal} from 'react-bootstrap';
import Submenu from './styled/Submenu'
import Greeting from './styled/Greeting'
import {Link} from 'react-router-dom';

function Header({AuthenticatedUser, setAuthenticatedUser}) {

  const [profileHover, setprofileHover] = useState(false);

  const handleHover=()=>{
    setprofileHover(true);
  }

  const handleLeave=()=>{
    setprofileHover(false);
  }


  return (
    <div className="header_wraper">
      <HeaderStyled>
        <div className="left-items">
          <FontAwesomeIcon className="bar_icon" icon="bars" />
          <BrandLogo className="brand_logo" />

          <NavLink className="nav_link">MEN</NavLink>
          <NavLink className="nav_link">WOMEN</NavLink>
          <NavLink className="nav_link">KIDS</NavLink>
          <NavLink className="nav_link">LIFESTYLE</NavLink>
          <NavLink className="nav_link">DISCOVER</NavLink>
        </div>
        <div className="right-items">
          <SearchBar className="search-bar" />
          {/* <Greeting AuthenticatedUser={AuthenticatedUser}/> */}
          <div className="profile-links">
            <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className='dropdown'>
              <PictureLink icon="user" link="Profile" name="Profile" AuthenticatedUser={AuthenticatedUser}/>
              <Submenu isHovering={profileHover} AuthenticatedUser={AuthenticatedUser} setAuthenticatedUser={setAuthenticatedUser}/>
            </div>
            <PictureLink icon="gamepad" link="/gamify" AuthenticatedUser={AuthenticatedUser} name="Gamify" />
            <PictureLink icon="bookmark" link="/" AuthenticatedUser={AuthenticatedUser} name="Wishlist" />
            <PictureLink icon="shopping-bag" link="/" AuthenticatedUser={AuthenticatedUser} name="Bag" />

          </div>
        </div>
      </HeaderStyled>
    </div>
  );
}

export default Header;
