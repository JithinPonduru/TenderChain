import './App.css';
import abi from './contract/DeployerApplication.json';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Home_Footer.js';
import BodyofTenderPage from './components/BodyofTenderPage';
import Memos from './components/ContractList.js';

function App() {
  const contractAddress = "0x77d13EC1a730c2Dc2e282dc44d87Aba5cE8eb63f";
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

  console.log(walletState);

  return (
    <div className="App">
      <Navbar />
      <BodyofTenderPage contract={walletState.contract} />
      <Memos state={walletState} />
      <Footer />
    </div>
  );
}

export default App;
