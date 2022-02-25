import { useState, useEffect } from 'react';
import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';
import palette from 'styles/palette';
import {
  addComma,
  divideByTenTo18Squares,
  tenTo18Squares,
  hexToNumberString
} from 'lib/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Caver from 'caver-js';
import useModal from 'hooks/useModal';
import BigNumber from 'bignumber.js';
import BorrowRepayModal from 'components/modal/BorrowRepayModal';
import { LENDING_ADDRESS, KIP7_ADDRESS } from 'lib/staticData';
import { getBalance } from 'lib/api/UseKip7';
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
  borrowedValue = 0, //test
  nftCollectionAddress,
  stakedNftList
}) => {
  console.log('nftInfo = ', nftInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal, ModalPortal } = useModal();
  const [stableBalance, setStableBalance] = useState(0);

  /* 나중에 변경필요 */
  const isManagePage = location.pathname.indexOf('manage') !== -1;
  const isBorrowPage = location.pathname.indexOf('borrow') !== -1;
  const handleMoveStakeNFT = (title) => {
    if (isManagePage) {
      window.location.reload();
      return;
    }
    navigate(`/manage/${title}`);
  };
  useEffect(() => {
    const fecth = async () => {
      try {
        const res = await getBalance(
          KIP7_ADDRESS,
          window.klaytn.selectedAddress
        );
        if (!res) return;
        if (res.status === 200) {
          let balance = res.data.balance;
          balance = parseInt(balance, 16).toString();
          console.log('balance = ', balance);
          setStableBalance(balance);
          //setModalState({ ...modalState, stableBalance: balance });
        }
      } catch (e) {
        console.log('[seo] error ', e);
      }
    };
    fecth();
  }, []);

  const handleStake = async () => {
    try {
      console.log('[seo] handleStake selectedNft ', selectedNft);
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
      // let num = parseInt(selectedNft.tokenId, 2); // n 속의 숫자를 2진수로 취급하여, 10진수 숫자로 변환
      // // 10진수화된 2진수를, 16진수로 변환
      // num = num.toString(16);
      let num = parseInt(selectedNft.tokenId, 16).toString();
      console.log('num = ', num);
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
          handleMoveStakeNFT(nftInfo.nftTitle);
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
    handleMoveStakeNFT(nftInfo.nftTitle);
  };

  // const proceed = async () => {
  //   try {
  //     const [address] = await window.klaytn.enable();
  //     const caver = new Caver(window.klaytn);
  //     const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS); // Lendinng contract

  //     // let num = parseInt(modalState.selectedNft.tokenId, 2).toString(16);
  //     // let num = parseInt(modalState.selectedNft.tokenId);
  //     let num = parseInt(selectedNft.tokenId, 16).toString();
  //     let amount = modalState.inputValue;
  //     console.log('amount = ', amount);
  //     /* 10 ** 18  */
  //     amount = BigNumber(tenTo18Squares(amount));
  //     console.log('amount = ', amount);
  //     let data = null;

  //     if (modalState.title === 'Borrow') {
  //       data = contract.methods
  //         .borrow(amount, modalState.nftCollectionAddress, num)
  //         .encodeABI();
  //     } else {
  //       const kip7 = new caver.klay.KIP7(KIP7_ADDRESS);
  //       const res = await kip7.approve(LENDING_ADDRESS, amount, {
  //         from: address
  //       });

  //       data = contract.methods
  //         .repay(amount, modalState.nftCollectionAddress, num)
  //         .encodeABI();
  //     }
  //     // console.log('amount =', amount);
  //     // console.log(
  //     //   'modalState.nftCollectionAddress =',
  //     //   modalState.nftCollectionAddress
  //     // );
  //     // console.log('num =', num);
  //     // console.log('data = ', data);
  //     caver.klay
  //       .sendTransaction({
  //         type: 'SMART_CONTRACT_EXECUTION',
  //         from: address,
  //         to: LENDING_ADDRESS,
  //         data,
  //         value: '',
  //         gas: '800000'
  //       })
  //       .on('transactionHash', (hash) => {
  //         console.log('transactionHash', hash);
  //       })
  //       .on('receipt', (receipt) => {
  //         // success
  //         closeModal();
  //         console.log('receipt', receipt);
  //       })
  //       .on('error', (e) => {
  //         // failed
  //         console.log('error ', e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const [modalState, setModalState] = useState({
    title: 'Borrow',
    message: '',
    subMessage: '',
    confirmButtonMessage: 'Proceed',
    cancelButttonMessage: 'Cancel',
    isNeedBackgroundClickBlock: false,
    inputPlaceholder: 'Borrow Amount',
    inputValue: '',
    selectedNft,
    nftInfo,
    stableBalance,
    nftCollectionAddress,
    //confirmFunction: proceed,
    cancelFunction: closeModal
  });

  /* 모달 스테이트 싱크 */
  useEffect(() => {
    setModalState({
      ...modalState,
      nftInfo,
      stableBalance,
      selectedNft,
      nftCollectionAddress,
      //confirmFunction: proceed,
      cancelFunction: closeModal
    });
  }, [nftInfo, stableBalance, selectedNft, nftCollectionAddress]);

  const handleOnClick = (e) => {
    const nextState = { ...modalState };
    console.log(e.target.id);
    if (e.target.id === 'borrow') {
      setModalState({
        ...nextState,
        title: 'Borrow',
        inputPlaceholder: 'Borrow Amount',
        selectedNft,
        nftCollectionAddress
      });
    } else {
      setModalState({
        ...nextState,
        title: 'Repay',
        inputPlaceholder: 'Repay Amount',
        selectedNft,
        nftCollectionAddress
      });
    }

    openModal();
  };

  console.log('[seo] isBorrowPage ', isBorrowPage);
  console.log('[seo] stakedNftList ', stakedNftList);
  console.log(nftInfo);

  const [currentBorrowAmount, setCurrnetBorrowAmount] = useState(0);
  useEffect(() => {
    if (!stakedNftList) return;
    if (!selectedNft) return;
    const stakeInfo = stakedNftList?.find((stakedNft) => {
      const tokenId = parseInt(selectedNft.tokenId, 16).toString();
      return tokenId === stakedNft.nftTokenId;
    });
    if (!stakeInfo) return;
    setCurrnetBorrowAmount(stakeInfo.loanAmount);
  }, [selectedNft, stakedNftList]);

  const [canMaxBorrowValue, setCanMaxBorrowValue] = useState();
  const [liqValue, setLiqValue] = useState(0);
  useEffect(() => {
    const getMaxBorrowValue = () => {
      const collateralValue = divideByTenTo18Squares(
        parseInt(nftInfo.floorPrice)
      );
      const maxLtv = divideByTenTo18Squares(parseInt(nftInfo.maxLtv));
      const liqLtv = divideByTenTo18Squares(parseInt(nftInfo.liqLtv));
      const maxBorrowValue = collateralValue * (maxLtv / 100); //최대 빌릴 수 있는량
      const liqValue = collateralValue * (liqLtv / 100); //최대 빌릴 수 있는량
      console.log(currentBorrowAmount);
      const canMaxBorrowValue = divideByTenTo18Squares(tenTo18Squares(maxBorrowValue) - currentBorrowAmount); //내가 최대로 빌릴수 있는 량
      console.log('collateralValue = ', collateralValue);
      console.log('maxLtv = ', maxLtv);
      console.log('maxBorrowValue = ', maxBorrowValue);
      console.log('canMaxBorrowValue = ', canMaxBorrowValue);
      console.log('liqValue = ', liqValue);
      setCanMaxBorrowValue(canMaxBorrowValue);
      setLiqValue(liqValue);
    };

    /* 버로우, 내가 현재 얼만큼 빌릴수 있는지  */
    getMaxBorrowValue();
  }, [currentBorrowAmount, nftInfo.floorPrice, nftInfo.maxLtv]);

  return (
    <>
      <St.DescriptionContainer
        isOpenDescriptionContainer={isOpenDescriptionContainer}
      >
        <St.DescriptionTokenId>
          <h3> Token Id : {selectedNft?.tokenId}</h3>
        </St.DescriptionTokenId>

        <div style={{ textAlign: 'center' }}>
          <div>
            <span style={{ marginRight: '10px' }}>
              Collateral Value :
              {addComma(divideByTenTo18Squares(collateralValue))}$
            </span>
            <span>
              Borrowed Value :{addComma(divideByTenTo18Squares(borrowedValue))}$
            </span>
          </div>
        </div>

        <St.LtvBarContainer>
          <div
            style={{
              width: '90%'
            }}
          >
            <LTVBar
              collateralValue={divideByTenTo18Squares(collateralValue)}
              borrowedValue={divideByTenTo18Squares(currentBorrowAmount)}
              repayAmount={0}
              maxLtv={divideByTenTo18Squares(parseInt(nftInfo.maxLtv))}
              liqLtv={divideByTenTo18Squares(parseInt(nftInfo.liqLtv))}
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
                {isStakedSelectedNft ? (
                  <>
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
                  </>
                ) : (
                  <Button color="blue_4" width="200px" onClick={handleStake}>
                    Stake
                  </Button>
                )}
              </St.ButtonContainer>
            )}
          </St.StakeButtonContainer>
        </St.StakeButtonWrapper>
      </St.DescriptionContainer>

      <ModalPortal>
        <BorrowRepayModal
          canMaxBorrowValue={canMaxBorrowValue}
          currentBorrowAmount={currentBorrowAmount}
          modalState={modalState}
          selectedNft={selectedNft}
          stableBalance={stableBalance}
          nftCollectionAddress={nftCollectionAddress}
          closeModal={closeModal}
        />
      </ModalPortal>
    </>
  );
};

export default NFTDescriptionContainer;
