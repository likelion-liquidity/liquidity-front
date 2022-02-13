import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';
import palette from 'styles/palette';
import { addComma } from 'lib/helpers';

const St = {
  DescriptionContainer: styled.div`
    position: fixed;
    box-shadow: 0 3px 15px rgb(0 0 0 / 37%);
    height: 250px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    transition: 0.4s all;
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
  StakeButtonContainer: styled.div`
    display: flex;
    justifycontent: center;
    padding: 20px;
  `
};

const NFTDescriptionContainer = ({
  isOpenDescriptionContainer,
  selectedNft,
  depositValue = 6000 * 1.2, //floor price
  collateralValue = 50000, //test
  borrowedValue = 20004 //test
}) => {
  return (
    <St.DescriptionContainer
      isOpenDescriptionContainer={isOpenDescriptionContainer}
    >
      <St.DescriptionTokenId>
        <h3> {selectedNft?.tokenId}</h3>
      </St.DescriptionTokenId>
      {/* <div>collateralValue : {addComma(collateralValue)}$</div>
      <div> borrowedValue :{addComma(borrowedValue)}$</div> */}
      <div style={{ textAlign: 'center' }}>
        DepositValue :{addComma(depositValue)}$
      </div>
      <St.LtvBarContainer>
        <div
          style={{
            width: '90%'
          }}
        >
          <LTVBar
            collateralValue={collateralValue}
            borrowedValue={borrowedValue - depositValue}
            repayAmount={0}
          />
        </div>
      </St.LtvBarContainer>
      <St.StakeButtonContainer>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Button color="blue_4" width="200px">
            Stake
          </Button>
        </div>
      </St.StakeButtonContainer>
    </St.DescriptionContainer>
  );
};

export default NFTDescriptionContainer;
