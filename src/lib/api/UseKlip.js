import axios from 'axios';

const A2A_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const APP_NAME = 'LIQUIDITY';

export const executeContract = (
  txTo,
  functionJSON,
  value,
  params,
  setQrvalue,
  callback
) => {
  axios
    .post(A2A_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME
      },
      type: 'execute_contract',
      transaction: {
        to: txTo,
        abi: functionJSON,
        value: value,
        params: params
      }
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              //console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};

export const getAddress = (setQrvalue, callback) => {
  axios
    .post(A2A_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME
      },
      type: 'auth'
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              //console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result.klaytn_address);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};
