import { useState, useEffect } from 'react';
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
import Stake from 'pages/Stake';
import Header from 'components/base/Header';
import Common from 'pages/Common';
import Footer from 'components/base/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [obj, setObj] = useState('TEAM LIQUIDITY');

  const [account, setAccount] = useState({
    txType: null,
    account: '',
    balance: 0,
    network: null
  });

  return (
    <>
      <Helmet>
        <title>LIQUIDITY</title>
        <meta name="description" content="LIQUIDITY " />
        <meta property="og:image" content="" />
      </Helmet>
      <Router>
        <St.BaseRoot>
          <Header account={account} setAccount={setAccount} />
          <St.ContentView>
            <Routes>
              <Route path="borrow" element={<Borrow />} />
              <Route path="stake" element={<Stake />} />
              <Route path="common" element={<Common />} />
            </Routes>
          </St.ContentView>
        </St.BaseRoot>
      </Router>
    </>
  );
}

export default App;
