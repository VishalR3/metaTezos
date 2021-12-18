import React, { Component } from 'react'
import data from "../../assets/data.jsx";
import "./BrandInFocusViewPort.css";
import BrandFocusCardStyled from '../BrandFocusCard/BrandFocusCard';

class BrandInFocusViewPort extends Component {
  render() {
    return (
      <div className="bif_card_viewport">
              {
        data["brands-focus-images"].map(element=>{
        return <BrandFocusCardStyled image={element.image} brandName={element["brand-name"]} message={element.message}/>
        })
      }
        
      </div>
    )
  }
}

export default BrandInFocusViewPort;