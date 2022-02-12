import styled from 'styled-components';

const St = {
  NFTDescriptionImageContainer: styled.div`
    height: 200px;
    background-color: black;
    width: 100%;
  `,

  NFTDescriptionContainer: styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    flex-direction: column;
  `,
  NFTLogoContainer: styled.div`
    margin-top: -64px;
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
  `
};

const NFTInfoHeader = () => {
  return (
    <div>
      <St.NFTDescriptionImageContainer></St.NFTDescriptionImageContainer>
      <St.NFTDescriptionContainer>
        <St.NFTLogoContainer>
          <St.NFTLogo>
            <img
              src="https://lh3.googleusercontent.com/QJgoaGpc1G1Diea0vFP7JImvBF8F7OczTxdhHMUR1F439HNUooSdQxMhvRGwCPcFjJg9iERKqk4Lvz7qzxqBzQhqMKW925mPxKyJ=s130"
              alt=""
            />
          </St.NFTLogo>
        </St.NFTLogoContainer>
        <St.NFTTitleCotainer>
          <St.Title>klay City</St.Title>
        </St.NFTTitleCotainer>

        <h3>price 6000 </h3>
      </St.NFTDescriptionContainer>
    </div>
  );
};

export default NFTInfoHeader;
