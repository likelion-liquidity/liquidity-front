import { useEffect, useState } from 'react';
import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import NFTInfoHeader from 'components/borrow/stake/NFTInfoHeader';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import { NFT_TOKEN_ARRAY } from 'lib/staticData';
import { useLocation } from 'react-router-dom';
import { getPathName } from 'lib/helpers';
import { getStakedNftList } from 'lib/api/useLending';

const CommonTestPage = ({ whiteListNFTList }) => {
  const [nftInfo, setNftInfo] = useState({
    address: '',
    availableLoanAmount: '',
    floorPrice: '',
    isOwned: '',
    isStaked: '',
    liqLtv: '',
    maxLtv: '',
    symbol: '',
    nftKlayPrice: '',
    nftTitle: ''
  });
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const [nftTokenArray, setNftTokenArray] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!whiteListNFTList) return;
    const nftTitle = getPathName(location.pathname);
    const NFT = whiteListNFTList.find((nftInfo) => nftInfo.name === nftTitle);
    if (!NFT) return;
    console.log(NFT);
    const {
      address,
      availableLoanAmount,
      floorPrice,
      isOwned,
      isStaked,
      liqLtv,
      maxLtv,
      name,
      nftKlayPrice,
      symbol
    } = NFT;

    setNftInfo({
      ...nftInfo,
      nftTitle: name,
      address,
      availableLoanAmount,
      floorPrice,
      isOwned,
      isStaked,
      liqLtv,
      maxLtv,
      name,
      nftKlayPrice,
      symbol
    });
  }, [location.pathname, whiteListNFTList]);

  const handleOnClickNFT = (nftTokenId) => {
    setSelectedNftTokendId(nftTokenId);
    const selectedNFT = nftTokenArray?.find(
      (token) => token.tokenId === nftTokenId
    );
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

  return (
    <div>
      <NFTInfoHeader nftTitle={nftInfo?.nftTitle} />
      <NFTCardContainer
        nftTitle={nftInfo?.nftTitle}
        handleOnClickNFT={handleOnClickNFT}
        selectedNftTokendId={selectedNftTokendId}
        whiteListNFTList={whiteListNFTList}
        nftTokenArray={nftTokenArray}
        setNftTokenArray={setNftTokenArray}
      />
      <NFTDescriptionContainer
        nftInfo={nftInfo}
        selectedNft={selectedNft}
        isOpenDescriptionContainer={isOpenDescriptionContainer}
      />
    </div>
  );
};

export default CommonTestPage;
