import axios from './casKip7Axios';

export const getBalance = (tokenContract, ownerAddress) => {
  return axios.get(
    `v1/contract/${tokenContract}/account/${ownerAddress}/balance`
  );
};
