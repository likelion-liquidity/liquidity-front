import styled from 'styled-components';
import useGetImage from 'hooks/useGetImage';
const St = {
  NFTDescriptionImageContainer: styled.div`
    height: 200px;
    background-color: black;
    width: 100%;
    left: 0;
    position: absolute;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,

  NFTDescriptionContainer: styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    flex-direction: column;
  `,
  NFTLogoContainer: styled.div`
    margin-top: 128px;
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  NFTLogo: styled.div`
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    height: 130px;
    width: 130px;
    img {
      object-fit: cover;
      height: 100%;
      transition: opacity 400ms ease 0s;
      width: 100%;
    }
  `,
  NFTTitleCotainer: styled.div`
    max-width: 100%;
    align-items: center;
  `,
  Title: styled.h1`
    font-weight: 600;
    font-size: 40px;
    letter-spacing: 0px;

    margin-bottom: 0px;
    margin-top: 0.25rem;
    padding-left: 16px;
    padding-right: 16px;
    max-width: 600px;
    overflow: hidden;
    text-align: center;
  `,
  NFTInfoContainer: styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 144px;
    height: 30px;
    border-radius: inherit;
  `,
  CoinLogo: styled.div`
    width: 25px;
    height: 25px;
    margin-right: 2px;
    img{
        width:100%;
        height:100%:
    }
  `,
  Price: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  `
};

const NFTInfoHeader = ({ nftTitle = '', floorPrice = 0 }) => {
  const { logoImage, bannerImage } = useGetImage(nftTitle);

  return (
    <div>
      <St.NFTDescriptionImageContainer>
        <div style={{ width: 'inherit', height: 'inherit' }} id="banner">
          <img src={bannerImage} alt="" />
        </div>
      </St.NFTDescriptionImageContainer>
      <St.NFTDescriptionContainer>
        <St.NFTLogoContainer>
          <St.NFTLogo>
            <img src={logoImage} alt="" />
          </St.NFTLogo>
        </St.NFTLogoContainer>
        <St.NFTTitleCotainer>
          <St.Title>{nftTitle}</St.Title>
        </St.NFTTitleCotainer>
        <St.NFTInfoContainer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <St.CoinLogo>
              <img src="https://static.opensea.io/tokens/KLAY.png" alt="" />
            </St.CoinLogo>
            <St.Price>
              <span> {floorPrice} </span>
            </St.Price>
          </div>
          <div style={{ textAlign: 'center' }}>floor price</div>
        </St.NFTInfoContainer>
      </St.NFTDescriptionContainer>
    </div>
  );
};

export default NFTInfoHeader;
