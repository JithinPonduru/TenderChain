import './App.css';
import abi from './contract/DeployerApplication.json';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TenderPage from './components/Tender_Page.js'
import HomePage from './components/Home_page.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // const contractAddress = "0x77d13EC1a730c2Dc2e282dc44d87Aba5cE8eb63f";
  const contractAddress = "0x6a831ce70f413B4c220d55fCeA1a6449F63687e6";
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
