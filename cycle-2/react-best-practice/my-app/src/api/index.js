import axios from 'axios';

export const getUsers = (page = 0) => {
  return axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`);
}