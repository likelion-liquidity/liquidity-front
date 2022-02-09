import Caver from 'caver-js';
import { getKlaytnProvider } from 'lib/helpers';

const klaytn = getKlaytnProvider();
const caver = new Caver(klaytn);

export const getKaikasAccts = () => klaytn.enable();

export const sendTransaction = (to, value, gas = 8000000) => {
  caver.klay
    .sendTransaction({
      type: 'VALUE_TRANSFER',
      from: klaytn.selectedAddress,
      to,
      value: caver.utils.toPeb(value, 'KLAY'),
      gas
    })
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash);
    })
    .once('receipt', (receipt) => {
      console.log('receipt', receipt);
    })
    .once('error', (error) => {
      console.log('error', error);
    });
};
