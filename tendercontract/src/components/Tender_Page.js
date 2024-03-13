import React, { useState } from 'react';
import Navbar from './Navbar';
import BodyofTenderPage from './BodyofTenderPage';
import Memos from './ContractList';
import Footer from './Home_Footer';

function TenderPage({ state, contract, email }) {
  const [showMemos, setShowMemos] = useState(false);
  console.log(email)  
  const toggleMemos = () => {
    setShowMemos(!showMemos);
  };

  return (
    <>
      <Navbar />
      <BodyofTenderPage contract={contract} />
      <button style={{marginLeft : '25%' , marginBottom : '2%' , width : '35%' }} onClick={toggleMemos} className="btn btn-warning">
        {showMemos ? 'Hide Deployed Contracts' : 'Show Deployed Contracts'}
      </button>
      {showMemos && <Memos state={state} userEmail={email} />}
      <Footer />
    </>
  );
}

export default TenderPage;
