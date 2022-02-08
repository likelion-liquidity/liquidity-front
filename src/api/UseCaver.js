import Caver from "caver-js";
import KIP17ABI from "../abi/KIP17TokenABI.json";
import {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    CHAIN_ID,
    NFT_CONTRACT_ADDRESS
} from "../constants";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    { name: "x-chain-id", value: CHAIN_ID },
  ],
};

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardsOf = async (address) => {
  const balance = await NFTContract.methods.balanceOf(address).call();
  const tokenIds = [];
  for(let i = 0; i < balance; i++){
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  const tokenUris = [];
  for(let i = 0; i < balance; i++){
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  const nfts = [];
  for(let i = 0; i < balance; i++){
    nfts.push({uri:tokenUris[i], id: tokenIds[i]});
  }
  return nfts;
};

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  });
};