import './App.css';
import abi from './contract/DeployerApplication.json';
import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Home_Footer.js';
import BodyofTenderPage from './components/BodyofTenderPage';
function App(){
    const contractAddress = ' 0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const [walletState, setWalletState] = useState({
        provider: null,
        signer: null,
        contract: null
      });
    
      useEffect(() => {
        const connectWallet = async () => {
          try {
            const { ethereum } = window;
            if (!ethereum) {
              console.error("Please install MetaMask or another Ethereum-compatible browser extension.");
              return;
            }
    
            // const [account] = await ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    
            setWalletState({ provider, signer, contract });
          } catch (error) {
            console.error("Error connecting to wallet:", error);
          }
        };
    
        connectWallet();
      }, []);
    
      console.log(walletState);
    
      return (
        <div className="App">
          <Navbar state={walletState}  />
          <BodyofTenderPage contract={walletState} />
          <Footer />
        </div>
      );

}

export default App;
