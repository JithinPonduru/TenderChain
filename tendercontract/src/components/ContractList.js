import { useEffect, useState } from "react";
import React from 'react';


// The way i implemented this in such a way that the memos that are only related to the current user will be displayed like current metamask id is 0x6a831ce70f413B4c220d55fCeA1a6449F63687e6


const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const fetchMemos = async () => {
            if (contract) {
                // Get the current MetaMask account ID
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const currentAccount = accounts[0]; 
                
                // Use the current account ID in the contract call
                const memos = await contract.getMemo(currentAccount);
                setMemos([memos]); // Assuming getMemo returns a single memo
            }
        };
        fetchMemos();
    }, [contract]);

    return (
        <div style={{ borderRadius: '15px', margin: '15px 35px', overflowX: 'auto', backgroundColor: '#e5e5e5' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>Tender ID</th>
                        <th style={{ padding: '8px' }}>Status</th>
                        <th style={{ padding: '8px' }}>Title</th>
                        <th style={{ padding: '8px' }}>Details</th>
                        <th style={{ padding: '8px' }}>Deployed Time</th>
                        <th style={{ padding: '8px' }}>Start Date</th>
                        <th style={{ padding: '8px' }}>Last Date</th>
                        <th style={{ padding: '8px' }}>Bid Opening Date</th>
                        <th style={{ padding: '8px' }}>Organisation Name</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        memos.map((memo, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td style={{ padding: '8px' }}>{memo[0].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[1].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[2].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[3].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[4].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[5].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[6].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[7].toString()}</td>
                                    <td style={{ padding: '8px' }}>{memo[8].toString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="9" style={{ borderBottom: '2px solid #000' }}></td>
                                </tr>
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Memos;
