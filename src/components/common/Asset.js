import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'styles/palette';
import Button from './Button';

const getAssetColor = (color, colorReverse) => {
  if (colorReverse) {
    switch (color) {
      default:
        return css`
          color: ${palette.black};
          background-color: ${palette.blue_0};
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

const CT = {
  Container:styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 3px 25px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom:15px;
  box-shadow: rgb(0 0 0 / 12%) 11px 13px 30px -8px;
  width: ${(props) => props.width};
  ${(props) => getAssetColor(props.color || '', props.colorReverse)};
  ${(props) => getAssetSize(props.size)}
  `,
  ImageContainer:styled.div`width:18%;`,
  TitleContainer:styled.div`width:32%;`,
  LtvContainer:styled.div`width:17%;`,
  PriceContainer:styled.div`width:17%;`,
  ButtonContainer:styled.div`width:16%;`
};

const Image = styled.img`
  width:75px;
  height:75px;
  border-radius:50%; 
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

const Asset = ({
  color,
  size,
  width="650px",
  colorReverse = true,
  imgProps=null,
  titleProps=null,
  ltvProps=null,
  priceProps=null,
  ...props
}) => {
  return (
    <CT.Container
      {...props}
      color={color}
      size={size}
      width={width}
      colorReverse={colorReverse}
    >
      {imgProps ? <CT.ImageContainer><Image src={imgProps.src} alt={imgProps.alt} /></CT.ImageContainer> : null}
      {titleProps ? <CT.TitleContainer>{titleProps.title}</CT.TitleContainer> : null}
      {ltvProps ? <CT.LtvContainer>{ltvProps.ltv}</CT.LtvContainer>  : null}
      {priceProps ? <CT.PriceContainer>{priceProps.price}</CT.PriceContainer>  : null}
      <CT.ButtonContainer><Button color="blue_4" onClick={()=>alert("test")}>Borrow</Button></CT.ButtonContainer>
    </CT.Container>
  );
};

export default React.memo(Asset);
