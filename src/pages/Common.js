import { useEffect, useState } from 'react';
import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import NFTInfoHeader from 'components/borrow/stake/NFTInfoHeader';
import NFTDescriptionContainer from 'components/borrow/stake/NFTDescriptionContainer';
import useNftInfo from 'hooks/useNftInfo';

const CommonTestPage = ({ whiteListNFTList }) => {
  const { nftInfo, setNftInfo } = useNftInfo({ whiteListNFTList });
  const [isOpenDescriptionContainer, setIsOpenDescriptionContainer] =
    useState(false);
  const [selectedNftTokendId, setSelectedNftTokendId] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const [nftTokenArray, setNftTokenArray] = useState(null);

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
