import { useEffect, useState } from 'react';
import { NFT_LIST } from 'lib/staticData';

export default function useGetImage(nftTitie = '') {
  const [logoImage, setLogoImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    const nftData = NFT_LIST.find((item) => item.title === nftTitie);
    if (!nftData) return;

    setLogoImage(nftData.logo_image);
    setBannerImage(nftData.banner_image);
  }, [nftTitie]);

  return { logoImage, bannerImage };
}
