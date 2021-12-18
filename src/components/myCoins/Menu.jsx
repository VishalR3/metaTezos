import React from 'react'

const Menu = () => {
    return (
        <div style={{fontSize:15, opacity:0.9}}>
           <div style={{opacity:0.9, padding:5, textAlign:'left'}}>
               Overview
            </div>
            <hr />
            <div style={{opacity:0.9,
            padding:'20px 0px', textAlign:'left'}}>
                <div style={{padding:5}}>
                    <div style={{opacity:0.8}}>ORDERS</div>
                </div>
                <div style={{paddingLeft:5}}>
                    Orders & Returns<br/>
                    Wishlist<br/>
                    Gift Cards<br/>
                    Contact Us
                </div>
            </div> 
            <hr />
            <div style={{opacity:0.9, textAlign:'left'}}>
                <div style={{padding:5}}>
                    <div style={{opacity:0.8}}>CREDITS</div>
                </div>
                <div style={{paddingLeft:5}}>
                    Myntra Credits<br/>
                    Coupons<br/>
                    <span style={{color:'#43D7D6', fontWeight:1000}}>Coins</span> 
                </div>
            </div>
            <hr />
            <div style={{opacity:0.9, textAlign:'left'}}>
                <div style={{padding:5}}>
                    <div style={{opacity:0.8}}>ACCOUNT</div>
                </div>
                <div style={{paddingLeft:5}}>
                    Profile<br/>
                    Addresses<br/>
                    Saved Cards 
                </div>
            </div>
            <hr />
            <div style={{opacity:0.9, textAlign:'left'}}>
                <div style={{padding:5}}>
                    <div style={{opacity:0.8}}>LEGAL</div>
                </div>
                <div style={{paddingLeft:5}}>
                    Terms of Use<br/>
                    Privacy Policy 
                </div>
            </div>
        </div>
    )
}

export default Menu
