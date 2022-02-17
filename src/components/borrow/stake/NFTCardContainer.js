import NFTCard from 'components/common/NftCard';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NFT_TOKEN_ARRAY, NFT_STAKED_LIST } from 'lib/staticData';
import styled from 'styled-components';
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

const NFTCardContainer = ({
  selectedNftTokendId,
  handleOnClickNFT,
  isDisplayStaked = false
}) => {
  return (
    <St.CardContainer>
      <Container>
        <Row>
          {NFT_TOKEN_ARRAY?.map((nft, index) => {
            const isStaked = NFT_STAKED_LIST.find(
              (nftStaked) => nftStaked.tokenId === nft.tokenId
            );
            if (isDisplayStaked) {
              if (isStaked) {
                return (
                  <Col xs={12} md={4} lg={3} key={`nft-card-${index}`}>
                    <NFTCard
                      title={nft?.title}
                      nftTokenId={nft?.tokenId}
                      imageSrc={nft?.imageSrc}
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
                  title={nft?.title}
                  nftTokenId={nft?.tokenId}
                  imageSrc={nft?.imageSrc}
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
