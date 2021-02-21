import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;
const client = axios.create({
  baseURL,
});

export const setAuthorizationHeader = token => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

export const configureClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

client.interceptors.response.use(response => response.data);

export default client;
