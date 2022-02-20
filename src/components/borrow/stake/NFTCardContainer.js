import NFTCard from 'components/common/NftCard';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NFT_TOKEN_ARRAY, NFT_STAKED_LIST } from 'lib/staticData';

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
  whiteListNFTList,
  nftTitle,
  selectedNftTokendId,
  handleOnClickNFT,
  isDisplayStaked = false
}) => {
  const [nftTokenArray, setNftTokenArray] = useState();

  const getTokens = async () => {
    try {
      const [address] = await window.klaytn.enable();
      const selectedWhiteList = whiteListNFTList.find(
        (item) => item.name === nftTitle
      );
      console.log(selectedWhiteList);
      if (!selectedWhiteList) return;
      console.log(selectedWhiteList);
      const res = await getEosTokenAddress(selectedWhiteList.address, address);
      console.log('res = ', res.data);
      const { items } = res.data;
      setNftTokenArray(items);
      // const res = await getTokenInfo(MK_ADDRESS, 'MK');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (whiteListNFTList?.length === 0) return;

    getTokens();
  }, [whiteListNFTList, nftTitle]);

  return (
    <St.CardContainer>
      <Container>
        <Row>
          {nftTokenArray?.map((nft, index) => {
            const isStaked = NFT_STAKED_LIST.find(
              (nftStaked) => nftStaked.tokenId === nft.tokenId
            );
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
