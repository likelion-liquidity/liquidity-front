import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';
import palette from 'styles/palette';
import LazyImage from 'components/common/LazyImage';

const St = {
  ArticleWrapper: styled.div`
    width: 100%;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;

    .article-wrapper:hover {
      box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.2);
    }
    cursor: pointer; ;
  `,
  Article: styled.div`
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.5s;
    will-change: transform;
    border: ${(props) =>
      props.isSelected ? `2px solid ${palette.blue_4}` : ''};
  `,

  ArticleThumbnail: styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    display: block;
    overflow: hidden;
    background: #000000;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    img {
      background: #dee2e6;
      object-fit: cover;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.5s ease-in-out;
    }
    img:hover {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      opacity: 0.5;
      transform: scale(1.15);
    }
  `,
  ContentNewBadge: styled.div`
    padding: 1em;
    color: #fcc419;
  `,
  ContentWrapper: styled.div`
    padding: 10px;
  `,
  ContentHeader: styled.div`
    position: relative;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e9ecef;
  `,
  ContentTitle: styled.div`
    color: rgb(138, 147, 155);
    text-align: center;
    font-size: 25px;
    display: block;
  `,
  CotentTokenId: styled.div``,

  ContentBody: styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.5rem;
    height: 2.5rem;
    overflow-y: hidden;
    word-break: break-all;
    color: #4c657d;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  ArticleFooter: styled.div`
    cursor: pointer;
    overflow: hidden;
    color: red;
    padding: 5px 5px 10px 5px;
  `
};
const NFTCard = ({
  title,
  nftTokenId,
  imageSrc,
  selectedNftTokendId,
  handleOnClickNFT,
  isStaked
}) => {
  const [isSelected, setIsSelected] = useState('');

  useEffect(() => {
    if (nftTokenId === selectedNftTokendId) setIsSelected(true);
    else if (nftTokenId !== selectedNftTokendId) setIsSelected(false);
  }, [nftTokenId, selectedNftTokendId]);

  const cardSelect = () => {
    if (isSelected) {
      handleOnClickNFT('');
      return;
    }
    handleOnClickNFT(nftTokenId);
  };

  return (
    <St.ArticleWrapper onClick={cardSelect}>
      <St.Article isSelected={isSelected}>
        <div className="article-header">
          <St.ArticleThumbnail>
            <LazyImage src={imageSrc} />
          </St.ArticleThumbnail>
        </div>
        <div>
          <St.ContentWrapper>
            {isStaked ? (
              <Badge bg="info">Staked</Badge>
            ) : (
              <Badge bg="secondary">Not staked</Badge>
            )}
            <St.ContentHeader>
              <St.ContentTitle>{title}</St.ContentTitle>
            </St.ContentHeader>
            <St.ContentBody>{nftTokenId}</St.ContentBody>
          </St.ContentWrapper>
        </div>
      </St.Article>
    </St.ArticleWrapper>
  );
};

export default React.memo(NFTCard);
