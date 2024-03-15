// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeployerApplication {

    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    struct ListObjects {
        uint tenderid;
        string status;
        string title;
        string details;
        string DeployedTime; 
        string Startdate;
        string Lastdate;
        string BidopeningDate;
        uint minimumBiddingPrice;
        string OrganizationName;
    }

    struct Users {
        string Name;
        string Email;
        string Country;
        string PhoneNo;
        address HashofUser;
    }

    struct Applicant {
        string Name;
        string PhoneNO;
        uint BiddingPrice;
        string ApplicantEmail;
    }

    mapping (uint => bool) private TenderIdExits;
    mapping (string => address) private userAddressesByEmail;
    mapping (string => string) private UserEmailPassword;
    mapping (string => ListObjects[]) private UserContracts;
    mapping (uint => Applicant[]) private Applicants;
    ListObjects[] private TotalContracts;
    mapping(address => Users) private user;
    mapping(address => bool) private userExists; 

    event UserAdded(address indexed userAddress, string name, string email, string country, string phoneNumber , address HashofUser);
    event ContractDeployed(string indexed UserEmail, uint tenderid, string title, string status, string details, string deployedTime, string startDate, string lastDate, string bidOpeningDate,uint minimumBiddingPrice, string organizationName);
    event ApplicantApplied(uint tenderid, string name, string phoneNo, uint biddingPrice,string ApplicantEmail);

    function addUser(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _password,
        string memory _phoneNumber
    ) public {
        require(userAddressesByEmail[_email] == address(0), "Email address already exists");

        address UserAddress = msg.sender;
        user[UserAddress] = Users(_name, _email, _country, _phoneNumber , UserAddress);
        userAddressesByEmail[_email] = UserAddress;
        userExists[UserAddress] = true;
        UserEmailPassword[_email] = _password;

        emit UserAdded(UserAddress, _name, _email, _country, _phoneNumber , UserAddress);
    }

    function deployContract(
        uint _tenderid, 
        string memory _title,
        string memory _status,
        string memory _details,
        string memory _DeployedTime,
        string memory _Startdate,
        string memory _Lastdate,
        string memory _BidopeningDate,
        uint _minimumBiddingPrice,
        string memory _OrganizationName
    ) public {
        require(userAddressesByEmail[user[msg.sender].Email] != address(0), "User does not exist");

        string memory UserEmail = user[msg.sender].Email;
        ListObjects memory newContract = ListObjects(_tenderid, _status, _title, _details, _DeployedTime, _Startdate, _Lastdate, _BidopeningDate,_minimumBiddingPrice, _OrganizationName);
        UserContracts[UserEmail].push(newContract);
        TotalContracts.push(newContract);
        TenderIdExits[_tenderid] = true;

        emit ContractDeployed(UserEmail, _tenderid, _title, _status, _details, _DeployedTime, _Startdate, _Lastdate, _BidopeningDate, _minimumBiddingPrice,_OrganizationName);
    }

    function getMemo(string memory _email) public view returns (ListObjects[] memory) {
        require(userAddressesByEmail[_email] != address(0), "Email address does not exist");

        return UserContracts[_email];
    }

    function getPassword(string memory _email) public view returns (string memory) {
        return UserEmailPassword[_email];
    }

    function getAddress(string memory _email) public view returns(address) {
        return userAddressesByEmail[_email];
    }

    function listOfContracts() public view returns (ListObjects[] memory) {
        return TotalContracts;
    }

function Apply(uint _TenderId, string memory _Name, string memory _PhoneNO, uint _BiddingPrice, string memory _ApplicantEmail) public {
    require(TenderIdExits[_TenderId] == true, "Tender id does not exist");

    ListObjects[] storage userContracts = UserContracts[user[msg.sender].Email];

    // Find the contract with the matching tenderid
    uint contractIndex = 0;
    bool found = false;
    for (uint i = 0; i < userContracts.length; i++) {
        if (userContracts[i].tenderid == _TenderId) {
            contractIndex = i;
            found = true;
            break;
        }
    }
    require(found, "User does not have this tender");

    uint minimumBiddingPrice = userContracts[contractIndex].minimumBiddingPrice;
    require(_BiddingPrice >= minimumBiddingPrice, "Bidding amount is less than minimum bidding price");

    // Check if the email is registered for this contract
    bool emailRegistered = false;
    for (uint i = 0; i < Applicants[_TenderId].length; i++) {
        if (keccak256(abi.encodePacked(Applicants[_TenderId][i].ApplicantEmail)) == keccak256(abi.encodePacked(_ApplicantEmail))) {
            emailRegistered = true;
            break;
        }
    }
    require(!emailRegistered, "Email is already registered for this contract");

    Applicant memory newApplicant = Applicant(_Name, _PhoneNO, _BiddingPrice, _ApplicantEmail);
    Applicants[_TenderId].push(newApplicant);

    emit ApplicantApplied(_TenderId, _Name, _PhoneNO, _BiddingPrice, _ApplicantEmail);
}


    function getApplicants(uint _TenderId) public view returns (Applicant[] memory) {
        return Applicants[_TenderId];
    }
}
