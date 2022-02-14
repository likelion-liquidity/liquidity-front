import styled from 'styled-components';

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
    display: flex;
    justify-content: center;
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

const NFTInfoHeader = () => {
  return (
    <div>
      <St.NFTDescriptionImageContainer>
        <div style={{ width: 'inherit', height: 'inherit' }} id="banner">
          <img
            src="https://lh3.googleusercontent.com/LkkMZIONLcKnqkzI-J17FZlXBkmnmDH2unCJ6o_blsjrRvINYJ7XySH7wg3xsJ78WTyQpGhgqWSCt5ytQkfE67M-Cyfy4xlXuqjQW4Y=h600"
            alt=""
          />
        </div>
      </St.NFTDescriptionImageContainer>
      <St.NFTDescriptionContainer>
        <St.NFTLogoContainer>
          <St.NFTLogo>
            <img
              src="https://lh3.googleusercontent.com/AX_uuKN-OFhtHXtzw5PJ3K-bGW5tg2svacBEv8xO_ii3UCEo6UTjqec4MiXFGP3gsxPD-p-W0d315pEvIOxG3pKNWfT3G8KvAgIl=s130"
              alt=""
            />
          </St.NFTLogo>
        </St.NFTLogoContainer>
        <St.NFTTitleCotainer>
          <St.Title>META-KONGS</St.Title>
        </St.NFTTitleCotainer>
        <St.NFTInfoContainer>
          <St.CoinLogo>
            <img src="https://static.opensea.io/tokens/KLAY.png" alt="" />
          </St.CoinLogo>
          <St.Price>
            <span> 8,300 </span>
          </St.Price>
        </St.NFTInfoContainer>
      </St.NFTDescriptionContainer>
    </div>
  );
};

export default NFTInfoHeader;
