// by Logan <https://github.com/loganworld>
// at 19/08/2022

const { ethers } = require("ethers");
const { Contract, Provider, setMulticallAddress } = require("ethers-multicall");
const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");
const { provider, supportChainId } = require("./providers");

const multicallAddress = process.env.MULTIADDRESS || "0x402C435EA85DFdA24181141De1DE66bad67Cdf12"; // 4002 multiaddress
setMulticallAddress(4002, multicallAddress);
const multicallProvider = new Provider(provider, supportChainId);

const AdminWallet = new ethers.Wallet(process.env.ADMINWALLET);

// make contract objects
const NFTTANK = new ethers.Contract(Addresses.NFTTank, Abis.NFTTank, provider);
const EnergyPool = new ethers.Contract(Addresses.EnergyPool, Abis.EnergyPool, provider);
const TANKTOKEN = new ethers.Contract(Addresses.TankToken, Abis.TankToken, provider);

const RewardPool = new ethers.Contract(Addresses.RewardPool, Abis.RewardPool, AdminWallet);

module.exports = {
  provider, multicallProvider,
  NFTTANK,
  EnergyPool,
  TANKTOKEN,
  RewardPool,
  AdminWallet
};