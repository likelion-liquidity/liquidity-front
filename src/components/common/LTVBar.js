/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';
import { addComma } from 'lib/helpers';

const St = {
  LTVBarWrapper: styled.div`
    height: 15px;
    width: 100%;
    margin: 15px 0 15px 0;
  `,
  LTVBarOuter: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: grey;
    border-radius: 20px;
  `,
  LTVBarInner: styled.div`
    position: absolute;
    width: ${(props) => props.ltvCurrentPosition}%;
    height: 100%;
    background-color: ${palette.blue_6};
    border-radius: 20px;
  `,
  FigureContainer: styled.div`
    position: relative;
    height: 20px;
    span {
      position: absolute;
      transition: transform 500ms ease-in-out 0s;
    }
  `,
  LtvPercentInfoOuter: styled.span`
    transform: ${(props) => `translateX(${props.ltvWidth}px);`};
  `,
  LtvPercentInfoInner: styled.span`
    transform: translateX(-100%);
    display: inline-block;
    font-size: 12px;
    font-weight: 300;
  `
};

const LTVBar = ({
  collateralValue = 0, // 담보가치
  borrowedValue = 0, //빌린 금액
  repayAmount = 0,
  maxLtv = 45,
  liqLtv = 60
}) => {
  const value = 100 / liqLtv;
  const [ltvCurrentPosition, setLtvCurrentPosition] = useState(0);
  const [ltvCurrentPositionWidth, setLtvCurrentPositionWidth] = useState(0);
  const [ltv45Width, setLtv45Width] = useState(0); //maxLtv
  const [ltv60Width, setLtv60Width] = useState(0); //liqLtv
  const ltvbarRef = useRef(null);

  const getOuterSize = () => {
    if (!ltvbarRef.current) return;
    const ltvBarElementWidth = ltvbarRef.current.offsetWidth;
    setLtvCurrentPositionWidth(
      ltvBarElementWidth * ((ltvCurrentPosition * value) / 100)
    );
    setLtv45Width(ltvBarElementWidth * ((maxLtv * value) / 100));
    setLtv60Width(ltvBarElementWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', getOuterSize);
    return () => {
      window.removeEventListener('resize', getOuterSize);
    };
  }, [ltvCurrentPosition, ltvbarRef, getOuterSize]);

  useEffect(() => {
    setLtvCurrentPosition(
      parseFloat(((borrowedValue / collateralValue) * 100).toFixed(2))
    );
    getOuterSize();
  }, [collateralValue, borrowedValue, getOuterSize]);

  return (
    <St.LTVBarWrapper>
      <St.FigureContainer>
        <span>LTV</span>
        <St.LtvPercentInfoOuter ltvWidth={ltvCurrentPositionWidth}>
          <St.LtvPercentInfoInner>
            {addComma(ltvCurrentPosition)}%
          </St.LtvPercentInfoInner>
        </St.LtvPercentInfoOuter>
        <St.LtvPercentInfoOuter ltvWidth={ltv45Width}>
          <St.LtvPercentInfoInner>{`${maxLtv}%`}</St.LtvPercentInfoInner>
        </St.LtvPercentInfoOuter>
        <St.LtvPercentInfoOuter ltvWidth={ltv60Width}>
          <St.LtvPercentInfoInner>{`${liqLtv}%`}</St.LtvPercentInfoInner>
        </St.LtvPercentInfoOuter>
      </St.FigureContainer>
      <St.LTVBarOuter id="ltv-outer" ref={ltvbarRef}>
        <St.LTVBarInner ltvCurrentPosition={(ltvCurrentPosition / 60) * 100} />
      </St.LTVBarOuter>
    </St.LTVBarWrapper>
  );
};

export default LTVBar;
