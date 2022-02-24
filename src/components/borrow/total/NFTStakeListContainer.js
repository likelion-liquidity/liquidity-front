import { useState } from 'react';
import styled from 'styled-components';
import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import { Asset } from 'components/common';
import { DUMMY } from 'pages/Dummy';

const St = {
  FilterContainer: styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 5px;
    justify-content: flex-end;
    font-size: 15px;
  `,

  ChkBox: styled.input`
    width: 20px;
    height: 20px;
  `,
  Text: styled.div`
    margin-left: 5px;
  `
};

const NFTStakeListContainer = ({
  nftInfo,
  handleOnClickNFT,
  selectedNftTokendId,
  isDisplayStaked,
  handleStakedCheckButton,
  stakedNftList,
  whiteListNFTList,
  nftTokenArray,
  setNftTokenArray
}) => {
  const [isDiaplayCardContainer, setIsDisplayCardContainer] = useState(true);

  const handleManageButton = () => {
    setIsDisplayCardContainer((prev) => !prev);
  };

  return (
    <div>
      <Asset
        imgProps={{ src: '', alt: '' }}
        titleProps={{ title: nftInfo.nftTitle }}
        ltvProps={{ ltv: nftInfo.maxLtv }}
        priceProps={{ price: nftInfo.floorPrice }}
        buttonProps={{ title: 'manage', handleOnClick: handleManageButton }}
        width="100%"
        // handleOnClick={handleMoveStakeNFT}
      />
      {isDiaplayCardContainer && (
        <>
          <St.FilterContainer>
            <St.ChkBox type="checkbox" onClick={handleStakedCheckButton} />
            <St.Text>Staked</St.Text>
          </St.FilterContainer>
          <NFTCardContainer
            nftTitle={nftInfo.nftTitle}
            whiteListNFTList={whiteListNFTList}
            stakedNftList={stakedNftList}
            selectedNftTokendId={selectedNftTokendId}
            handleOnClickNFT={handleOnClickNFT}
            isDisplayStaked={isDisplayStaked}
            nftTokenArray={nftTokenArray}
            setNftTokenArray={setNftTokenArray}
          />
        </>
      )}
    </div>
  );
};
export default NFTStakeListContainer;
