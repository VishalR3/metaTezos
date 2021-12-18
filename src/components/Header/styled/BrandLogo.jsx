import React, { Component } from "react";
import styled from "styled-components";

const BrandLogoComponent = ({ className, children }) => (
  <header className={className}>{children}</header>
);
const BrandLogo = styled(BrandLogoComponent)`
  background: url("./myntraSprite.png") -290px -61px;
  width: 51px;
  height: 36px;
`;

export default BrandLogo;
