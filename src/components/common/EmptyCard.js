import styled from 'styled-components';
import { Button } from 'components/common';
import { RiErrorWarningLine } from 'react-icons/ri';

const St = {
  PostInfo: styled.div`
    margin: auto;
    margin-top: 5%;
    padding: 2rem;
    font-size: 2rem;
    text-align: center;
    width: 80%;
    background: linear-gradient(to right, rgb(122 153 255), #4681d8);

    box-shadow: 0 3px 10px grey;
    color: white;
    border-radius: 4px;
  `,
  ButtonContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `
};

function EmptyCard() {
  return (
    <St.PostInfo>
      <span style={{ marginRight: '5px' }}>
        <RiErrorWarningLine />
      </span>
      NFT를 보유하고 있지 않아요!
      <div>
        <span style={{ fontSize: '18px' }}>
          해당 NFT를 여기서 구매해보세요.
        </span>
        <St.ButtonContainer>
          <Button color="blue_5">OpenSea 바로가기</Button>
        </St.ButtonContainer>
      </div>
    </St.PostInfo>
  );
}
export default EmptyCard;
