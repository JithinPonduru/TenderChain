// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract DeployerApplication {

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
        address HashofUser;
    }

    mapping (string => address) private userAddressesByEmail;
    mapping (string => string) private UserEmailPassword;
    mapping (string => ListObjects[]) private UserContracts;
    ListObjects[] private TotalContracts;
    mapping(address => Users) private user;
    mapping(address => bool) private userExists; 

    event UserAdded(address indexed userAddress, string name, string email, string country, string phoneNumber , address HashofUser);
    event ContractDeployed(string indexed UserEmail, uint tenderid, string title, string status, string details, string deployedTime, string startDate, string lastDate, string bidOpeningDate, string organizationName);


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
        string memory _OrganizationName
    ) public {
        require(userAddressesByEmail[user[msg.sender].Email] != address(0), "User does not exist");

        string memory UserEmail = user[msg.sender].Email;
        ListObjects memory newContract = ListObjects(_tenderid, _status, _title, _details, _DeployedTime, _Startdate, _Lastdate, _BidopeningDate, _OrganizationName);
        UserContracts[UserEmail].push(newContract);
        TotalContracts.push(newContract);

        emit ContractDeployed(UserEmail, _tenderid, _title, _status, _details, _DeployedTime, _Startdate, _Lastdate, _BidopeningDate, _OrganizationName);
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
}
