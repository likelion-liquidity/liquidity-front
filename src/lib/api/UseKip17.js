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

//https://kip17-api.klaytnapi.com/v1/contract/{contract-address-or-alias}/owner/{owner-address}
export const getOwnerTokens = (contractAdrress, address) => {
  return axios.get(`v1/contract/${contractAdrress}/owner/${address}`);
};

export const MintToken = (contractAdrress, address, id, uri) => {
  const data = {
    to: address,
    id: id,
    uri: uri
  };
  console.log('data ', data);
  return axios.post(`v1/contract/${contractAdrress}/token`, data);
};
// export const getOwnerTokens = (contractAdrress, address) => {
//     return axios.get(`v1/contract/${contractAdrress}/owner/${address}`);
//   };

//https://kip17-api.klaytnapi.com/v1/contract/{contract-address-or-alias}/approveall
// https://kip17-api.klaytnapi.com/v1/contract/{contract-address-or-alias}/owner/{owner-address}

//https://kip17-api.klaytnapi.com/v1/contract/{contract-address-or-alias}/token/{token-id}
