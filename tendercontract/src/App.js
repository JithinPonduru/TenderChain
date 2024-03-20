import "./App.css";
import abi from "./contract/DeployerApplication.json";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TenderPage from "./components/Tender_Page.js";
import ListPage from "./components/ListPage.js";
import HomePage from "./components/Home_page.js";
import DetailPage from "./components/DetailPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const contractAddress = "0x77d13EC1a730c2Dc2e282dc44d87Aba5cE8eb63f";
  // const contractAddress = "0x6a831ce70f413B4c220d55fCeA1a6449F63687e6";
  // const contractAddress = "0xF1A866A2CDF4Cae0B29693dbbC759b79eb502217";
  // const contractAddress = " 0xE7d004d421D9F9B496B9C0B38856d659E8004407";
  // const contractAddress = "0x3AC289c0fceB8b9664f7195DA4092Cb693c0f63a";
  // const contractAddress = "0x507F725F8e1d224157c91499492efB3F7C73274b";
  // const contractAddress = "0xf91ED42f31f10Fcf0E704D77611d690Ae35CDe92";
  // const contractAddress = "0xa06e58ed4ca7f532372e2cBd5c5DB3dd160da486";
  // const contractAddress = "0x306f9A3948C2B67B1e5B25e652676792E3dDbF41";
  // const contractAddress = "0x245d3Bd51c63d38D8f73FdFcd687B676C40eF589";
  // const contractAddress = "0x8214f754EdbD3265B86c8a93cDE7676460e44636";
//   const contractAddress = "0x1e0d0EAD03E546ade6648F634a9ecF740CB6d7Ba";
  const contractAddress = "0x94Ee09a2B5d12C73CF99834a59b16aDcDcD7B1E2";
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
        <Route
          path="/"
          element={<HomePage contract={walletState.contract} />}
        />
        <Route path="/tenders" element={<ListPage state={walletState} />} />
        <Route
          path="/deployer"
          element={
            <TenderPage
              state={walletState}
              contract={walletState.contract}
              email={email}
            />
          }
        />

        <Route
          path="/contract/:id"
          element={<DetailPage state={walletState} contract = {walletState.contract} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
