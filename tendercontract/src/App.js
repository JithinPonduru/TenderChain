import './App.css';
import abi from './contract/DeployerApplication.json';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TenderPage from './components/Tender_Page.js'
import HomePage from './components/Home_page.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // const contractAddress = "0x77d13EC1a730c2Dc2e282dc44d87Aba5cE8eb63f";
  // const contractAddress = "0x6a831ce70f413B4c220d55fCeA1a6449F63687e6";
  // const contractAddress = "0xF1A866A2CDF4Cae0B29693dbbC759b79eb502217";
  // const contractAddress = " 0xE7d004d421D9F9B496B9C0B38856d659E8004407";
  // const contractAddress = "0x3AC289c0fceB8b9664f7195DA4092Cb693c0f63a";
  const contractAddress = "0x507F725F8e1d224157c91499492efB3F7C73274b";
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

        await ethereum.request({ method: 'eth_requestAccounts' });
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

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage contract = {walletState.contract} />} />
        <Route path="/deployer" element={<TenderPage state={walletState} contract={walletState.contract} />} />
      </Routes>
    </Router>
  );
}

export default App;
