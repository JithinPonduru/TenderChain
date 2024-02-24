import React from 'react';
import '/home/Jithin/Documents/3rd_Year/2nd_Sem/Software Engineering /tendercontract_backend/tendercontract/src';
import Body from './Home_Body.js';
import Footer from './Home_Footer.js';
import Header from './Home_Header.js';

function HomePage({contract}) {
  return (
      <div>
        <Header />
        <Body contract={contract}/>
        <Footer />
      </div>
  );
}

export default HomePage;
