import axios from './casTokenAxios';

export const getNftContract = (nftAddress) => {
  return axios.get(`/v2/contract/nft/${nftAddress}`);
};

export const getTokenInfo = (nftAddress) => {
  return axios.get(`/v2/contract/nft/${nftAddress}/token`);
};

/*
    특정 EOA가 가진 모든 NFT 토큰 정보 조회
    NFT 컨트랙트와 EOA를 지정하면, 이 NFT 컨트랙트에서 발행된 NFT 중 
    EOA가 가지고 있는 NFT의 정보를 불러옵니다
*/
export const getEosTokenAddress = (nftAddress, ownerAddress) => {
  return axios.get(`/v2/contract/nft/${nftAddress}/owner/${ownerAddress}`);
};
