import { useEffect, useState } from "react";
import React from 'react';


// The way i implemented this in such a way that the memos that are only related to the current user will be displayed like current metamask id is 0x6a831ce70f413B4c220d55fCeA1a6449F63687e6
const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const fetchMemos = async () => {
            if (contract) {
                const memos = await contract.getMemo('jithin_ponduru@srmap.edu.in');
                setMemos(memos); // Set memos state directly
                console.log(memos[0].OrganizationName);
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
                                    <td style={{ padding: '8px' }}>{memo.tenderid.toString()}</td>
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
