import { useEffect, useState } from "react";
import React from 'react';

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const fetchMemos = async () => {
            if (contract) {
                const memos = await contract.listOfContracts();
                // Convert BigNumber values to strings
                const formattedMemos = memos.map(memo => ({
                    tenderid: memo.tenderid.toString(),
                    status: memo.status.toString(),
                    title: memo.title.toString(),
                    details: memo.details.toString(),
                    DeployedTime: memo.DeployedTime.toString(),
                    Startdate: memo.Startdate.toString(),
                    Lastdate: memo.Lastdate.toString(),
                    BidopeningDate: memo.BidopeningDate.toString(),
                    OrganizationName: memo.OrganizationName.toString()
                }));
                setMemos(formattedMemos);
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
                                    <td style={{ padding: '8px' }}>{memo.tenderid}</td>
                                    <td style={{ padding: '8px' }}>{memo.status}</td>
                                    <td style={{ padding: '8px' }}>{memo.title}</td>
                                    <td style={{ padding: '8px' }}>{memo.details}</td>
                                    <td style={{ padding: '8px' }}>{memo.DeployedTime}</td>
                                    <td style={{ padding: '8px' }}>{memo.Startdate}</td>
                                    <td style={{ padding: '8px' }}>{memo.Lastdate}</td>
                                    <td style={{ padding: '8px' }}>{memo.BidopeningDate}</td>
                                    <td style={{ padding: '8px' }}>{memo.OrganizationName}</td>
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
