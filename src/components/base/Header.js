import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useModal from 'hooks/useModal';
import { NavLink, Link } from 'react-router-dom';
import { caver, getKaikasAccts } from 'lib/api/UseKaikas';
import { clearAccountInfo, getKlaytnProvider } from 'lib/helpers';
import { Button } from 'components/common';
import palette from 'styles/palette';
import { toast } from 'react-toastify';

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
    min-width: 200px;
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
    button {
      margin-right: 5px;
    }
  `,

  HeaderLinkWrapper: styled.ul`
    display: flex;
    flex-direction: row;

    margin: auto;
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

const Appbar = ({ account, setAccount, isConnected, setIsConnected }) => {
  const { openModal, ModalPortal, closeModal } = useModal();

  const loadAccountInfo = async () => {
    const klaytn = getKlaytnProvider();
    if (isConnected) {
      clearAccountInfo(setAccount);
      setIsConnected(false);
      toast.info('Your wallet is disconnected', {
        autoClose: 1500,
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

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

  console.log('account = ', account);

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

  const setNetworkInfo = () => {
    const klaytn = getKlaytnProvider();
    if (klaytn === undefined) return;

    setAccount({
      ...account,
      network: klaytn.networkVersion
    });

    klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion));
  };

  useEffect(async () => {
    setNetworkInfo();
    // loadAccountInfo();
  }, []);

  const links = [
    // { name: 'Borrow', path: '/borrow' }
  ];

  const handleConnectWallet = () => {
    openModal();
    loadAccountInfo();
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

        {account?.account && (
          <Button onClick={handleConnectWallet} color="blue_3">
            {`${account.account.slice(0, 4)}...${account.account.slice(
              account.account.length - 4,
              account.account.length
            )}`}
          </Button>
        )}

        <Button onClick={handleConnectWallet} color="blue_6">
          {isConnected ? 'disconnect wallet' : 'connect wallet'}
        </Button>
      </St.HeaderContaineRight>
    </St.AppbarWrapper>
  );
};

export default Appbar;
