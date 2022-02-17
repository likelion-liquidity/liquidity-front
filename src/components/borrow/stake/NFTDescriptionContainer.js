import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';
import palette from 'styles/palette';
import { addComma } from 'lib/helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  `
};

const NFTDescriptionContainer = ({
  isOpenDescriptionContainer,
  selectedNft,
  isStakedSelectedNft,
  depositValue = 8000 * 1.2, //floor price
  collateralValue = 50000, //test
  borrowedValue = 20004 //test
}) => {
  const navigate = useNavigate();

  const handleMoveStakeNFT = (title) => {
    navigate(`/manage/${title}`);
  };

  const handleStake = async () => {
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

  return (
    <St.DescriptionContainer
      isOpenDescriptionContainer={isOpenDescriptionContainer}
    >
      <St.DescriptionTokenId>
        <h3> {selectedNft?.tokenId}</h3>
      </St.DescriptionTokenId>

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
      <St.StakeButtonWrapper>
        <St.StakeButtonContainer>
          {isStakedSelectedNft ? (
            <Button color="blue_4" width="200px" onClick={handleRepay}>
              Repay
            </Button>
          ) : (
            <Button color="blue_4" width="200px" onClick={handleStake}>
              Stake
            </Button>
          )}
        </St.StakeButtonContainer>
      </St.StakeButtonWrapper>
    </St.DescriptionContainer>
  );
};

export default NFTDescriptionContainer;
