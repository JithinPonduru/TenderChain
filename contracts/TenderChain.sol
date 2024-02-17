// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract DeployerApplication {
    address payable public owner;
    
    struct TenderObject {
        uint tenderid;
        string status;
        string title;
        string details;
        string DeployedTime; 
        string Startdate;
        string Lastdate;
        string BidopeningDate;
        string OrgainsationName;
    }
    
    TenderObject[] public Memo;
    
    constructor() {
        owner = payable(msg.sender);
    }

    function DeployContract(
        uint _tenderid, // Reordered arguments
        string memory _title,
        string memory _status,
        string memory _details,
        string memory _DeployedTime,
        string memory _Startdate,
        string memory _Lastdate,
        string memory _BidopeningDate,
        string memory _OrgainsationName
    ) public {
        Memo.push(TenderObject({
            tenderid: _tenderid,
            status: _status,
            title: _title,
            details: _details,
            DeployedTime: _DeployedTime,
            Startdate: _Startdate,
            Lastdate: _Lastdate,
            BidopeningDate: _BidopeningDate,
            OrgainsationName: _OrgainsationName
        }));
    }


    function getMemo() public view returns (TenderObject[] memory) {
        return Memo;
    }
}
