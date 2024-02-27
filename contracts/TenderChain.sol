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

    mapping (string => address) private userAddressesByEmail;
    mapping (string => string) private UserEmailPassword;
    mapping (address => ListObjects) private UserContracts;
    ListObjects[] private TotalContracts;
    mapping (address => Users) private user;
    mapping(address => bool) private userExists; 

    event UserAdded(address indexed userAddress, string name, string email, string country, string phoneNumber);
    event ContractDeployed(address indexed userAddress, uint tenderid, string title, string status, string details, string deployedTime, string startDate, string lastDate, string bidOpeningDate, string organizationName);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
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

        emit UserAdded(UserAddress, _name, _email, _country, _phoneNumber);
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
            TotalContracts.push(UserContracts[msg.sender]);

            emit ContractDeployed(msg.sender, _tenderid, _title, _status, _details, _DeployedTime, _Startdate, _Lastdate, _BidopeningDate, _OrganizationName);
        }
    }

    function getMemo(address _userAddress) public view returns (
        uint, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory
    ) {
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

    function getPassword(string memory _email) public view returns (string memory) {
        return UserEmailPassword[_email];
    }

    function getAddress(string memory _email) public view returns(address) {
        return userAddressesByEmail[_email];
    }

    function listOfContracts() public view returns (ListObjects[] memory) {
        return TotalContracts;
    }
}
