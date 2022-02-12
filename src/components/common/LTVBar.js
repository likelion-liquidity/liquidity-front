import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';
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
    width: 44.2%;
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

const value = 100 / 60;
const LTVBar = () => {
  const [ltv45Width, setLtv45Width] = useState(0);
  const [ltv60Width, setLtv60Width] = useState(0);
  const ltvbarRef = useRef();

  const getOuterSize = () => {
    if (!ltvbarRef.current) return;
    setLtv45Width(ltvbarRef.current.offsetWidth * ((45 * value) / 100));
    setLtv60Width(ltvbarRef.current.offsetWidth);
  };

  useEffect(() => {
    getOuterSize();
    window.addEventListener('resize', getOuterSize);

    return () => {
      window.removeEventListener('resize', getOuterSize);
    };
  }, []);

  return (
    <St.LTVBarWrapper>
      <St.FigureContainer>
        <span>LTV</span>
        <St.LtvPercentInfoOuter ltvWidth={ltv45Width}>
          <St.LtvPercentInfoInner>45%</St.LtvPercentInfoInner>
        </St.LtvPercentInfoOuter>
        <St.LtvPercentInfoOuter ltvWidth={ltv60Width}>
          <St.LtvPercentInfoInner>65%</St.LtvPercentInfoInner>
        </St.LtvPercentInfoOuter>
      </St.FigureContainer>
      <St.LTVBarOuter id="ltv-outer" ref={ltvbarRef}>
        <St.LTVBarInner />
      </St.LTVBarOuter>
    </St.LTVBarWrapper>
  );
};

export default LTVBar;
