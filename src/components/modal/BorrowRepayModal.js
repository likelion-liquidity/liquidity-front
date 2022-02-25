import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, LTVBar } from 'components/common';
import Caver from 'caver-js';
import BigNumber from 'bignumber.js';
import { LENDING_ADDRESS, KIP7_ADDRESS } from 'lib/staticData';
import LENDING_ABI from 'abi/LendingABI.json';
import { divideByTenTo18Squares, tenTo18Squares } from 'lib/helpers';
import { toastError, toastSuccess } from 'components/common/Toast';

const St = {
  PopPanel: styled.div`
    padding: 50px;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    z-index: 1;
  `,
  PopPanelHd: styled.h1`
    padding: 0 30px;
    font-size: 22px;
    font-weight: 600;
    height: 29px;
    line-height: 29px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  PopPanelContainer: styled.div`
    padding: 0 30px;
    min-width: 420px;
    width: calc(100% - 5px);
    height: inherit;

    span.error-txt {
      font-size: 15px;
      margin-top: 10px;
      display: block;
    }
  `,
  PopButtonContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 30px 30px;
    button {
      margin-right: 5px;
    }
  `
};

const CommonModal = ({
  modalState,
  selectedNft,
  stableBalance,
  closeModal,
  canMaxBorrowValue,
  currentBorrowAmount,
  nftCollectionAddress
}) => {
  const [inputValue, setInputValue] = useState(0);
  const handleConfirm = () => {
    proceed();
    //modal.confirmFunction();
  };
  const handleCancel = () => {
    modalState.cancelFunction();
  };
  const onChangeInput = (e) => {
    let value = 0;
    if (!e.target.value) value = 0;
    value = parseFloat(e.target.value);
    if (value >= canMaxBorrowValue) {
      value = canMaxBorrowValue;
    }
    //setModalState({ ...modalState, inputValue: e.target.value });
    setInputValue(value);
    modalState.inputValue = value;
  };

  const proceed = async () => {
    try {
      const [address] = await window.klaytn.enable();
      const caver = new Caver(window.klaytn);
      const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS); // Lendinng contract

      // let num = parseInt(modalState.selectedNft.tokenId, 2).toString(16);
      // let num = parseInt(modalState.selectedNft.tokenId);
      let num = parseInt(selectedNft.tokenId, 16).toString();
      let amount = inputValue;
      console.log('amount = ', amount);
      /* 10 ** 18  */
      amount = BigNumber(tenTo18Squares(amount));
      console.log('amount = ', amount);
      console.log('nftCollectionAddress= ', nftCollectionAddress);
      console.log('num= ', num);
      let data = null;

      if (modalState.title === 'Borrow') {
        data = contract.methods
          .borrow(amount, nftCollectionAddress, num)
          .encodeABI();
      } else {
        const kip7 = new caver.klay.KIP7(KIP7_ADDRESS);
        const res = await kip7.approve(LENDING_ADDRESS, amount, {
          from: address
        });

        data = contract.methods
          .repay(amount, modalState.nftCollectionAddress, num)
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
          toastSuccess("Contrats! Transaction has been confirmed!!")
          closeModal();
          console.log('receipt', receipt);
        })
        .on('error', (e) => {
          // failed
          toastError("Transaction has been failed.");
          console.log('error ', e);
        });
      } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <St.PopPanel>
        <St.PopPanelHd> {modalState.title}</St.PopPanelHd>
        <St.PopPanelContainer>
          max Borrow Value :{canMaxBorrowValue}
          <p>
            {modalState.message}
            <br />
            {modalState.subMessage}
          </p>
          <Input
            placeholder={modalState.inputPlaceholder}
            style={{ color: '#000' }}
            lcon="$"
            onChange={onChangeInput}
            value={inputValue}
            type="number"
          />
          {modalState.stableBalance}
          <LTVBar
            collateralValue={divideByTenTo18Squares(
              parseInt(modalState.nftInfo.floorPrice)
            )}
            // borrowedValue={divideByTenTo18Squares(borrowedValue - depositValue)}
            // repayAmount={0}
            // collateralValue={modalState.nftInfo.f}
            inputValue={inputValue}
            borrowedValue={divideByTenTo18Squares(
              parseInt(currentBorrowAmount)
            )}
            maxLtv={divideByTenTo18Squares(parseInt(modalState.nftInfo.maxLtv))}
            liqLtv={divideByTenTo18Squares(parseInt(modalState.nftInfo.liqLtv))}
          />
        </St.PopPanelContainer>

        <St.PopButtonContainer>
          <Button
            type="button"
            onClick={handleCancel}
            size="small"
            color="red_6"
          >
            {modalState.cancelButttonMessage}
          </Button>
          <Button type="button" onClick={handleConfirm} size="small">
            {modalState.confirmButtonMessage}
          </Button>
        </St.PopButtonContainer>
      </St.PopPanel>
    </>
  );
};

export default CommonModal;
