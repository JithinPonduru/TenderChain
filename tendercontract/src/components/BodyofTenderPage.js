import React, { useState } from 'react';

function BodyofTenderPage({ contract }) {
    const [tenderid, setTenderid] = useState('');
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [deployedTime, setDeployedTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [bidOpeningDate, setBidOpeningDate] = useState('');
    const [organisationName, setOrganisationName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            console.error("Error deploying contract:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ margin: '10px' }}>Tender ID</label>
                <input type="number" value={tenderid} onChange={(e) => setTenderid(e.target.value)} required />
                <label style={{ margin: '10px' }}>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
                <label style={{ margin: '10px' }}>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label style={{ margin: '10px' }}>Details</label>
                <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <label style={{ margin: '10px' }}>Deployed Time</label>
                <input type="text" value={deployedTime} onChange={(e) => setDeployedTime(e.target.value)} required />
                <label style={{ margin: '10px' }}>Start Date</label>
                <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <label style={{ margin: '10px' }}>Last Date</label>
                <input type="text" value={lastDate} onChange={(e) => setLastDate(e.target.value)} required />
                <label style={{ margin: '10px' }}>Bid Opening Date</label>
                <input type="text" value={bidOpeningDate} onChange={(e) => setBidOpeningDate(e.target.value)} required />
                <label style={{ margin: '10px' }}>Organisation Name</label>
                <input type="text" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} required />
                <button type="submit" style={{ margin: '10px' }}>Deploy Contract</button>
            </form>
            {submitted && <h1>Success</h1>}
        </div>
    );
}

export default BodyofTenderPage;



    // const deployContract = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await contract.DeployContract(
    //             tenderid,
    //             title,
    //             status,
    //             details,
    //             deployedTime,
    //             startDate,
    //             lastDate,
    //             bidOpeningDate,
    //             organisationName
    //         );
    //         return(
    //             <h1>Scusses</h1>
    //         );
    //     } catch (error) {
    //         return(
    //             <h1>Error</h1>
    //         );
    //     }
    // };


