import Axios from 'axios';
/* 테스트 용 accsee, secret */
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
const authorization =
  'Basic ' +
  Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64');
const axios = Axios.create({
  baseURL: 'https://kip17-api.klaytnapi.com/',

  headers: {
    Authorization: authorization,
    'x-chain-id': process.env.REACT_APP_MODE === 'production' ? '8217' : '1001'
  },

  timeout: 3000
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    /*
      http status가 200인 경우
      응답 바로 직전에 대해 작성합니다.
      .then() 으로 이어집니다.
    */

    const errorCodes = [
      { key: 'INVALID_REQUEST_FORMAT', code: '1000' },
      { key: 'REQUEST_DEFICIENT', code: '1001' },
      { key: 'REQUEST_NOT_SUPPORT', code: '1002' },
      { key: 'DATABASE_CONNECT', code: '3000' },
      { key: 'UNKNOWN_FAILURE_LOGIN', code: '4000' },
      { key: 'INVALID_USER', code: '4001' },
      { key: 'FAILURE_USER_AUTH', code: '4002' },
      { key: 'NOT_EXIST_THE_USER_ROLES', code: '4003' },
      { key: 'BAD_CREDENTIAL', code: '4004' },
      { key: 'ACCOUNT_DISABLED', code: '4005' },
      { key: 'CREDENTIAL_EXPIRED', code: '4006' },
      { key: 'INVALID_TOKEN', code: '4007' },
      { key: 'ACCESS_DENIED', code: '4008' },
      { key: 'DUPLICATED_USER', code: '4009' },
      { key: 'INTERNAL_ERROR', code: '9000' }
    ];

    // console.log('[masonms] interceptors response config: ', response);
    return Promise.resolve(response);
  },

  (error) => {
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.
    */
    // console.log('[masonms] interceptors response error: ', error);

    return Promise.reject(error);
  }
);

export default axios;
