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
  handleOnClickNFT,
  selectedNftTokendId,
  isDisplayStaked,
  handleStakedCheckButton
}) => {
  const [isDiaplayCardContainer, setIsDisplayCardContainer] = useState(false);

  const handleManageButton = () => {
    setIsDisplayCardContainer((prev) => !prev);
  };

  return (
    <div>
      <Asset
        imgProps={DUMMY[0].imgProps}
        titleProps={{ title: 'meta-kongs' }}
        ltvProps={DUMMY[0].ltvProps}
        priceProps={DUMMY[0].priceProps}
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
            selectedNftTokendId={selectedNftTokendId}
            handleOnClickNFT={handleOnClickNFT}
            isDisplayStaked={isDisplayStaked}
          />
        </>
      )}
    </div>
  );
};
export default NFTStakeListContainer;
