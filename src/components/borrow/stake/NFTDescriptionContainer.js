import { Button, LTVBar } from 'components/common';
import styled from 'styled-components';
import palette from 'styles/palette';
import { addComma } from 'lib/helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Caver from 'caver-js';
import { LENDING_ADDRESS } from 'lib/staticData';
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
  `
};

const NFTDescriptionContainer = ({
  nftInfo,
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
    try {
      const [address] = await window.klaytn.enable();

      const caver = new Caver(window.klaytn);
      const contract = caver.contract.create(LENDING_ABI, LENDING_ADDRESS);
      let num = parseInt(selectedNft.tokenId, 2); // n 속의 숫자를 2진수로 취급하여, 10진수 숫자로 변환
      // 10진수화된 2진수를, 16진수로 변환
      num = num.toString(16);

      caver.klay
        .sendTransaction({
          type: 'SMART_CONTRACT_EXECUTION',
          from: address,
          to: LENDING_ADDRESS,
          data: contract.methods
            .stake('0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C', num)
            .encodeABI(),
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
