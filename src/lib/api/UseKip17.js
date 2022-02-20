import axios from './casAxios';

export const getTokenInfo = (tokenContract, tokenId) => {
  return axios.get(`v1/contract/${tokenContract}/token/${tokenId}`);
};
export const getContractList = () => {
  return axios.get('v1/contract');
};

export const getContractInfo = (contractAdrress) => {
  return axios.get(`v1/contract/${contractAdrress}`);
};
