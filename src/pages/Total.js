import TotalAssetsContainer from 'components/borrow/total/TotalAssetsContainer';
import NFTStakeListContainer from 'components/borrow/total/NFTStakeListContainer';
import NFTInfoContainer from 'components/borrow/stake/NFTInfoHeader';
const Total = () => {
  return (
    <>
      <div>
        <NFTInfoContainer />
        <TotalAssetsContainer />
        <NFTStakeListContainer />
      </div>
    </>
  );
};

export default Total;
