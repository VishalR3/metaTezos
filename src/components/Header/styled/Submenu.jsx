import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Header.css";
import { useHistory } from "react-router-dom";

const Submenu = (props) => {
  const isHovering = props.isHovering;
  const history = useHistory();

  const handleLogout = () => {
    props.setAuthenticatedUser({});
    history.push("/");
  };

  const redirectLogin = () => {
    history.push("/login");
  };

  const redirectCoinsData = () => {
    history.push("/myCoins");
  };

  if (isHovering) {
    if (
      props.AuthenticatedUser &&
      props.AuthenticatedUser.hasOwnProperty("name")
    ) {
      return (
        <div className="dropdown-content">
          <div>
            <h4>
              <b>Hello {props.AuthenticatedUser.name}</b>
            </h4>
            <h5 style={{ opacity: 0.9 }}>
              {" "}
              {props.AuthenticatedUser.username}{" "}
            </h5>
            {/* <h5>To access account and manage orders</h5> */}
            <hr />
            <h5 style={{ opacity: 0.8 }}>Orders</h5>
            <h5 style={{ opacity: 0.8 }}>Wishlist</h5>
            <h5 style={{ opacity: 0.8 }}>Gift Cards</h5>
            <h5 style={{ opacity: 0.8 }}>Contact Us</h5>
            <hr />
            <h5 style={{ opacity: 0.8 }}>Myntra Credits</h5>
            <h5 style={{ opacity: 0.8 }}>Coupons</h5>
            <h5
              style={{ opacity: 0.8, cursor: "pointer" }}
              onClick={redirectCoinsData}
            >
              Coins
            </h5>
            <hr />
            <h5 style={{ opacity: 0.8 }}>Edit Profile</h5>
          </div>

          <div className="buttonDiv">
            <Button
              className="LoginBtn"
              variant="outline-light"
              onClick={handleLogout}
            >
              logout
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dropdown-content">
          <div>
            <h4>
              <b>Welcome</b>
            </h4>
            <h5>To access account and manage orders</h5>
          </div>
          <div className="buttonDiv">
            <Button
              className="LoginBtn"
              variant="outline-light"
              onClick={redirectLogin}
            >
              login/signup
            </Button>
          </div>
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default Submenu;
