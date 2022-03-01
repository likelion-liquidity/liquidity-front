import styled from 'styled-components';
import palette from 'styles/palette';
import { Container, Row, Col } from 'react-bootstrap';

import Fade from 'react-reveal/Fade'; // Import react-reveal(Fade)

const St = {
  Section: styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    padding: 50px;
  `,

  InfoLi: styled.li`
    padding-left: 3rem;
    position: relative;
    font-size: 1.2rem;
    color: #9daab8;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  `,
  NumberSpan: styled.span`
    position: absolute;
    left: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    color: #082255;
    //background: #86f6f6;
    font-weight: 800;
    text-align: center;
  `,

  TeamUnitImage: styled.div``,
  TeamUl: styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0 auto;
  `,
  Wave: styled.div`
    .quan {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 3px solid rgb(246, 247, 248);
      box-shadow: 0 0 0 3px rgb(41, 134, 196);
    }

    .shui {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(23, 106, 201);
      border-radius: 50%;
      overflow: hidden;
    }
    .shui::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 150%;
      height: 150%;
      border-radius: 40%;
      background-color: rgb(240, 228, 228);
      animation: shi 5s linear infinite;
    }
    @keyframes shi {
      0% {
        transform: translate(-50%, -65%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -65%) rotate(360deg);
      }
    }
    .shui::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 150%;
      height: 150%;
      border-radius: 42%;
      background-color: rgb(240, 228, 228, 0.2);
      animation: xu 7s linear infinite;
    }
    @keyframes xu {
      0% {
        transform: translate(-50%, -60%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -60%) rotate(360deg);
      }
    }
  `
};
const index = () => {
  return (
    <div>
      <Fade bottom>
        <St.Section>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/logoLq.png" alt="logo" />
          </div>
          <h1 style={{ textAlign: 'center' }}> LIQUIDITY</h1>
          <div>NFT를 예치해서 가상화폐를 대출해보세요</div>
        </St.Section>
      </Fade>
      <Fade bottom>
        <St.Section>
          <Container>
            <Row>
              <Col xs={12} lg={6}>
                <h1 style={{ textAlign: 'center' }}>
                  <span>WHAT IS </span>
                  <strong style={{ color: palette.blue_9 }}>LIQIDITY</strong>?
                </h1>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '30px'
                  }}
                >
                  <St.Wave>
                    <div class="quan">
                      <div class="shui"></div>
                    </div>
                  </St.Wave>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div>
                  <h3>NFT를 이용한 랜딩 플랫폼</h3>
                </div>
                <ul>
                  <St.InfoLi>
                    <St.NumberSpan>1</St.NumberSpan>
                    유동성(현금화)이 낮은 NFT에 유동성을 부여하는 것을 목표
                    값비싼 NFT들은 마치 1주택자와 같이 가격이 오르더라도 손쉽게
                    매도를 감행할 수 있는 자산이 아닙니다
                  </St.InfoLi>
                  <St.InfoLi>
                    <St.NumberSpan>2</St.NumberSpan>
                    Liquidity는 이러한 NFT를 예치하여, 사용자가 원하는
                    퍼센티지만큼 NFT의 유동화를 도와줍니다. NFT 커뮤니티의 강성
                    홀더들은 Liquidity를 이용하여, 대출받은 유동화 토큰을 통해서
                    손쉽게 재투자를 할 수 있습니다.
                  </St.InfoLi>
                </ul>
              </Col>
            </Row>
          </Container>
        </St.Section>
      </Fade>
      <Fade bottom>
        <St.Section>
          <Container>
            <Row>
              <Col xs={12} lg={12}>
                <h1 style={{ textAlign: 'center' }}>
                  <span> Developer </span>
                </h1>
              </Col>
              <Col xs={12} lg={12}>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  <span>Back-end</span>
                </p>
                <St.TeamUl>
                  <li>
                    <div>
                      <img src="/images/logoLq.png" alt="logo" />
                    </div>
                    <p>Seoyeon Kim</p>
                  </li>
                  <li>
                    <div>
                      <img src="/images/logoLq.png" alt="logo" />
                    </div>
                    <p>Seoyeon Kim</p>
                  </li>
                  <li>
                    <div>
                      <img src="/images/logoLq.png" alt="logo" />
                    </div>
                    <p>Seoyeon Kim</p>
                  </li>
                </St.TeamUl>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  <span>Front-end</span>
                </p>
                <St.TeamUl>
                  <li>
                    <div>
                      <img src="/images/logoLq.png" alt="logo" />
                    </div>
                    <p>Seoyeon Kim</p>
                  </li>
                  <li>
                    <div>
                      <img src="/images/logoLq.png" alt="logo" />
                    </div>
                    <p>Seoyeon Kim</p>
                  </li>
                </St.TeamUl>
              </Col>
            </Row>
          </Container>
        </St.Section>
      </Fade>
      <Fade bottom>
        <St.Section>
          <Container>
            <Row>
              <Col xs={12} lg={6}>
                <h1>Q&A </h1>
              </Col>
            </Row>
          </Container>
        </St.Section>
      </Fade>
    </div>
  );
};

export default index;
