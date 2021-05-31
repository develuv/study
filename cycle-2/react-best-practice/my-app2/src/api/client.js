import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'https://api.instantwebtools.net';

// 인터셉터 설정
client.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.info(error.config);
    return Promise.reject(error);
  },
);

export default client;
