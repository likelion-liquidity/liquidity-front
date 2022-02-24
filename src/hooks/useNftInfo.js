import { useEffect, useState } from 'react';
import { getPathName } from 'lib/helpers';
import { useLocation } from 'react-router-dom';
const useNftInfo = ({ whiteListNFTList }) => {
  const location = useLocation();
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
  return { nftInfo, setNftInfo };
};

export default useNftInfo;
