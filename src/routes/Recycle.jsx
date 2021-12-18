import React from 'react';
import '../components/Recycle/Recycle.css'
import Header from '../components/Header/Header'
import {Form} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import FAQ from '../components/Recycle/FAQ'
import data from '../components/Recycle/data'


const Recycle = (props) => {

    const user=props.AuthenticatedUser
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
                        {/* <div>
                            <img style={{
                                width: '150px'
                            }}
                            src={logo} alt="loading..." />
                         </div> */}
                         <div style={{
                        paddingTop:'10px',
                        paddingLeft:'50px'}}>
                             <p style={{
                                 fontWeight:'400',
                                 opacity: '0.9'
                            }}>FAQ</p>
                        </div>
                            <p style={{fontSize: 12,
                            lineHeight: 1.5,
                            color: '#7e818c'}}>
                                <div>{
                                    data.FAQ.map((dataItem)=>{
                                        return(
                                            <FAQ dataItem={dataItem} />
                                        )
                                    })}
                                </div>
                            </p>
                    </div>
                    <div className="col-md-10">
                    <div className='coinBox' style={{borderColor:'black',
                        padding:20,
                        }}>
                        <div
                        style={{
                            fontSize: 15,
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            color: '#14cda8',
                            paddingBottom: '1%'
                        }}>What are we Recycling</div>
                        <div style={{
                            width: 500,
                            margin: '',
                            fontSize: 12,
                            lineHeight: 1.5,
                            color: '#7e818c',
                            paddingBottom: '3%'
                        }}>
                            Have piles of old or worn out goods which you do not use anymore?<br/>
                            Recycle your old goods and stand a chance to win Myntra coins!
                            You can use your Myntra Coins to win interesting games in the gamify section.
                            Invest 10 coins to play a game. If you win, we reward you with two options.<br/>
                            Either convert the coins you won to Ether (cryptocurrency)!
                            Or Win exciting coupons and use them when you shop with us next.
                        </div>
                            <Form>
                                <Form.Select aria-label="floatingSelect" label="What do you wanna recycle">
                                    <Form.Label>What do you wanna recycle</Form.Label>
                                    <option>Clothes</option>
                                    <option>Accessories</option>
                                    <option>Shoes</option>
                                    <option>Electronics</option>
                                </Form.Select>

                                <br />

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Number of Items</Form.Label>
                                    <Form.Control placeholder="Enter a number" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Pick up Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St" />
                                </Form.Group>
                                        
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Pick up Date</Form.Label>
                                    <Form.Control type="date" placeholder="Select Pick up Date" />
                                </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Pictures of item to be recycled</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recycle
