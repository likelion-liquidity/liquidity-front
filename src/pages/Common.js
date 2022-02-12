import NFTCardContainer from 'components/borrow/stake/NFTCardContainer';
import NFTInfoHeader from 'components/borrow/stake/NFTInfoHeader';
import NFTDiscriptionContainer from 'components/borrow/stake/NFTDiscriptionContainer';

const CommonTestPage = () => {
  return (
    <div>
      <NFTInfoHeader />
      <NFTCardContainer />
      <NFTDiscriptionContainer />
    </div>
  );
};

export default CommonTestPage;
