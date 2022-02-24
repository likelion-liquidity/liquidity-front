import { useState } from 'react';
import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';
import palette from 'styles/palette';
import { addComma, divideByTenTo18Squares } from 'lib/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Caver from 'caver-js';
import useModal from 'hooks/useModal';

import BorrowRepayModal from 'components/modal/BorrowRepayModal';
import { LENDING_ADDRESS, KIP7_ADDRESS } from 'lib/staticData';
import LENDING_ABI from 'abi/LendingABI.json';

const St = {
  DescriptionContainer: styled.div`
    position: fixed;
    box-shadow: 0 3px 15px rgb(0 0 0 / 37%);
    height: 250px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    transition: 0.2s all;
    transform: ${(props) =>
      props.isOpenDescriptionContainer ? 'translateY(0)' : 'translateY(100%)'};
  `,
  DescriptionTokenId: styled.div`
    text-align: center;
    margin-top: 10px;
    // border-radius: 4px;
    // background: ${palette.blue_4};
    // color: white;
  `,
  LtvBarContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  `,
  StakeButtonWrapper: styled.div`
    display: flex;
    justifycontent: center;
    padding: 20px;
  `,
  StakeButtonContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-start;
    button {
      margin-right: 11px;
    }
  `
};

const NFTDescriptionContainer = ({
  nftInfo,
  isOpenDescriptionContainer,
  selectedNft,
  isStakedSelectedNft,
  depositValue = 0, //floor price
  collateralValue = 0, //test
  borrowedValue = 0 //test
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal, ModalPortal } = useModal();
  const handleMoveStakeNFT = (title) => {
    navigate(`/manage/${title}`);
  };
  /* 나중에 변경필요 */
  const isManagePage = location.pathname.indexOf('manage') !== -1;
  const isBorrowPage = location.pathname.indexOf('borrow') !== -1;
  const handleStake = async () => {
    try {
      const [address] = await window.klaytn.enable();

      const caver = new Caver(window.klaytn);

      const kip17Address = nftInfo?.address;
      /* approve */
      const selectKip17 = new caver.klay.KIP17(kip17Address);
      const approveResponse = await selectKip17.approve(
        LENDING_ADDRESS,
        selectedNft.tokenId,
        {
          from: address
        }
      );
      console.log('approveResponse =', approveResponse);
      /* approveResponse 결과 값에 따른 로직플로우 추가 */

      /* stake */
      const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS);
      let num = parseInt(selectedNft.tokenId, 2); // n 속의 숫자를 2진수로 취급하여, 10진수 숫자로 변환
      // 10진수화된 2진수를, 16진수로 변환
      num = num.toString(16);
      caver.klay
        .sendTransaction({
          type: 'SMART_CONTRACT_EXECUTION',
          from: address,
          to: LENDING_ADDRESS,
          data: contract.methods.stake(kip17Address, num).encodeABI(),
          value: '',
          gas: '800000'
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash);
        })
        .on('receipt', (receipt) => {
          handleMoveStakeNFT();
          console.log('receipt', receipt);
        })
        .on('error', (e) => {
          // failed
          console.log('error ', e);
        });
    } catch (e) {
      console.log(e);
    }

    // const resolveAfter3Sec = new Promise((resolve) =>
    //   setTimeout(resolve, 3000)
    // );
    // toast.promise(resolveAfter3Sec, {
    //   pending: 'Promise is pending',
    //   success: 'Promise resolved 👌',
    //   error: 'Promise rejected 🤯'
    // });

    // await resolveAfter3Sec;
    // handleMoveStakeNFT();
  };
  console.log('selectedNft ', selectedNft);
  const handleRepay = async () => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯'
    });

    await resolveAfter3Sec;
    handleMoveStakeNFT();
  };

  const proceed = async () => {
    const [address] = await window.klaytn.enable();
    const caver = new Caver(window.klaytn);
    const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS); // Lendinng contract

    let num = parseInt('0x00', 2).toString(16);
    let amount = parseInt(1, 2).toString(16);
    // let amount = parseInt(1*(10**18), 2).toString(16);
    let data = null;
    if (modalState.title === 'Borrow') {
      data = contract.methods
        .borrow(amount, '0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C', num)
        .encodeABI();
    } else {
      //const kip7 = new caver.kct.kip7(address);
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

  console.log('[seo] isBorrowPage ', isBorrowPage);
  return (
    <>
      <St.DescriptionContainer
        isOpenDescriptionContainer={isOpenDescriptionContainer}
      >
        <St.DescriptionTokenId>
          <h3> {selectedNft?.tokenId}</h3>
        </St.DescriptionTokenId>

        <div style={{ textAlign: 'center' }}>
          DepositValue :{addComma(divideByTenTo18Squares(depositValue))}$
        </div>
        <St.LtvBarContainer>
          <div
            style={{
              width: '90%'
            }}
          >
            <LTVBar
              collateralValue={divideByTenTo18Squares(collateralValue)}
              borrowedValue={divideByTenTo18Squares(
                borrowedValue - depositValue
              )}
              repayAmount={0}
            />
          </div>
        </St.LtvBarContainer>
        <St.StakeButtonWrapper>
          <St.StakeButtonContainer>
            {/* {isStakedSelectedNft ? (
              <Button color="blue_4" width="200px" onClick={handleRepay}>
                Repay
              </Button>
            ) : (
              <Button color="blue_4" width="200px" onClick={handleStake}>
                Stake
              </Button>
            )} */}
            {isBorrowPage && (
              <Button color="blue_4" width="200px" onClick={handleStake}>
                Stake
              </Button>
            )}

            {isManagePage && (
              <St.ButtonContainer>
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
              </St.ButtonContainer>
            )}
          </St.StakeButtonContainer>
        </St.StakeButtonWrapper>
      </St.DescriptionContainer>

      <ModalPortal>
        <BorrowRepayModal modal={modalState} />
      </ModalPortal>
    </>
  );
};

export default NFTDescriptionContainer;
