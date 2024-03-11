import React from 'react';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
function Navbar({ islogin }) {

  return (
    <div style={{ marginBottom: '75px' }}>
      <header id="header" className="header d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

          <a href="index.html" className="logo d-flex align-items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, textShadow: '0 0 20px rgba(0, 191, 255, 0.8)' }}
              transition={{ duration: 1 }}
              style={{ fontSize: '2rem', color: '#FFF', fontFamily: 'Arial', textAlign: 'center' }}
              data-aos="fade-right"
              data-aos-once='true'
            >
              TenderChain<span>.</span>
            </motion.h1>
          </a>

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/tenders">Tenders/Contracts</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li className="dropdown"><a href="google.com"><span>Select Contract Type</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="google.com">Intellectual Property Contracts</a></li>
                  <li className="dropdown"><a href="google.com"><span>With in India</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                    <ul>
                      <li><a href="google.com">Online Bidder Enrollment</a></li>
                      <li><a href="google.com">Real Estate Contracts</a></li>
                      <li><a href="google.com">Labyour Contracts</a></li>
                      <li><a href="google.com">Agricultural Contracts</a></li>
                      <li><a href="google.com">Sales Contracts</a></li>
                    </ul>
                  </li>
                  <li><a href="google.com">Tenders by Location</a></li>
                  <li><a href="google.com">Tenders by Organisation</a></li>
                  {islogin ? (
                        <li><a href="/deployer">Contract Posting</a></li>
                      ) : <li><a href="#logindiv" >Contract Posting</a></li>
                  }

                </ul>
              </li>
            </ul>
          </nav>

        </div>
      </header>
    </div>
  );
}

export default Navbar;
