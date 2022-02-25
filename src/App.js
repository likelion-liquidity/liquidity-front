import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { getKaikasAccts } from 'lib/api/UseKaikas';
import { Helmet } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
import Borrow from 'pages/Borrow';
import Header from 'components/base/Header';
import Common from 'pages/Common';
import Total from 'pages/Total';
import Test from 'pages/Test';
import Footer from 'components/base/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/bootstrap.custom.css';
import 'react-toastify/dist/ReactToastify.css';
import { caver } from 'lib/api/UseKaikas';
import DATAHOLDER_ABI from 'abi/DataHolderABI.json';
import LENDING_ABI from 'abi/LendingABI.json';
// import KIP17_ABI from 'abi/KIP17TokenABI.json';
import { getEosTokenAddress, getNftContract } from 'lib/api/UseTokenApi';
import { getKlaytnProvider } from 'lib/helpers';
import { DATA_HOLDER_ADDRESS, LENDING_ADDRESS } from 'lib/staticData';

const St = {
  BaseRoot: styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    min-height: 100vh;
    position: relative;
  `,
  ContentView: styled.div`
    min-height: calc(100vh - 160px);
    display: flex;
    margin: 0 auto 48px;
    padding: 0px 20px 0;
  `
};
function App() {
  const [account, setAccount] = useState({
    txType: null,
    account: '',
    balance: 0,
    network: null
  });
  const [whiteListNFTList, setWhiteListNFTList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const getWhiteList = async () => {
    try {
      const klaytn = getKlaytnProvider(); // klaytn obj
      const contract = caver.contract.create(
        DATAHOLDER_ABI,
        DATA_HOLDER_ADDRESS
      ); // Dataholder contract
      const lendingContract = caver.contract.create(
        LENDING_ABI,
        LENDING_ADDRESS
      ); // Lendinng contract

      /* 화이트 리스트 어드레스 받아오기  */
      const whiteListNFT = await contract.methods.getWhiteListNftList().call();
      const getNftDataContractCall = async (nftAddress) => {
        const nftData = await contract.methods.getNftData(nftAddress).call();
        
        let isOwned = false, isStaked = false;
        
        const { items: nfts } = (
          await getEosTokenAddress(nftAddress, klaytn.selectedAddress)
        ).data;

        if (nfts.length !== 0) {
          for (let i = 0; i < nfts.length; i++) {
            if (nfts[i].owner === klaytn.selectedAddress) {
              isOwned = true;
              break;
            }
          }
        }
        
        const stakedNftList = await lendingContract.methods.getStakedNftList(klaytn.selectedAddress, nftAddress).call();
        if(stakedNftList.length !== 0) isStaked = true;

        return { ...nftData, address: nftAddress, isStaked, isOwned };
      };
      /* 스마트 콘트렉트에 있는 nft 데이터 가져오기 */
      const nftDatas = await Promise.all(
        whiteListNFT.map((nftAddress) => {
          return getNftDataContractCall(nftAddress);
        })
      );

      // kas api로 관련 데이터 가져오기
      const nftContractInfos = await Promise.all(
        whiteListNFT.map((nftAddress) => {
          return getNftContract(nftAddress);
        })
      );

      /* 데이터 병합 */
      const whiteListNFTList = nftContractInfos.map((nftContractInfo) => {
        const finddata = nftDatas.find((nftDatas) => {
          return (
            nftDatas.address.toLowerCase() ===
            nftContractInfo.data.address.toLowerCase()
          );
        });
        return { ...nftContractInfo.data, ...finddata };
      });
      setWhiteListNFTList(whiteListNFTList);
      
    } catch (e) {
      console.log(e);
    }
  };

  const loadAccountInfo = async () => {
    const klaytn = getKlaytnProvider();
   
    if (klaytn) {
      try {
        const res = await getKaikasAccts();
        console.log('res = ', res);
        setAccountInfo(klaytn);
        setIsConnected(true);
        klaytn.on('accountsChanged', () => setAccountInfo(klaytn));
        toast.success('Your wallet is connected!!', {
          autoClose: 1500,
          position: toast.POSITION.BOTTOM_CENTER
        });
      } catch (error) {
        console.log('User denied account access');
      }
    } else {
      console.log(
        'Non-Kaikas browser detected. You should consider trying Kaikas!'
      );
    }
  };

  const setAccountInfo = async () => {
    const klaytn = getKlaytnProvider();
    if (klaytn === undefined) return;

    const account = klaytn.selectedAddress;
    const balance = await caver.klay.getBalance(account);
    setAccount({
      ...account,
      account,
      balance: caver.utils.fromPeb(balance, 'KLAY')
    });
    localStorage.setItem('address', account.account);
  };

  useEffect(() => {
    loadAccountInfo();
    getWhiteList();
  }, []);

  return (
    <>
      <Helmet>
        <title>LIQUIDITY</title>
        <meta name="description" content="LIQUIDITY " />
        <meta property="og:image" content="" />
      </Helmet>
      <div id="root-modal" />
      <Router>
        <St.BaseRoot>
          <Header account={account} setAccount={setAccount} isConnected={isConnected} setIsConnected={setIsConnected}/>
          <St.ContentView>
            <Routes>
              <Route
                path="/"
                element={<Borrow whiteListNFTList={whiteListNFTList} />}
              />
              <Route
                path="borrow/:nftname"
                element={<Common whiteListNFTList={whiteListNFTList} />}
              />
              <Route
                path="manage/:nftname"
                element={<Total whiteListNFTList={whiteListNFTList} />}
              />
              <Route path="test" element={<Test from={account.account} />} />
            </Routes>
          </St.ContentView>
          <ToastContainer />
        </St.BaseRoot>
      </Router>
    </>
  );
}

export default App;
