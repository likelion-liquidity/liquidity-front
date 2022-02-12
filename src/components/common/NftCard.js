import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import LazyImage from 'components/common/LazyImage';

const St = {
  ArticleWrapper: styled.div`
    width: 100%;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;

    .article-wrapper:hover {
      box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.2);
    }
  `,
  Article: styled.div`
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.5s;
    will-change: transform;
  `,

  ArticleThumbnail: styled.a`
    width: 100%;
    padding-top: 75.63%;
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
    height: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;
  `,
  ContentTitle: styled.div`
    font-size: 25px;
  `,

  ContentBody: styled.div`
    margin-top: 1.5rem;
    margin-bottom: 3.5rem;
    line-height: 1.5rem;
    height: 4.5rem;
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
const NftCard = ({ title, nftTokenId }) => {
  return (
    <St.ArticleWrapper>
      <St.Article>
        <div className="article-header">
          <a>
            <St.ArticleThumbnail>
              <LazyImage />
            </St.ArticleThumbnail>
          </a>
        </div>

        <div>
          <St.ContentWrapper>
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

export default NftCard;
