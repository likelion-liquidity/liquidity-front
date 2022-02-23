import caver from 'klaytn/caver';
import { LENDING_ADDRESS } from 'lib/staticData';
import LENDING_ABI from 'abi/LendingABI.json';

export const getStakedNftList = async (address, nftAddress) => {
  try {
    const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS);
    const stakedNftList = await contract.methods
      .getStakedNftList(address, nftAddress)
      .call();

    return stakedNftList;
  } catch (e) {
    console.log(e);
  }
};
