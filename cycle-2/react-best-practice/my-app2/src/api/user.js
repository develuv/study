import client from './client';

export const getUsers = (index = 0) => {
  return client.get(`/v1/passenger?page=${index}&size=10`);
}

export const getUser = (id) => {
  return client.get(`/v1/passenger/${id}`);
}