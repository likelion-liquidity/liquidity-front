import caver from 'klaytn/caver';
import { LENDING_ADDRESS } from 'lib/staticData';
import LENDING_ABI from 'abi/LendingABI.json';

export const getStakedNftList = async (address, nftAddress) => {
  try {
    const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS);
    let stakedNftListTemp = await contract.methods
      .getStakedNftList(address, nftAddress)
      .call();
    let stakedNftList = stakedNftListTemp.map((stakedNftInfo) => {
      const { hasOwnership, loanAmount, nftTokenId } = stakedNftInfo;
      return { hasOwnership, loanAmount, nftTokenId };
    });

    /* stakedNftList */
    // const myNftListRes = await getEosTokenAddress(nftAddress, address);
    // const myNftList = myNftListRes.data.items;

    // console.log(stakedNftList);
    // //스테이킹 된 nft
    // stakedNftList = stakedNftList.map((stakedNft) => {
    //   //내가 가진 nft 가 스테이크된 nft에 존재한다면 제거
    //   const isExist = myNftList.find((myNft) => {
    //     const tokenId = parseInt(myNft.tokenId, 16).toString();
    //     return tokenId === stakedNft.nftTokenId;
    //   });
    //   if (isExist) return null;
    //   else return stakedNft;
    // });
    // stakedNftList = stakedNftList.filter((element) => element != null);

    // console.log('[seo] stakedNftList =', stakedNftList);
    // console.log('[seo] myNftList= ', myNftList);

    return stakedNftList;
  } catch (e) {
    console.log(e);
  }
};
