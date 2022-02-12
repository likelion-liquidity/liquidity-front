import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';

const St = {
  DiscriptionContainer: styled.div`
    border: 1px solid;
    height: 300px;
  `,
  LtvBarContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  `,
  StakeButtonContainer: styled.div`
    display: flex;
    justifycontent: center;
    padding: 20px;
  `
};

const NFTDiscriptionContainer = () => {
  return (
    <St.DiscriptionContainer>
      <St.LtvBarContainer>
        <div
          style={{
            width: '90%'
          }}
        >
          <LTVBar />
        </div>
      </St.LtvBarContainer>

      <St.StakeButtonContainer>
        <div style={{ width: '100px' }}>
          <Button color="blue_4">Stake</Button>
        </div>
      </St.StakeButtonContainer>
    </St.DiscriptionContainer>
  );
};

export default NFTDiscriptionContainer;
