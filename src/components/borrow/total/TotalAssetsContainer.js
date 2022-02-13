import { useState } from 'react';
import styled from 'styled-components';
import BorrowRepayModal from 'components/modal/BorrowRepayModal';
import useModal from 'hooks/useModal';
const St = {
  CardContainer: styled.div`
      min-width 80vw;
      overflow : scroll;
      margin : 10px;
    `
};
const TotalAssetsContainer = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const proceed = async () => {
    alert('test');
  };
  const handleOnClick = (nftTokenId) => {
    openModal();
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

  return (
    <St.CardContainer>
      <ModalPortal>
        <BorrowRepayModal modal={modalState} />
      </ModalPortal>
    </St.CardContainer>
  );
};

export default TotalAssetsContainer;
