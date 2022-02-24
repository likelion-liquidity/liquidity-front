import { NFTCard, Loading, EmptyCard } from 'components/common';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LENDING_ADDRESS } from 'lib/staticData';
//import useFetch from 'hooks/useFetch';
import styled from 'styled-components';
import {
  getTokenInfo,
  getEosTokenAddress,
  getNftContract
} from 'lib/api/UseTokenApi';

const St = {
  CardContainer: styled.div`
    width: 100%;
    overflow: auto;
    margin: 10px;
  `
};

// Nft {
//     owner: '0x88ab3cdbf31f856de69be569564b751a97ddf5d8',
//     previousOwner: '0x76c6b1f34562ed7a843786e1d7f57d0d7948a6f1',
//     tokenId: '0x7b',
//     tokenUri: 'https://game.example/item-id-8u5h2m.json',
//     transactionHash: '0x5f38d4bbb9a54550a9d070901ebdc714acdec67db34c658e5eb1ad6647b0f4d2',
//     createdAt: 1599110774,
//     updatedAt: 1599110780
// }
/* test */
// const MK_ADDRESS = '0x629cB3144C8F76C06Bb0f18baD90e4af32284E2C';

const NFTCardContainer = ({
  stakedNftList,
  whiteListNFTList,
  nftTitle,
  selectedNftTokendId,
  handleOnClickNFT,
  nftTokenArray,
  setNftTokenArray,
  isDisplayStaked = false
}) => {
  const [isLoading, setIsLoading] = useState(null);
  //const [nftTokenArray, setNftTokenArray] = useState(null);

  const getTokens = async () => {
    try {
      console.log('whiteListNFTList = ', whiteListNFTList);
      const [address] = await window.klaytn.enable();
      const selectedWhiteList = whiteListNFTList.find(
        (item) => item.name === nftTitle
      );
      console.log('selectedWhiteList ', selectedWhiteList);
      if (!selectedWhiteList) return;
      console.log(selectedWhiteList);

      setIsLoading(true);
      /* 내 어드레스 nft */
      const myAddressNftRes = await getEosTokenAddress(
        selectedWhiteList.address,
        address
      );
      /* lending nft */
      const lendingStakedNftListRes = await getEosTokenAddress(
        selectedWhiteList.address,
        LENDING_ADDRESS
      );

      const nftTokenArray = [
        ...myAddressNftRes.data.items,
        ...lendingStakedNftListRes.data.items
      ];

      setNftTokenArray(nftTokenArray);
      setIsLoading(false);
      // const res = await getTokenInfo(MK_ADDRESS, 'MK');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (whiteListNFTList?.length === 0) return;

    getTokens();
  }, [whiteListNFTList, nftTitle]);

  if (nftTokenArray?.length === 0 && isLoading === false) {
    return (
      <Container>
        <EmptyCard />
      </Container>
    );
  }
  console.log('isDisplayStaked= ', isDisplayStaked);
  return (
    <St.CardContainer>
      <Container>
        <Row>
          {nftTokenArray?.map((nft, index) => {
            const isStaked = stakedNftList?.find((nftStaked) => {
              const tokenId = parseInt(nft.tokenId, 16).toString();
              console.log('tokenId = ', tokenId);

              return nftStaked.nftTokenId === tokenId;
            });
            if (isDisplayStaked) {
              if (isStaked) {
                return (
                  <Col xs={12} md={4} lg={3} key={`nft-card-${index}`}>
                    <NFTCard
                      title={nftTitle}
                      nftTokenId={nft?.tokenId}
                      imageSrc={nft?.tokenUri}
                      selectedNftTokendId={selectedNftTokendId}
                      handleOnClickNFT={handleOnClickNFT}
                      isStaked={isStaked}
                    />
                  </Col>
                );
              }
              return <></>;
            }
            return (
              <Col xs={12} md={4} lg={3} key={`nft-card-${index}`}>
                <NFTCard
                  title={nftTitle}
                  nftTokenId={nft?.tokenId}
                  imageSrc={nft?.tokenUri}
                  selectedNftTokendId={selectedNftTokendId}
                  handleOnClickNFT={handleOnClickNFT}
                  isStaked={isStaked}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </St.CardContainer>
  );
};

export default NFTCardContainer;
