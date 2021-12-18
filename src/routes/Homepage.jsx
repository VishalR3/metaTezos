import React, { Component } from "react";
import Header from "../components/Header/Header";
import CrouselView from "../components/Crousel/Crousel";
import BrandInFocusViewPort from "../components/BrandInFocusViewPort/BrandInFocusViewPort";
import DealCardViewPort from "../components/DealCardViewPort/DealCardViewPort";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const Homepage = ({ AuthenticatedUser, setAuthenticatedUser }) => {
  return (
    <div className="App container-fluid">
      <Header
        AuthenticatedUser={AuthenticatedUser}
        setAuthenticatedUser={setAuthenticatedUser}
      />

      <CrouselView />
      <DealCardViewPort />
      
      <h2>BRANDS IN FOCUS</h2>
      
      <p>Show some brand love</p>
      
      <BrandInFocusViewPort />
    </div>
  );
};

export default Homepage;
