export const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
export const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
const authorization =
  'Basic ' +
  Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64');

const option = {
  headers: [
    {
      name: 'Authorization',
      value: authorization
    },
    { name: 'x-chain-id', value: '1001' }
  ]
};

const Caver = require('caver-js');
export const caver = new Caver(
  new Caver.providers.HttpProvider(
    'https://node-api.klaytnapi.com/v1/klaytn',
    option
  )
);
