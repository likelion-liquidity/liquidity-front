import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BorrowRepayModal from 'components/modal/BorrowRepayModal';
import { LTVBar, Button } from 'components/common';
import palette from 'styles/palette';
import useModal from 'hooks/useModal';
import { addComma, divideByTenTo18Squares } from 'lib/helpers';
import LENDING_ABI from 'abi/LendingABI.json';
import { LENDING_ADDRESS, KIP7_ADDRESS, KIP17_MK } from 'lib/staticData';
import Caver from 'caver-js';

const St = {
  Wrapper: styled.div`
    width: 100%;
    margin: 25px 0 25px 0;
    border-radius: 10px;

    padding: 60px;
    display: flex;
    flex-direction: column;
  `,
  AssetsWrapper: styled.div`
    display: flex;
  `,
  AssetsContainer: styled.div`
    margin-left: ${(props) => `${props.marginLeft}px`};
    margin-right: 18px;
    color: black;
    width: 100%;
    box-shadow: rgb(0 0 0 / 12%) 11px 13px 30px -8px;
    border-radius: 22px;
    padding: 35px 40px;
    height: auto;
    display: grid;
    grid-template-rows: 30px 84px 1fr;
  `,
  LTVBarContainer: styled.div`
    margin: 20px 0 20px 0;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-start;
    button {
      margin-right: 11px;
    }
  `
};

const DisplayAssetCotainer = ({ title, value }) => {
  return (
    <St.AssetsContainer>
      <div>
        <span>{title}</span>

        <div style={{ display: 'flex' }}>
          <span>
            <h3>
              <span>$</span>
              <span>{value}</span>
            </h3>
          </span>
        </div>
      </div>
    </St.AssetsContainer>
  );
};
const TotalAssetsContainer = ({ stakedNftList, floorPrice }) => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const [collateralValue, setCollateralValue] = useState(0);
  const [borrowedValue, setBorrowedValue] = useState(0);

  const proceed = async () => {
    const [address] = await window.klaytn.enable();
    const caver = new Caver(window.klaytn);
    const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS); // Lendinng contract

    let num = parseInt('0x00', 2).toString(16);
    const amount = modalState.inputValue * 10 ** 18;
    console.log(amount);
    let data = null;
    if (modalState.title === 'Borrow') {
      data = contract.methods
        .borrow(amount, '0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C', num)
        .encodeABI();
    } else {
      const kip7 = new caver.klay.KIP7(KIP7_ADDRESS);
      const res = await kip7.approve(LENDING_ADDRESS, amount, {
        from: address
      });
      console.log('kip7 res = ' + res);
      data = await contract.methods
        .repay(amount, '0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C', num)
        .encodeABI();
    }
    caver.klay
      .sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: address,
        to: LENDING_ADDRESS,
        data,
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
  };
  const [modalState, setModalState] = useState({
    title: 'Borrow',
    message: '',
    subMessage: '',
    confirmButtonMessage: 'Proceed',
    cancelButttonMessage: 'Cancel',
    isNeedBackgroundClickBlock: false,
    inputPlaceholder: 'Borrow Amount',
    inputValue: '',
    confirmFunction: proceed,
    cancelFunction: closeModal
  });

  const handleOnClick = (e) => {
    const nextState = modalState;
    console.log(e.target.id);
    if (e.target.id === 'borrow') {
      nextState.title = 'Borrow';
      nextState.inputPlaceholder = 'Borrow Amount';
      setModalState(nextState);
    } else {
      nextState.title = 'Repay';
      nextState.inputPlaceholder = 'Repay Amount';
      setModalState(nextState);
    }

    openModal();
  };

  useEffect(() => {
    if (!stakedNftList) return;
    let borrowedValue = 0;
    const hasOwnershipList = stakedNftList.filter((stakedNftInfo) => {
      if (stakedNftInfo.hasOwnership) {
        borrowedValue += stakedNftInfo.loanAmount;
      }
      return stakedNftInfo.hasOwnership;
    });
    setCollateralValue(hasOwnershipList.length * floorPrice);
    setBorrowedValue(borrowedValue);
  }, [stakedNftList, floorPrice]);

  return (
    <>
      <St.Wrapper>
        <St.AssetsWrapper>
          <DisplayAssetCotainer
            title={'Collateral Value'}
            value={addComma(divideByTenTo18Squares(collateralValue))}
          />
          <DisplayAssetCotainer
            title={'Total Borrowed Value'}
            value={addComma(divideByTenTo18Squares(borrowedValue))}
          />
        </St.AssetsWrapper>

        {/* <St.LTVBarContainer>
          <LTVBar
            collateralValue={collateralValue}
            borrowedValue={borrowedValue}
          />
        </St.LTVBarContainer> */}

        {/* <St.ButtonContainer>
          <Button
            id="borrow"
            onClick={handleOnClick}
            color="blue_4"
            width="140px"
          >
            Borrow
          </Button>
          <Button
            id="repay"
            onClick={handleOnClick}
            color="blue_4"
            width="140px"
          >
            Repay
          </Button>
        </St.ButtonContainer> */}
      </St.Wrapper>

      <ModalPortal>
        <BorrowRepayModal modal={modalState} />
      </ModalPortal>
    </>
  );
};

export default TotalAssetsContainer;
