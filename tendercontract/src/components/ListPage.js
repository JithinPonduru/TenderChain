import React from 'react';
import Navbar from './Navbar';
import Memos from './ListOfTenders';
import Footer from './Home_Footer';

function ListPage({ state}) {

  return (
    <>
      <Navbar islogin={true} />
      <Memos state={state} />
      <Footer />
    </>
  );
}

export default ListPage;
