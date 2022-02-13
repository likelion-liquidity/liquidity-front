import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useModal from 'hooks/useModal';
import { NavLink, Link } from 'react-router-dom';
import { getKaikasAccts } from 'lib/api/UseKaikas';
import { getKlaytnProvider } from 'lib/helpers';
import { Button } from 'components/common';
import palette from 'styles/palette';
import caver from 'caver-js';
// import caver from 'lib/klaytn/caver';

const St = {
  AppbarWrapper: styled.div`
    z-index: 1;
    width: 89%;
    margin: 0 auto;
    max-width: 1184px;
    height: 60px;

    min-height: 40px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
  `,

  HeaderContainerLeft: styled.div``,
  HeaderContainerLogoWrapper: styled.div`
    height: 50px;
    img {
      height: 100%;
      width: 100%;
    }
  `,
  HeaderContaineRight: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  HeaderLinkWrapper: styled.ul`
    display: flex;
    flex-direction: row;

    margin-top: 0;

    a {
      text-decoration: none;
      margin: 10px 5px;
      padding: 10px 25px 13px;
      font-size: 14px;
      color: #868e96;
      background-color: transparent;
      border: none;
      border-radius: 22px;
      transition: font-weight 0.2s ease, background-color 0.2s ease,
        color 0.2s ease;
    }
    li {
      color: ${palette.blue_4};
      margin: 0 0.8rem;
      font-size: 1.3rem;
      position: relative;
      list-style: none;
    }

    .active {
      background-color: #f1f3f5;
      li {
        color: ${palette.blue_7};
      }
    }
  `
};

const Appbar = ({ account, setAccount }) => {
  const { openModal, ModalPortal, closeModal } = useModal();

  const loadAccountInfo = async () => {
    const klaytn = getKlaytnProvider();
    console.log(klaytn);
    if (klaytn) {
      try {
        const res = await getKaikasAccts();
        console.log('res = ', res);
        // setAccountInfo(klaytn);
        klaytn.on('accountsChanged', () => setAccountInfo(klaytn));
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
  };

  const setNetworkInfo = () => {
    const klaytn = getKlaytnProvider();
    if (klaytn === undefined) return;

    setAccount({
      ...account,
      network: klaytn.networkVersion
    });

    klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion));
  };

  console.log('account = ', account);

  useEffect(() => {
    setNetworkInfo();
    //loadAccountInfo();
  }, []);

  const links = [
    { name: 'Borrow', path: '/borrow' },
    { name: 'Stake', path: '/stake' }
  ];

  const handleConnectWallet = () => {
    openModal();
    //loadAccountInfo();
  };

  return (
    <St.AppbarWrapper>
      <St.HeaderContainerLeft className="header-container-left">
        <Link to={'/'}>
          <St.HeaderContainerLogoWrapper>
            <img src="/images/logo.png" alt="logo" />
          </St.HeaderContainerLogoWrapper>
        </Link>
      </St.HeaderContainerLeft>
      <St.HeaderContaineRight id="right">
        <St.HeaderLinkWrapper>
          {links.map((link, index) => (
            <NavLink key={index} to={link.path} exact>
              <li>{link.name}</li>
            </NavLink>
          ))}
        </St.HeaderLinkWrapper>
        <Button onClick={handleConnectWallet} color="blue_4">
          {account ? 'disconnect wallet' : 'connect wallet'}
        </Button>
      </St.HeaderContaineRight>
    </St.AppbarWrapper>
  );
};

export default Appbar;
