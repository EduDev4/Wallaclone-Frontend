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

client.interceptors.response.use(
  response => {
    // TODO: observar respuesta del api y devolver datos
    // Example:
    // if (response.status === 204) return 'deleted success';
    // return response.data.data;
  },
  error => {
    // TODO: observar respuesta si hay error y devolver datos
    //  Example:
    //  if (error.response) {
    //    return Promise.reject(error.response.data);
    //  }
    //  return Promise.reject(error);
  },
);
export default client;
