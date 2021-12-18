import React from 'react'
import {useState, useRef} from 'react'
import {Button, Overlay} from 'react-bootstrap';
import {BsInfoCircle} from 'react-icons/bs'
import axios from 'axios';
import './myCoins.css'
import Transaction from './Transaction';
import WalletCardEthers from '../WalletCardEthers/WalletCardEthers'

const CoinData = (props) => {

    const [show, setShow]=useState(false);
    const [logs, setLogs]=useState([])
    const target=useRef(null)
    const user={
        username: props.user.username
    }

    axios.defaults.withCredentials=true;
    const headers = {
        "Content-Type": "application/json"
    }

    const getLogs = () => {
        const data=JSON.stringify(user)
        console.log(data)
        axios.post('http://localhost:3001/transactions', data, headers)
        .then((res, err) => {
            setLogs(res.data.doc);
        })
        .catch(function (error) {
            if (error.response) {
              alert(error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    return (
        <div style={{
            padding:20
        }}>
            <div className='coinBox' style={{borderColor:'black',
                padding:20,
                textAlign:'center'
                }}>
                <WalletCardEthers user={props.user} setUser={props.setUser}/>
                <div className='points-label'
                style={{
                    fontSize: 15,
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    color: '#14cda8'
                }}>TOTAL AVAILABLE MYNTRA COINS</div>
                <div style={{
                    margin: '8px 0px',
                    fontSize: 36,
                    fontWeight: 800,
                    color: '#3E4152'
                }}>{props.user.coins}</div>
                <div style={{fontSize:13}}>
                    Your total Myntra Coins is worth a lot! 
                </div>
                <div style={{
                    width: 275,
                    margin: '10px auto 0px auto',
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: '#7e818c'
                }}>
                    You can use your Myntra Coins to win interesting games in the gamify section.
                    Invest 10 coins to play a game. If you win we reward you with two options.
                    Either convert the coins you won to Ether (cryptocurrency)!
                    Or Win exciting coupons and use them when you shop with us next.
                </div>
            </div>
            <div style={{
                borderBottom: '1px solid #EAEAEC',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '15px',
                color: '#282C3F',
                cursor: 'pointer'
            }} onClick={getLogs}>
                Transaction Logs
            </div>
            <div style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderBottom: '1px solid #EAEAEC'
            }}>
                <div style={{
                    display: 'inline-block',
                    width: '15%',
                    textTransform: 'capitalize',
                    wordWrap: 'break-word',
                    padding: '10px 0px 10px 15px'
                }}>
                    Date
                </div>
                <div style={{display: 'inline-block',
                    width: '40%',
                    textTransform: 'capitalize',
                    wordWrap: 'break-word',
                    padding: '10px 0px 10px 15px'}}>
                    Description
                </div>
                <div style={{display: 'inline-block',
                    width: '15%',
                    textTransform: 'capitalize',
                    wordWrap: 'break-word',
                    padding: '10px 0px 10px 15px'}}>
                    Credit
                </div>
                <div style={{
                    display: 'inline-block',
                    width: '15%',
                    textTransform: 'capitalize',
                    wordWrap: 'break-word',
                    padding: '10px 0px 10px 15px'
                }}>
                    Debit
                </div>
                <div style={{
                    display: 'inline-block',
                    width: '15%',
                    textTransform: 'capitalize',
                    wordWrap: 'break-word',
                    padding: '10px 0px 10px 15px'
                }}>
                    Balance
                </div>
            </div>
            <div>
                {logs.map((log) => {
                    return(
                        <Transaction date={log.date} description={log.description}
                        credit={log.credit} debit={log.debit} balance={log.balance}/>
                    )
                })}
            </div>
        </div>
    )
}

export default CoinData
