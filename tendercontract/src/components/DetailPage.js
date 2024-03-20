import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = ({ state }) => {
  const { id } = useParams(); // Get the ID from the URL
  const [applicants, setApplicants] = useState([]);
  const [memo, setMemo] = useState(null);
  const { contract } = state;

  function showapplicants() {
    var x = document.getElementById("applicantsTable");
    if (x.style.display === "none") {
      x.style.display = "table";
    } else {
      x.style.display = "none";
    }
  }

  useEffect(() => {
    const fetchMemoAndApplicants = async () => {
      if (contract && id) {
        try {
          const memo = await contract.getMemoByID(parseInt(id));
          setMemo(memo);
          console.log(memo);

          const applicants = await contract.getApplicants(parseInt(id));
          setApplicants(applicants);
          console.log(applicants);
        } catch (error) {
          console.error("Error fetching memo or applicants:", error);
        }
      }
    };
    fetchMemoAndApplicants();
  }, [contract, id]);

  if (!memo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Memo Details</h1>
      <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Field</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Title</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.title}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Status</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.status}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Tender ID</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.tenderid.toString()}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Details</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.details}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Deployed Time</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.DeployedTime}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Start Date</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.Startdate}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Last Date</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.Lastdate}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Bid Opening Date</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.BidopeningDate}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Organization Name</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{memo.OrganizationName}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={showapplicants}>Show Applicants</button>
      <table id="applicantsTable" style={{ display: "none", border: "1px solid #ddd", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tender ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone Number</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Bidding Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Applicant Email</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{applicant.TenderID}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{applicant.PhoneNO}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{applicant.BiddingPrice}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{applicant.Name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{applicant.ApplicantEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailPage;
