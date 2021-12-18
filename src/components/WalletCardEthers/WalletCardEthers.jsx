import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './WalletCardEthers.css'
import axios from 'axios';

const WalletCardEthers = (props) => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

useEffect(() => {
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
	.then(updateWallet())
	};
}, [defaultAccount]);

	axios.defaults.withCredentials=true;
	const headers = {
		"Content-Type": "application/json"
	}

	const updateWallet = () => {
		var data={
			username: props.user.username,
			address: defaultAccount
		}
		data=JSON.stringify(data);
		axios.post('http://localhost:3001/updateWallet', data, headers)
        .then((res, err) => {
            setUser(res.data.user);
        })
        .catch(function (error) {
            if (error.response) {
              alert(error.response.data.message);
			}
          });
	}
	
	return (
		<div className='walletCard'>
		<h4 style={{
			fontSize: 15,
			textTransform: 'uppercase',
			fontWeight: 800,
			color: 'black',
			opacity: 0.7
		}}> Connection to MetaMask</h4>
			<button onClick={connectWalletHandler}
			style={{
					fontSize: 30,
                    textTransform: 'uppercase',
                    fontWeight: 1500,
                    color: 'white'
			}}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
			<div>You may use this link to download MetaMask extension <a href='https://metamask.io/download.html'>Link</a></div>
		</div>
	);
}

export default WalletCardEthers;
