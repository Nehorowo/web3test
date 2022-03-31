import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const web3 = new Web3(Web3.givenProvider);
  web3.eth.defaultChain = 'rinkeby';

  const { ethereum } = window;
  const [currectAccount, setCurrentAccount] = useState(null);
  const [isAuthorized, setAuthorized] = useState(false);

  const checkWalletIsConnected = () => {
    if (!ethereum) {
      console.log('Check if your Metamask is installed');
      return;
    } else {
      console.log('Metamask is installed. We are ready to connect!');
    }
  };

  const connectWalletHandler = async () => {
    if (!ethereum) {
      alert('Please install Metamask wallet extension!');
    }
    try {
      const accounts = await web3.eth.requestAccounts();
      console.log('Found an account! Your address is: ', accounts[0]);
      setCurrentAccount(accounts[0]);
      setAuthorized(true);
    } catch (error) {
      console.log(`Something went wrong: ${error.message}`);
    }
  };

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className="cta-button connect-wallet-button">
        Get public key
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div>{!isAuthorized && <h2>MetaMask is locked - please login</h2>}</div>
      <div>{connectWalletButton()}</div>
      <div>{isAuthorized && <p>Your public address: {currectAccount}</p>}</div>
    </div>
  );
}

export default App;
