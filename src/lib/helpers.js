export const getKlaytnProvider = () => {
  if (typeof window.klaytn !== 'undefined') {
    return window['klaytn'];
  }
  Error('failed connecting to Kaikas');
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
