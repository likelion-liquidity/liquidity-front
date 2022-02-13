import NFTCard from 'components/common/NFTCard';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NFT_TOKEN_ARRAY } from 'lib/staticData';
import styled from 'styled-components';
const St = {
  CardContainer: styled.div`
      min-width 80vw;
      overflow : scroll;
      margin : 10px;
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

const NFTCardContainer = ({ selectedNftTokendId, handleOnClickNFT }) => {
  return (
    <St.CardContainer>
      <Container>
        <Row>
          {NFT_TOKEN_ARRAY?.map((nft, index) => {
            return (
              <Col xs={12} md={6} lg={4} key={`nft-card-${index}`}>
                <NFTCard
                  title={nft?.title}
                  nftTokenId={nft?.tokenId}
                  imageSrc={nft?.imageSrc}
                  selectedNftTokendId={selectedNftTokendId}
                  handleOnClickNFT={handleOnClickNFT}
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
