import React from 'react';
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
