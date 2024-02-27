// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract DeployerApplication {
    
    address payable public owner;
    
    struct ListObjects {
        uint tenderid;
        string status;
        string title;
        string details;
        string DeployedTime; 
        string Startdate;
        string Lastdate;
        string BidopeningDate;
        string OrganizationName;
    }

    struct Users {
        string Name;
        string Email;
        string Country;
        string PhoneNo;
    }

    mapping (string => address ) public  userAddressesByEmail;
    mapping (string => string) public UserEmailPassword;
    mapping (address => ListObjects ) private  UserContracts;
    mapping (address => Users ) private  user;
    mapping(address => bool) private userExists; 

    constructor() {
        owner = payable(msg.sender);
    }

    function addUser(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _password,
        string memory _phoneNumber
    ) public {
        require(userAddressesByEmail[_email] == address(0), "Email address already exists");

        address UserAddress = msg.sender;
        user[UserAddress] = Users(_name, _email, _country, _phoneNumber);
        userAddressesByEmail[_email] = UserAddress;
        userExists[UserAddress] = true;
        UserEmailPassword[_email] = _password;
    }

    function DeployContract(
        uint _tenderid, 
        string memory _title,
        string memory _status,
        string memory _details,
        string memory _DeployedTime,
        string memory _Startdate,
        string memory _Lastdate,
        string memory _BidopeningDate,
        string memory _OrganizationName
    ) public {
        require(userExists[msg.sender], "User does not exist");
        if(owner == msg.sender){
            UserContracts[msg.sender].tenderid = _tenderid;
            UserContracts[msg.sender].title = _title;
            UserContracts[msg.sender].status = _status;
            UserContracts[msg.sender].details = _details;
            UserContracts[msg.sender].DeployedTime = _DeployedTime;
            UserContracts[msg.sender].Startdate = _Startdate;
            UserContracts[msg.sender].Lastdate = _Lastdate;
            UserContracts[msg.sender].BidopeningDate = _BidopeningDate;
            UserContracts[msg.sender].OrganizationName = _OrganizationName;
        }
    }

    function getMemo(address _userAddress) public  view returns (uint, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(userExists[_userAddress], "User does not exist");
        if(owner == _userAddress){
        ListObjects memory contractDetails = UserContracts[_userAddress];
        return (
            contractDetails.tenderid,
            contractDetails.status,
            contractDetails.title,
            contractDetails.details,
            contractDetails.DeployedTime,
            contractDetails.Startdate,
            contractDetails.Lastdate,
            contractDetails.BidopeningDate,
            contractDetails.OrganizationName
        );
        }
        else {
            return (
            0, // tenderid
            "None", // status
            "None", // title
            "None", // details
            "None", // DeployedTime
            "None", // Startdate
            "None", // Lastdate
            "None", // BidopeningDate
            "None"  // OrganizationName
        );
        }
    }

     function getPassword(string memory email) public view returns (string memory) {
        return UserEmailPassword[email];
    }
}
