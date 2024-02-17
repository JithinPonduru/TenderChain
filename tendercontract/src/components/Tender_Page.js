import React from 'react';
import '/home/Jithin/Documents/3rd_Year/2nd_Sem/Software Engineering /tendercontract_backend/tendercontract/src';
import Footer from './Home_Footer.js';
import Navbar from './Navbar.js';
import BodyofTenderPage from './BodyofTenderPage.js';

function TenderPage() {
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <BodyofTenderPage />
            </div>

            <div>
                <Footer />
            </div>
            
        </div>
    );
}

export default TenderPage;
