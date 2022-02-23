import { useEffect, useState } from 'react';
import caver from 'klaytn/caver';
//import { caver, secretAccessKey } from 'klaytn/caverN';
import caverTest from 'caver-js';
import { getStakedNftList } from 'lib/api/useLending';
import {
  // getTokenInfo,
  MintToken,
  getOwnerTokens,
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
import { LENDING_ADDRESS, KIP17_MK } from 'lib/staticData';
import LENDING_ABI from 'abi/LendingABI.json';
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
const DEPLOYED_ADDRESS = '0x9c14bD188511C75A4dE642369eE34f61DD3747c4';

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
    const test = await countContract.methods.test().call();

    console.log('getCount = ', count, lastParticipant, test);
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
      // if (!accountInfo.from) return;
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
          type: 'APPROVE',
          from: address,
          to: DEPLOYED_ADDRESS,
          data: contract.methods.plus_update('3', address).encodeABI(),
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
      const res = await getEosTokenAddress(KIP17_MK, address);
      const res2 = await getEosTokenAddress(KIP17_MK, LENDING_ADDRESS);
      // 1,2 개를 머지하고
      //dDU
      //dDUDDDSDDDDDD
      // const res = await getNftContract(KIP17_MK);
      //const res = await getTokenInfo(KIP17_MK);
      //console.log('res = ', res);
      // const res = await getContractInfo(
      //   '0x924965fFD912544AeeC612812F4aABD124278C1C'
      // );
      //스테킹 된거와 내 어드레스에 있는 nft 를 보여줌
      const cardList = [...res.data.items, ...res2.data.items];

      const stakedNftListTemp = await getStakedNftList(address, KIP17_MK);
      let stakedNftList = stakedNftListTemp.map((stakedNftInfo) => {
        const { hasOwnership, loanAmount, nftTokenId } = stakedNftInfo;
        return { hasOwnership, loanAmount, nftTokenId };
      });
      /* 청산안되있는 스테이킹 된것들만   */
      stakedNftList = stakedNftList.filter(
        (stakedNftInfo) => stakedNftInfo.hasOwnership
      );

      console.log('stakedNftList=- ', stakedNftList);

      console.log(cardList);
      // const res = await getTokenInfo(KIP17_MK, 'MK');
    } catch (e) {
      console.log(e);
    }
  };
  const getTokenInfodata = async () => {
    try {
      const [address] = await window.klaytn.enable();
      //const secondAddress = '0xe41bb1522972d7f1144eb3114bbc32a28b09ed8e';
      //const res = await getTokenInfo(KIP17_MK, 0x0);
      //const res2 = await getContractInfo(KIP17_MK);

      const res3 = await getOwnerTokens(KIP17_MK, address);
      // const res = await getNftContract(KIP17_MK);
      //const res = await getTokenInfo(KIP17_MK);
      //console.log('res = ', res);
      // const res = await getContractInfo(
      //   '0x924965fFD912544AeeC612812F4aABD124278C1C'
      // );
      //console.log('res = ', res.data);
      // console.log('res2 = ', res2.data);
      console.log('res3 = ', res3.data);
      // const res = await getTokenInfo(KIP17_MK, 'MK');
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
      const nftData = await contract.methods.getNftData(KIP17_MK).call();
      // );
      console.log('nftData ', nftData);
      // const res = await getTokenInfo(KIP17_MK, 'MK');
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

  const stakeCoin = async () => {
    try {
      //https://ko.docs.klaytn.com/dapp/sdk/caver-js/api-references/caver.kct/kip17#kip17-approve

      console.log(1);
      const [address] = await window.klaytn.enable();
      const caver = new caverTest(window.klaytn);
      const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS);
      caver.klay
        .sendTransaction({
          type: 'SMART_CONTRACT_EXECUTION',
          from: address,
          to: LENDING_ADDRESS,
          data: contract.methods
            .stake('0x629cb3144c8f76c06bb0f18bad90e4af32284e2c', '1')
            .encodeABI(),
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
  const mintToken = async () => {
    try {
      const [address] = await window.klaytn.enable();

      const Caver = new caverTest('https://api.baobab.klaytn.net:8651/');
      // let keyring = Caver.wallet.keyring.generate();
      // let walletKey = keyring.getKlaytnWalletKey();
      // const walletKeyring =
      //   Caver.wallet.keyring.createFromKlaytnWalletKey(walletKey);
      // Caver.wallet.add(walletKeyring);
      const keyring = caver.wallet.keyring.createFromPrivateKey(
        '0xe30f4cd76be11d8c718678ce8eb7f2435c202912112058f635c8209d9cdbcb6e'
      );
      Caver.wallet.add(keyring);

      const kip17 = new Caver.kct.kip17(KIP17_MK);
      const kip17Res = await kip17.approve(LENDING_ADDRESS, 0, {
        from: keyring.address
      });
      console.log('Caver =', Caver);
      console.log('kip17 =', kip17Res);
    } catch (e) {
      console.log(e);
    }
  };
  const approveUser = async () => {
    try {
      const caver = new caverTest(window.klaytn);
      const [address] = await window.klaytn.enable();
      const testKIP17 = new caver.klay.KIP17(KIP17_MK);

      const res = await testKIP17.approve(LENDING_ADDRESS, 1, {
        from: address
      });
      console.log(' res = ', res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={getCount}>getCount</button>
      <button onClick={getWhiteList}>getWhiteList</button>
      <button onClick={getMyNFT}>getMyNFT</button>
      <button onClick={getTest}>getTest</button>
      <button onClick={setPlus}>setplus</button>
      <button onClick={getNftData}>getNftData</button>
      <button onClick={transferCoin}>transferCoin</button>
      <button onClick={stakeCoin}>stakeCoin</button>
      <button onClick={getTokenInfodata}>getTokenInfodata</button>{' '}
      <button onClick={mintToken}>mintToken</button>{' '}
      <button onClick={approveUser}>approveUser</button>
      <div>{countContractInfo?.count}</div>
      {/* <div>{countContractInfo?.lastParticipant}</div> */}
    </div>
  );
};

export default TestPage;
