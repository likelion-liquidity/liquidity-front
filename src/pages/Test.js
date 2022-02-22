import { useEffect, useState } from 'react';
import caver from 'klaytn/caver';
import caverTest from 'caver-js';
import {
  // getTokenInfo,
  getContractList,
  getContractInfo
} from 'lib/api/UseKip17';
import {
  getTokenInfo,
  getEosTokenAddress,
  getNftContract
} from 'lib/api/UseTokenApi';
import DEPLOYED_ABI from 'abi/CountABI.json';
import DATAHOLDER_ABI from 'abi/DataHolderABI.json';

// const [address] = await window.klaytn.enable();

// const contract = caver.contract.create(abi, CONTRACT_ADDRESS);

// const caver = new Caver('https://api.baobab.klaytn.net:8651/');

// KL
// 0xD11da04cC151CD54f046CE1F3Ea12afff2006757

// MB
// 0xE402f3af25A3c5B7663bF0562764Fd63F33D1794

// MK
// 0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C

const DATA_HOLDER_ADDRESS = '0x924965fFD912544AeeC612812F4aABD124278C1C';
const DEPLOYED_ADDRESS = '0x9c1BD15D5a546b1E78B592Fa84c25E7E43201C2f';
const KIP_ADDRESS = '0x930FA4d81eb0309bD36aCB9F0E816e2938151DBA';
const MK_ADDRESS = '0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C';
// const countContract = new caver.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const TestPage = ({ from }) => {
  const [countContract, setCountContract] = useState(
    DEPLOYED_ABI &&
      DEPLOYED_ADDRESS &&
      new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  );

  const [countContractInfo, setCountContractInfo] = useState({
    count: '',
    lastParticipant: '',
    isSetting: false
  });

  const [accountInfo, setAccountInfo] = useState({
    from: from,
    publicKey: '',
    walletKey: '',
    gas: 3000000,
    txHash: null,
    receipt: null,
    error: null
  });

  const [keyInfo, setKeyInfo] = useState({
    publickey: '',
    walletKey: ''
  });
  useEffect(() => {
    try {
      const { privateKey } = caver.klay.accounts.create();
      const publicKey = caver.klay.accounts.privateKeyToPublicKey(privateKey);
      const walletKey = `${privateKey}0x00${from}`;

      console.log(publicKey, walletKey);
      setKeyInfo({ publicKey, walletKey });

      setAccountInfo({
        ...accountInfo,
        from,
        publicKey: '',
        walletKey: ''
      });
      //this.setState({ publicKey, walletKey });
    } catch (e) {
      console.log(e);
    }
  }, [from]);

  const getCount = async () => {
    console.log('countContract ', countContract);
    // ** 2. Call contract method (CALL) **
    // ex:) this.countContract.methods.methodName(arguments).call()
    // You can call contract method (CALL) like above.
    // For example, your contract has a method called `count`.
    // You can call it like below:
    // ex:) this.countContract.methods.count().call()
    // It returns promise, so you can access it by .then() or, use async-await.
    const count = await countContract.methods.count().call();
    const lastParticipant = await countContract.methods
      .lastParticipant()
      .call();

    console.log('getCount = ', count, lastParticipant);
    setCountContractInfo({
      ...countContractInfo,
      count: count,
      lastParticipant: lastParticipant
    });
  };

  const setPlus = async () => {
    try {
      //   const walletInstance =
      //     caver.klay.accounts.wallet && caver.klay.accounts.wallet[0];
      //   console.log('walletInstance = ', walletInstance);
      // Need to integrate wallet for calling contract method.
      if (!accountInfo.from) return;
      const [address] = await window.klaytn.enable();

      const caver = new caverTest(window.klaytn);
      const contract = caver.contract.create(DEPLOYED_ABI, DEPLOYED_ADDRESS);

      //setCountContractInfo({ ...countContractInfo, settingDirection: 'plus' });

      // 3. ** Call contract method (SEND) **
      // ex:) this.countContract.methods.methodName(arguments).send(txObject)
      // You can call contract method (SEND) like above.
      // For example, your contract has a method called `plus`.
      // You can call it like below:
      // ex:) this.countContract.methods.plus().send({
      //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
      //   gas: '200000',
      // })

      console.log(accountInfo.from);

      caver.klay
        .sendTransaction({
          type: 'SMART_CONTRACT_EXECUTION',
          from: address,
          to: DEPLOYED_ADDRESS,
          data: contract.methods.plus_update(3).encodeABI(),
          value: '',
          gas: '800000'
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash);
        })
        .on('receipt', (receipt) => {
          // success
          console.log('receipt', receipt);
        })
        .on('error', (e) => {
          // failed
          console.log('error ', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getWhiteList = async () => {
    try {
      if (!accountInfo.from) return;
      const caver = new caverTest(window.klaytn);
      const contract = caver.contract.create(
        DATAHOLDER_ABI,
        DATA_HOLDER_ADDRESS
      );
      console.log('contract = ', contract);
      const whiteListNFT = await contract.methods.getWhiteListNftList().call();

      console.log('whiteListNFT = ', whiteListNFT);
      const nftContractPromise = whiteListNFT.map((item) =>
        getNftContract(item)
      );

      const nftContractInfos = await Promise.all(nftContractPromise).then(
        (values) => {
          return values;
        }
      );
      const borrowAsset = nftContractInfos.map((item) => item.data);
      console.log('borrowAsset= ', borrowAsset);
    } catch (e) {
      console.log(e);
    }
  };

  const getMyNFT = async () => {
    try {
      if (!accountInfo.from) return;
      const [address] = await window.klaytn.enable();

      const caver = new caverTest(window.klaytn);
      const contract = caver.contract.create(
        DATAHOLDER_ABI,
        DATA_HOLDER_ADDRESS
      );
      console.log('contract = ', contract);
      const whiteListNFT = await contract.methods
        .getFloorPrice('0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C')
        .call();

      console.log('whiteListNFT = ', whiteListNFT);
    } catch (e) {
      console.log(e);
    }
  };

  const getTest = async () => {
    try {
      const [address] = await window.klaytn.enable();
      //const secondAddress = '0xe41bb1522972d7f1144eb3114bbc32a28b09ed8e';
      const res = await getEosTokenAddress(MK_ADDRESS, address);

      // const res = await getNftContract(MK_ADDRESS);
      //const res = await getTokenInfo(MK_ADDRESS);
      //console.log('res = ', res);
      // const res = await getContractInfo(
      //   '0x924965fFD912544AeeC612812F4aABD124278C1C'
      // );
      console.log('res = ', res.data);
      // const res = await getTokenInfo(MK_ADDRESS, 'MK');
    } catch (e) {
      console.log(e);
    }
  };

  const getNftData = async () => {
    try {
      const caver = new caverTest(window.klaytn);
      const contract = caver.contract.create(
        DATAHOLDER_ABI,
        DATA_HOLDER_ADDRESS
      );
      console.log('contract = ', contract);
      const nftData = await contract.methods.getNftData(MK_ADDRESS).call();
      // );
      console.log('nftData ', nftData);
      // const res = await getTokenInfo(MK_ADDRESS, 'MK');
    } catch (e) {
      console.log(e);
    }
  };

  const transferCoin = async () => {
    // test.js
    const Caver = require('caver-js');
    const caver = new Caver('https://api.baobab.klaytn.net:8651/');

    async function testFunction() {
      const privateKey =
        'e30f4cd76be11d8c718678ce8eb7f2435c202912112058f635c8209d9cdbcb6e';
      // Add a keyring to caver.wallet
      const keyring = caver.wallet.keyring.createFromPrivateKey(
        `0x${privateKey}`
      );
      caver.wallet.add(keyring);

      // Create value transfer transaction
      const vt = new caver.transaction.valueTransfer({
        from: keyring.address,
        to: '0xe41bb1522972d7f1144eb3114bbc32a28b09ed8e',
        value: caver.utils.toPeb(1, 'KLAY'),
        gas: 25000
      });

      // Sign to the transaction
      const signed = await caver.wallet.sign(keyring.address, vt);

      // Send transaction to the Klaytn blockchain platform (Klaytn)
      const receipt = await caver.rpc.klay.sendRawTransaction(signed);
      const receipt2 = await caver.rpc.klay.getTransactionReceipt(
        receipt.transactionHash
      );
      console.log(receipt2);
      console.log(receipt);
    }

    testFunction();
  };

  return (
    <div>
      <button onClick={getCount}>getCount</button>
      <button onClick={getWhiteList}>getWhiteList</button>
      <button onClick={getMyNFT}>getMyNFT</button>
      <button onClick={getTest}>getTokens</button>
      <button onClick={setPlus}>setplus</button>
      <button onClick={getNftData}>getNftData</button>
      <button onClick={transferCoin}>transferCoin</button>
      <div>{countContractInfo?.count}</div>
      {/* <div>{countContractInfo?.lastParticipant}</div> */}
    </div>
  );
};

export default TestPage;
