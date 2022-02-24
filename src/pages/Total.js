import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TotalAssetsContainer from 'components/borrow/total/TotalAssetsContainer';
import NFTStakeListContainer from 'components/borrow/total/NFTStakeListContainer';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import NFTInfoContainer from 'components/borrow/stake/NFTInfoHeader';
import { handleScrollTop } from 'lib/helpers';
import { getStakedNftList } from 'lib/api/useLending';
import useNftInfo from 'hooks/useNftInfo';

const St = {
  TotalAssetWrapper: styled.div`
    max-width: 80vw;
    min-width: 80vw;
  `
};
const Total = ({ whiteListNFTList }) => {
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const [isStakedSelectedNft, setIsStakedSelectedNft] = useState(false);
  const [isDisplayStaked, setIsDisplayStaked] = useState(false);

  const { nftInfo, setNftInfo } = useNftInfo({ whiteListNFTList });
  const [stakedNftList, setStakedNftList] = useState();
  const [nftTokenArray, setNftTokenArray] = useState(null);

  const handleStakedCheckButton = () => {
    setIsDisplayStaked((prev) => !prev);

    setSelectedNftTokendId('');
    setSelectedNft(null);
  };

  const handleOnClickNFT = (nftTokenId, isStaked) => {
    setSelectedNftTokendId(nftTokenId);
    // console.log('[seo] nftTokenArray= ', nftTokenArray);
    // console.log('[seo] nftTokenId= ', nftTokenId);
    const selectedNFT = nftTokenArray.find((nft) => {
      //const tokenId = parseInt(nft.tokenId, 16).toString();
      return nft.tokenId === nftTokenId;
    });
    //console.log('[seo] selectedNFT = ', selectedNFT);
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

  const nftList = async () => {
    try {
      let address = '0x34910aAbDC57937666C1D0ec87cE9337b171fdbB';
      if (!address) return;
      console.log('whiteListNFTList= ', whiteListNFTList);
      const selectedWhiteList = whiteListNFTList?.find(
        (item) => item.name === nftInfo.nftTitle
      );
      if (!selectedWhiteList) return;
      console.log(address);
      const stakedNftListTemp = await getStakedNftList(
        address,
        selectedWhiteList.address
      );
      let stakedNftList = stakedNftListTemp.map((stakedNftInfo) => {
        const { hasOwnership, loanAmount, nftTokenId } = stakedNftInfo;
        return { hasOwnership, loanAmount, nftTokenId };
      });
      /* 청산 된 것은 보여줄 필요 없음  */
      stakedNftList = stakedNftList.filter(
        (stakedNftInfo) => stakedNftInfo.hasOwnership
      );
      setStakedNftList(stakedNftList);
      console.log('stakedNftList= ', stakedNftList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!whiteListNFTList) return;
    if (!whiteListNFTList?.length < 0) return;
    nftList();
  }, [whiteListNFTList, nftInfo]);

  return (
    <St.TotalAssetWrapper>
      <NFTInfoContainer nftTitle={nftInfo?.nftTitle} />
      <TotalAssetsContainer
        stakedNftList={stakedNftList}
        floorPrice={nftInfo?.floorPrice}
      />
      <NFTStakeListContainer
        nftInfo={nftInfo}
        handleOnClickNFT={handleOnClickNFT}
        selectedNftTokendId={selectedNftTokendId}
        handleStakedCheckButton={handleStakedCheckButton}
        stakedNftList={stakedNftList}
        isDisplayStaked={isDisplayStaked}
        whiteListNFTList={whiteListNFTList}
        nftTokenArray={nftTokenArray}
        setNftTokenArray={setNftTokenArray}
      />
      <NFTDescriptionContainer
        nftInfo={nftInfo}
        selectedNft={selectedNft}
        isOpenDescriptionContainer={isOpenDescriptionContainer}
        isStakedSelectedNft={isStakedSelectedNft}
      />
    </St.TotalAssetWrapper>
  );
};

export default Total;
