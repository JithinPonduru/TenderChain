import "./App.css";
import abi from "./contract/DeployerApplication.json";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TenderPage from "./components/Tender_Page.js";
import ListPage from "./components/ListPage.js";
import HomePage from "./components/Home_page.js";
import DetailPage from "./components/DetailPageUser.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const contractAddress = "0x94Ee09a2B5d12C73CF99834a59b16aDcDcD7B1E2";
  // const contractAddress = "0x6f82a17C16d3840232843cef19E0881bB48E7f93";
  // const contractAddress = "0x7e32fF4C48c2034CBa14fB2DE46b7fafD3cd9bdA";
  // const contractAddress = "0x3721b87961891CC5FAD3e050be21D676f41f87DF";
  const contractAddress = "0xCF0F3B28a3E25759bE739C14414B58611dB4eC72";
  const [walletState, setWalletState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error(
            "Please install MetaMask or another Ethereum-compatible browser extension."
          );
          return;
        }

        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
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
        <Route
          path="/"
          element={<HomePage contract={walletState.contract} />}
        />
        <Route path="/tenders" element={<ListPage state={walletState} />} />
        <Route
          path = '/deployer'
          element={
            <TenderPage
              state={walletState}
              contract={walletState.contract}
              email={email}
            />
          }
        />

          
        <Route
          path='/contract/:id'
          element={<DetailPage state={walletState} email={email} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
