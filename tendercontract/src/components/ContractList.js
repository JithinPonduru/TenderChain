import { useEffect, useState } from "react";
import React from 'react';

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const fetchMemos = async () => {
            if (contract) {
                const memos = await contract.getMemo("0xc6eE3A2b3Db0f58B91B16DA71105d51628b8d294");
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
