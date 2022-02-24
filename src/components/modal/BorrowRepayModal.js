import styled from 'styled-components';
import { Button, Input, LTVBar } from 'components/common';

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

const CommonModal = ({ modal }) => {
  const handleConfirm = () => {
    modal.confirmFunction();
  };
  const handleCancel = () => {
    modal.cancelFunction();
  };
  const onChangeInput = (e) => {
    modal.inputValue = e.target.value;
  };

  return (
    <>
      <St.PopPanel>
        <St.PopPanelHd> {modal.title}</St.PopPanelHd>
        <St.PopPanelContainer>
          <p>
            {modal.message}
            <br />
            {modal.subMessage}
          </p>
          <Input placeholder={modal.inputPlaceholder} lcon="$" onChange={onChangeInput}/>
          <LTVBar />
        </St.PopPanelContainer>

        <St.PopButtonContainer>
          <Button
            type="button"
            onClick={handleCancel}
            size="small"
            color="red_6"
          >
            {modal.cancelButttonMessage}
          </Button>
          <Button type="button" onClick={handleConfirm} size="small">
            {modal.confirmButtonMessage}
          </Button>
        </St.PopButtonContainer>
      </St.PopPanel>
    </>
  );
};

export default CommonModal;
