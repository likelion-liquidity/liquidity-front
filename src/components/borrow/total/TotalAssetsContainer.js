import { useState } from 'react';
import styled from 'styled-components';
import BorrowRepayModal from 'components/modal/BorrowRepayModal';
import { LTVBar, Button } from 'components/common';
import palette from 'styles/palette';
import useModal from 'hooks/useModal';

const St = {
  Wrapper: styled.div`
    margin: 25px 0 25px 0;
    border-radius: 10px;
    height: 100%;
    min-width: 1000px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    background-color: ${palette.blue_0};
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
const TotalAssetsContainer = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const [collateralValue, setCollateralValue] = useState(72295.904);
  const [borrowedValue, setBorrowedValue] = useState(28685.902);
  const proceed = async () => {
    alert('test');
  };
  const [modalState, setModalState] = useState({
    title: 'Borrow',
    message: '',
    subMessage: '',
    confirmButtonMessage: 'Proceed',
    cancelButttonMessage: 'Cancel',
    isNeedBackgroundClickBlock: false,
    confirmFunction: proceed,
    cancelFunction: closeModal
  });

  const handleOnClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === 'borrow') {
      setModalState({ ...modalState, title: 'Borrow' });
    } else {
      setModalState({ ...modalState, title: 'Repay' });
    }

    openModal();
  };

  return (
    <>
      <St.Wrapper>
        <St.AssetsWrapper>
          <DisplayAssetCotainer
            title={'COLLATERAL VALUE'}
            value={'72,295.904'}
          />
          <DisplayAssetCotainer title={'Borrowed VALUE'} value={'28,686'} />
        </St.AssetsWrapper>

        <St.LTVBarContainer>
          <LTVBar
            collateralValue={collateralValue}
            borrowedValue={borrowedValue}
          />
        </St.LTVBarContainer>

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
      </St.Wrapper>

      <ModalPortal>
        <BorrowRepayModal modal={modalState} />
      </ModalPortal>
    </>
  );
};

export default TotalAssetsContainer;
