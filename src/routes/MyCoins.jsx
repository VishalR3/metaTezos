import React from 'react'
import Header from '../components/Header/Header'
import Menu from '../components/myCoins/Menu'
import CoinData from '../components/myCoins/CoinData'

const MyCoins = (props) => {
    const user=props.AuthenticatedUser;
    const setUser=props.setAuthenticatedUser
    return (
        <div>
            <Header AuthenticatedUser={user}
            setAuthenticatedUser={setUser}/>
            <hr/>
            <div style={{
            paddingTop:20,
            paddingLeft:'10%',
            paddingRight:'10%',
            paddingBottom:'10%'
            }}>
                <div style={{
                    width:1000
                }}>
                    <div style={{
                        padding:5,
                        alignContent:'center'
                    }}>
                        <h3 style={{fontWeight:600}}>Account</h3>
                        <h5>{user.name}</h5>
                    </div>
                    <hr />
                    <div className="col-md-2" style={{
                        borderRight: '1px solid #d4d5d9'
                    }}>
                        <Menu />
                    </div>
                    <div className="col-md-10">
                        <CoinData user={user} setUser={setUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCoins
