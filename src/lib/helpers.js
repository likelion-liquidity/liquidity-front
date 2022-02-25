export const getKlaytnProvider = () => {
  if (typeof window.klaytn !== 'undefined') {
    return window['klaytn'];
  }
  Error('failed connecting to Kaikas');
};

export const clearAccountInfo = (setAccount) => {
  setAccount({
    txType: null,
    account: '',
    balance: 0,
    network: null
  });
};

/**
 * 콤마를 추가한다.
 * @returns add comma number
 */
export const addComma = (num) => {
  if (num) {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }
  return '0';
};

/**
 * 최상단으로 스크롤을 올린다.
 * @returns void
 */
export const handleScrollTop = (smooth = false) => {
  if (smooth) {
    if (document) window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    return;
  }
  if (document) window.scroll(0, 0);
};

export const getPathName = (pathname) => {
  if (!pathname) return;
  const paths = pathname.split('/');
  console.log('paths  = ', paths);
  return paths[paths.length - 1];
};

export const tenTo18Squares = (v) => {
  return v * 10 ** 18;
};

export const divideByTenTo18Squares = (v) => {
  if (!v) return 0;
  return Math.round(v / 10 ** 18);
};

export const hexToNumberString = (hex) => {
  const parseNumber = parseInt(hex, 16).toString();
  return divideByTenTo18Squares(parseNumber);
};
//true이면 stake and borrow 할 수 있는 상태
// export const checkNftOktoGo = async(stakedNftList, tokenId) =>{
//   const address = window.klaytn.selectedAddress;

//   const tempMap = _.map(stakedNftList, function(o) {
//       if (o.nftTokenId === tokenId) return o;
//   });
//   const checkA = tempMap.loanAmount == 0? true: false;

//   const tempAddress = nftContractInstance.ownerOf(tokenId);
//   const checkB = tempAddress == address? true: false;
//   return  checkA && checkB;
// }
