import NftCard from 'components/common/NftCard';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const St = {
  CardContainer: styled.div`
      min-width 80vw;
      overflow : scroll;
      margin : 10px;
    `
};

const NFTCardContainer = () => {
  return (
    <St.CardContainer>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
          <Col xs={12} md={4}>
            <NftCard />
          </Col>
        </Row>
      </Container>
    </St.CardContainer>
  );
};

export default NFTCardContainer;
