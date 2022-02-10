export const getKlaytnProvider = () => {
  if (typeof window.klaytn !== 'undefined') {
    return window['klaytn'];
  }
  Error('failed connecting to Kaikas');
};
