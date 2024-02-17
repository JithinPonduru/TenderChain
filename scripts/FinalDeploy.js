const hre = require("hardhat");

async function main() {
    const App = await hre.ethers.getContractFactory("DeployerApplication");
    const contract = await App.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

