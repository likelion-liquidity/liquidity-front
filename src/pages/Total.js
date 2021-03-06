import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TotalAssetsContainer from 'components/borrow/total/TotalAssetsContainer';
import NFTStakeListContainer from 'components/borrow/total/NFTStakeListContainer';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import NFTInfoContainer from 'components/borrow/stake/NFTInfoHeader';
import { handleScrollTop } from 'lib/helpers';
import { getStakedNftList } from 'lib/api/useLending';
import useNftInfo from 'hooks/useNftInfo';
import { useLocation } from 'react-router-dom';

const St = {
  TotalAssetWrapper: styled.div`
    max-width: 80vw;
    min-width: 80vw;
  `
};
const Total = ({ whiteListNFTList }) => {
  const nftCollectionName = useLocation().pathname.split('/')[2];
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const [isStakedSelectedNft, setIsStakedSelectedNft] = useState(false);
  const [isDisplayStaked, setIsDisplayStaked] = useState(false);

  const { nftInfo, setNftInfo } = useNftInfo({ whiteListNFTList });
  const [stakedNftList, setStakedNftList] = useState();
  const [nftTokenArray, setNftTokenArray] = useState(null);

  const getNftCollectionAddress = () => {
    for (let i = 0; i < whiteListNFTList.length; i++) {
      if (whiteListNFTList[i].name === nftCollectionName) {
        return whiteListNFTList[i].address;
      }
    }
  };

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

  /* nft ?????? ????????? desc on, off ?????? */
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
      let address = window.klaytn.selectedAddress;
      if (!address) return;

      const selectedWhiteList = whiteListNFTList?.find(
        (item) => item.name === nftInfo.nftTitle
      );
      if (!selectedWhiteList) return;
      console.log(address);
      let stakedNftList = await getStakedNftList(
        address,
        selectedWhiteList.address
      );

      /* ?????? ??? ?????? ????????? ?????? ??????  */
      stakedNftList = stakedNftList.filter(
        (stakedNftInfo) => stakedNftInfo.hasOwnership
      );
      setStakedNftList(stakedNftList);
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
      <NFTInfoContainer
        nftTitle={nftInfo?.nftTitle}
        floorPrice={nftInfo?.floorPrice}
      />
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
        stakedNftList={stakedNftList}
        isOpenDescriptionContainer={isOpenDescriptionContainer}
        isStakedSelectedNft={isStakedSelectedNft}
        nftCollectionAddress={getNftCollectionAddress()}
      />
    </St.TotalAssetWrapper>
  );
};

export default Total;
