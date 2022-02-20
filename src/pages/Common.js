import { useEffect, useState } from 'react';
import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import NFTInfoHeader from 'components/borrow/stake/NFTInfoHeader';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import { NFT_TOKEN_ARRAY } from 'lib/staticData';
import { useLocation } from 'react-router-dom';
import { getPathName } from 'lib/helpers';

const CommonTestPage = () => {
  const [nftInfo, setNftInfo] = useState({
    nftTitle: '',
    floorPrice: ''
  });
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const nftTitle = getPathName(location.pathname);
    setNftInfo({ nftTitle: nftTitle });
  }, []);

  const handleOnClickNFT = (nftTokenId) => {
    setSelectedNftTokendId(nftTokenId);
    const selectedNFT = NFT_TOKEN_ARRAY.find(
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
      />
      <NFTDescriptionContainer
        selectedNft={selectedNft}
        isOpenDescriptionContainer={isOpenDescriptionContainer}
      />
    </div>
  );
};

export default CommonTestPage;
