import Asset from 'components/common/Asset';
import Button from 'components/common/Button';
import { useState } from 'react';
import styled from 'styled-components';
import { DUMMY } from './Dummy';

const CT = {
  Container:styled.div`
  `,
  ContentViewContainer:styled.div`
    display:flex;
    flex-direction:column;
    height:500px;
  `,
  FilterContainer:styled.div`
    display:flex;
    margin-bottom:5px;
    justify-content:flex-end;
    font-size:15px;
  `,
  ContentViewHeaderContainer:styled.div`
  display:flex;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom:5px;
  border-radius:5px;
  padding:5px 15px;
  font-size:18px;
  font-weight:500;
  `,
  Th1:styled.div`
    width:50%;
    text-align:center;
    
  `,
  Th2:styled.div`width:17%`,
  Th3:styled.div`width:33%`,
  PaginationContainer:styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
  `
};

const ChkBox = styled.input`
  width:15px;
  height:15px;
`;

const Borrow = () => {
  const [pageN, setPageN] = useState(1);
  const [itemN, setItemN] = useState(DUMMY.length);
  const [checkStatus, setCheckStatus] = useState(false);

  const onClickPaginationBtn = num => {
    if(num < 1 || num > itemN/5+1) return;
    setPageN(num)
  };

  const renderPagination = () => {
    const result = [];
    result.push(<Button size="small" color="blue_6" onClick={()=>onClickPaginationBtn(pageN-1)}>{"<"}</Button>);
    for(let i = 0; i < itemN/5; i ++){
      result.push(<Button size="small" colorReverse={true} color={(i+1) === pageN ? "blue_4" : null} onClick={()=>onClickPaginationBtn(i+1)}>{i+1}</Button>)
    }
    result.push(<Button size="small" color="blue_6" onClick={()=>onClickPaginationBtn(pageN+1)}>{">"}</Button>);
    return result;
  };

  return (
    <CT.Container>
      <CT.FilterContainer>
        <ChkBox type="checkbox" onClick={() => setCheckStatus(true)} />
        내 자산 보기
      </CT.FilterContainer>
      <CT.ContentViewHeaderContainer>
        <CT.Th1>nft</CT.Th1>
        <CT.Th2>ltv</CT.Th2>
        <CT.Th3>floor price</CT.Th3>
      </CT.ContentViewHeaderContainer>
      <CT.ContentViewContainer>
        {DUMMY.map((e, index) => {
          if(index >= (pageN-1)*5 && index < 5*pageN){
            return (
              <Asset
               key={index}
               imgProps={e.imgProps}
               titleProps={e.titleProps}
               ltvProps={e.ltvProps}
               priceProps={e.priceProps}
              />
            );
          }
        })}
       </CT.ContentViewContainer>
       <CT.PaginationContainer>
         {renderPagination()}
       </CT.PaginationContainer>
    </CT.Container>
  );
};

export default Borrow;
