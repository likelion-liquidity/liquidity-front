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
  return paths[paths.length - 1];
};
