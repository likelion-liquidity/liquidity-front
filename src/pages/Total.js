import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TotalAssetsContainer from 'components/borrow/total/TotalAssetsContainer';
import NFTStakeListContainer from 'components/borrow/total/NFTStakeListContainer';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import NFTInfoContainer from 'components/borrow/stake/NFTInfoHeader';
import { handleScrollTop } from 'lib/helpers';
import { NFT_TOKEN_ARRAY, NFT_STAKED_LIST } from 'lib/staticData';
const St = {
  TotalAssetWrapper: styled.div`
    max-width: 80vw;
    min-width: 80vw;
  `
};
const Total = () => {
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const [isStakedSelectedNft, setIsStakedSelectedNft] = useState(false);
  const [isDisplayStaked, setIsDisplayStaked] = useState(false);

  const handleStakedCheckButton = () => {
    setIsDisplayStaked((prev) => !prev);

    setSelectedNftTokendId('');
    setSelectedNft(null);
  };

  const handleOnClickNFT = (nftTokenId, isStaked) => {
    setSelectedNftTokendId(nftTokenId);
    const selectedNFT = NFT_TOKEN_ARRAY.find(
      (token) => token.tokenId === nftTokenId
    );
    setIsStakedSelectedNft(isStaked);
    setSelectedNft(selectedNFT);
  };

  /* nft 카드 선택시 desc on, off 처리 */
  useEffect(() => {
    if (selectedNftTokendId === '') {
      setIsOpenDescriptionContainer(false);
      return;
    }
    setIsOpenDescriptionContainer(true);
  }, [selectedNftTokendId]);

  useEffect(() => {
    handleScrollTop(true);
  }, []);

  return (
    <St.TotalAssetWrapper>
      <NFTInfoContainer />
      <TotalAssetsContainer />
      <NFTStakeListContainer
        handleOnClickNFT={handleOnClickNFT}
        selectedNftTokendId={selectedNftTokendId}
        isDisplayStaked={isDisplayStaked}
        handleStakedCheckButton={handleStakedCheckButton}
      />
      <NFTDescriptionContainer
        selectedNft={selectedNft}
        isOpenDescriptionContainer={isOpenDescriptionContainer}
        isStakedSelectedNft={isStakedSelectedNft}
      />
    </St.TotalAssetWrapper>
  );
};

export default Total;
