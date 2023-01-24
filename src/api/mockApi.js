import axios from 'axios';

// const FakeServer = 'https://skip-select.s3.amazonaws.com';
const FakeServer = 'https://skip-select-server.herokuapp.com';

export const get = async (url) => {
  const resp = await axios.get(`${FakeServer}/${url}`);
  return resp.data;
};

export const add = async (url, data) => {
  return await axios.post(`${FakeServer}/${url}`, data);
};

export const update = async (url, id, data) => {
  return await axios.put(`${FakeServer}/${url}/${id}`, data);
};

export const remove = async (url, id) => {
  return await axios.delete(`${FakeServer}/${url}/${id}`);
};
