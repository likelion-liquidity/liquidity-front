import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import { Asset } from 'components/common';
import { DUMMY } from 'pages/Dummy';
import { Accordion, useAccordionButton } from 'react-bootstrap';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!')
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const NFTStakeListContainer = () => {
  return (
    <div>
      <Asset
        imgProps={DUMMY[0].imgProps}
        titleProps={DUMMY[0].titleProps}
        ltvProps={DUMMY[0].ltvProps}
        priceProps={DUMMY[0].priceProps}
        buttonProps={{ title: 'manage' }}
        width="100%"
        // handleOnClick={handleMoveStakeNFT}
      />

      <Accordion defaultActiveKey="0">
        <CustomToggle eventKey="0">Click me!</CustomToggle>
        <Accordion.Collapse eventKey="0">
          <NFTCardContainer />
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};
export default NFTStakeListContainer;
