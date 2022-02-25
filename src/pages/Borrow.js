import Asset from 'components/common/Asset';
import Button from 'components/common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import palette from 'styles/palette';

const St = {
  Container: styled.div``,
  ContentViewContainer: styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    margin-bottom: 20px;
  `,
  FilterContainer: styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 5px;
    justify-content: flex-end;
    font-size: 15px;
  `,
  ContentViewHeaderContainer: styled.div`
    display: flex;
    background-color: ${palette.blue_1};
    box-shadow: rgb(0 0 0 / 12%) 11px 13px 30px -8px;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 18px;
    font-weight: 500;
    width: 850px;
  `,
  Th1: styled.div`
    width: 45%;
    text-align: center;
  `,
  Th2: styled.div`
    width: 16%;
  `,
  Th3: styled.div`
    width: 39%;
  `,
  PaginationContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ChkBox: styled.input`
    width: 20px;
    height: 20px;
  `,
  Text: styled.div`
    margin-left: 5px;
  `
};

const Borrow = ({ whiteListNFTList }) => {
  const [checkStatus, setCheckStatus] = useState(false);
  const [pageN, setPageN] = useState(1);

  let skipCount = 0;

  const navigate = useNavigate();
  const onClickPaginationBtn = (num) => {
    if (num < 1 || num > whiteListNFTList.length / 5 + 1) return;
    setPageN(num);
  };

  const renderPagination = () => {
    if (whiteListNFTList.length === 0) return;
    const result = [];
    result.push(
      <Button
        size="small"
        color="blue_6"
        onClick={() => onClickPaginationBtn(pageN - 1)}
      >
        {'<'}
      </Button>
    );
    for (let i = 0; i < whiteListNFTList.length / 5; i++) {
      result.push(
        <Button
          size="small"
          colorReverse={true}
          color={i + 1 === pageN ? 'blue_4' : null}
          onClick={() => onClickPaginationBtn(i + 1)}
        >
          {i + 1}
        </Button>
      );
    }
    result.push(
      <Button
        size="small"
        color="blue_6"
        onClick={() => onClickPaginationBtn(pageN + 1)}
      >
        {'>'}
      </Button>
    );
    return result;
  };

  const handleMoveStakeNFT = (title, isStaked) => {
    isStaked ? navigate(`/manage/${title}`) : navigate(`/borrow/${title}`);
  };

  const onClickCheckBox = () => {
    setCheckStatus(!checkStatus);
    setPageN(1);
    skipCount = 0;
  };

  return (
    <St.Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Borrow</h1>
      </div>
      <St.FilterContainer>
        <St.ChkBox type="checkbox" onClick={() => onClickCheckBox()} />
        <St.Text>My Assets</St.Text>
      </St.FilterContainer>
      <St.ContentViewHeaderContainer>
        <St.Th1>nft</St.Th1>
        <St.Th2>ltv</St.Th2>
        <St.Th3>floor price</St.Th3>
      </St.ContentViewHeaderContainer>
      <St.ContentViewContainer>
        {whiteListNFTList?.map((e, index) => {
          if (checkStatus && !e.isOwned && !e.isStaked) {
            skipCount++;
            return;
          }
          if (
            index - skipCount >= (pageN - 1) * 5 &&
            index - skipCount < 5 * pageN
          ) {
            return (
              <Asset
                key={`asstes-${index}`}
                imgProps={{ src: '', alt: '' }}
                titleProps={{ title: e.name }}
                ltvProps={{ ltv: `${e.liqLtv}` }}
                priceProps={{
                  price: `${e.floorPrice}`
                }}
                buttonProps={{
                  handleOnClick: () => handleMoveStakeNFT(e.name, e.isStaked),
                  title: e.isStaked ? 'Open Manage' : null
                }}
              />
            );
          }
        })}
      </St.ContentViewContainer>
      {whiteListNFTList ? (
        <St.PaginationContainer>{renderPagination()}</St.PaginationContainer>
      ) : null}
    </St.Container>
  );
};

export default Borrow;
