import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'styles/palette';
import Button from './Button';
import useGetImage from 'hooks/useGetImage';

const getAssetColor = (color, colorReverse) => {
  if (colorReverse) {
    switch (color) {
      default:
        return css`
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

const getAssetSize = (size) => {
  switch (size) {
    default:
      return css`
        height: 95px;
      `;
  }
};

const St = {
  Container: styled.div`
    display: flex;
    align-items: center;
    height: 48px;
    padding: 3px 25px;
    font-size: 15px;
    font-weight: 500;
    box-shadow: rgb(0 0 0 / 12%) 11px 13px 30px -8px;
    width: ${(props) => props.width};
    ${(props) => getAssetColor(props.color || '', props.colorReverse)};
    ${(props) => getAssetSize(props.size)}
  `,
  ImageContainer: styled.div`
    border: none;
    width: 18%;
  `,
  TitleContainer: styled.div`
    width: 27%;
  `,
  LtvContainer: styled.div`
    width: 17%;
  `,
  PriceContainer: styled.div`
    width: 17%;
  `,
  ButtonContainer: styled.div`
    width: 21%;
  `
};

const Image = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;

const Asset = ({
  color,
  size,
  width = '850px',
  colorReverse = true,
  imgProps = null,
  titleProps = null,
  ltvProps = null,
  priceProps = null,
  buttonProps = null,
  ...props
}) => {
  const { logoImage } = useGetImage(titleProps.title);

  return (
    <St.Container
      {...props}
      color={color}
      size={size}
      width={width}
      colorReverse={colorReverse}
    >
      {logoImage && (
        <St.ImageContainer>
          <Image src={logoImage} alt={''} />
        </St.ImageContainer>
      )}
      {titleProps && <St.TitleContainer>{titleProps.title}</St.TitleContainer>}
      {ltvProps && <St.LtvContainer>{ltvProps.ltv}</St.LtvContainer>}
      {priceProps && <St.PriceContainer>{priceProps.price}</St.PriceContainer>}
      <St.ButtonContainer>
        {buttonProps && (
          <Button
            color="blue_4"
            onClick={() => buttonProps.handleOnClick(titleProps?.title)}
          >
            {buttonProps.title ? buttonProps.title : 'Stake & Borrow'}
          </Button>
        )}
      </St.ButtonContainer>
    </St.Container>
  );
};

export default React.memo(Asset);
