import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addComma, divideByTenTo18Squares } from 'lib/helpers';

const St = {
  Wrapper: styled.div`
    width: 100%;
    margin: 25px 0 25px 0;
    border-radius: 10px;

    padding: 60px;
    display: flex;
    flex-direction: column;
  `,
  AssetsWrapper: styled.div`
    display: flex;
  `,
  AssetsContainer: styled.div`
    margin-left: ${(props) => `${props.marginLeft}px`};
    margin-right: 18px;
    color: black;
    width: 100%;
    box-shadow: rgb(0 0 0 / 12%) 11px 13px 30px -8px;
    border-radius: 22px;
    padding: 35px 40px;
    height: auto;
    display: grid;
    grid-template-rows: 30px 84px 1fr;
  `,
  LTVBarContainer: styled.div`
    margin: 20px 0 20px 0;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-start;
    button {
      margin-right: 11px;
    }
  `
};

const DisplayAssetCotainer = ({ title, value }) => {
  return (
    <St.AssetsContainer>
      <div>
        <span>{title}</span>

        <div style={{ display: 'flex' }}>
          <span>
            <h3>
              <span>$</span>
              <span>{value}</span>
            </h3>
          </span>
        </div>
      </div>
    </St.AssetsContainer>
  );
};
const TotalAssetsContainer = ({ stakedNftList, floorPrice }) => {
  const [collateralValue, setCollateralValue] = useState(0);
  const [borrowedValue, setBorrowedValue] = useState(0);

  useEffect(() => {
    if (!stakedNftList) return;
    let borrowedValue = 0;
    const hasOwnershipList = stakedNftList.filter((stakedNftInfo) => {
      if (stakedNftInfo.hasOwnership) {
        borrowedValue += parseFloat(stakedNftInfo.loanAmount);
      }
      return stakedNftInfo.hasOwnership;
    });
    setCollateralValue(hasOwnershipList.length * floorPrice);
    setBorrowedValue(borrowedValue);
  }, [stakedNftList, floorPrice]);

  return (
    <>
      <St.Wrapper>
        <St.AssetsWrapper>
          <DisplayAssetCotainer
            title={'Total Collateral Value'}
            value={addComma(divideByTenTo18Squares(collateralValue))}
          />
          <DisplayAssetCotainer
            title={'Total Borrowed Value'}
            value={addComma(divideByTenTo18Squares(borrowedValue))}
          />
        </St.AssetsWrapper>

        {/* <St.LTVBarContainer>
          <LTVBar
            collateralValue={collateralValue}
            borrowedValue={borrowedValue}
          />
        </St.LTVBarContainer> */}

        {/* <St.ButtonContainer>
          <Button
            id="borrow"
            onClick={handleOnClick}
            color="blue_4"
            width="140px"
          >
            Borrow
          </Button>
          <Button
            id="repay"
            onClick={handleOnClick}
            color="blue_4"
            width="140px"
          >
            Repay
          </Button>
        </St.ButtonContainer> */}
      </St.Wrapper>
    </>
  );
};

export default TotalAssetsContainer;
