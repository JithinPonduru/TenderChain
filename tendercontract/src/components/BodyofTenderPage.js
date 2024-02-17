import React, { useState } from 'react';

function BodyofTenderPage({ contract }) {
    const [submitted, setSubmitted] = useState(false);
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    

    const deployContract = async (e) => {
        e.preventDefault();
        try {
            const tenderid = document.querySelector("#Tenderid").value;
            const status = document.querySelector("#Status").value;
            const title = document.querySelector("#Title").value;
            const details = document.querySelector("#Details").value;
            const deployedTime = dateTimeString;
            const startDate = document.querySelector("#StartDate").value;
            const lastDate = document.querySelector("#LastDate").value;
            const bidOpeningDate = document.querySelector("#BidOpeningDate").value;
            const organisationName = document.querySelector("#OrganisationName").value;
            const transaction = await contract.DeployContract(
                tenderid,
                title,
                status,
                details,
                deployedTime,
                startDate,
                lastDate,
                bidOpeningDate,
                organisationName
            );
            await transaction.wait();
            setSubmitted(true);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={deployContract} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <label style={{ margin: '10px' }}>Tender ID</label>
                <input type="number" id='Tenderid' required />
                <label style={{ margin: '10px' }}>Status</label>
                <input type="text" id='Status' required />
                <label style={{ margin: '10px' }}>Title</label>
                <input type="text" id='Title' required />
                <label style={{ margin: '10px' }}>Details</label>
                <input type="text" id='Details' required />
                <label style={{ margin: '10px' }}>Start Date</label>
                <input type="text" id='StartDate' required />
                <label style={{ margin: '10px' }}>Last Date</label>
                <input type="text" id='LastDate' required />
                <label style={{ margin: '10px' }}>Bid Opening Date</label>
                <input type="text" id='BidOpeningDate' required />
                <label style={{ margin: '10px' }}>Organisation Name</label>
                <input type="text" id='OrganisationName' required />
                <button type="submit" style={{ margin: '10px' }}>Deploy Contract</button>
            </form>


            {submitted && <h1>Success</h1>}
        </div>
    );

}

export default BodyofTenderPage;





