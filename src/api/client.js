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

// client.interceptors.response.use(response => response.data);

client.interceptors.response.use(
  response => {
    // TODO: observar respuesta del api y devolver datos
    if (response.data.status !== 'success') {
      return Promise.reject(
        new Error(response.data.error.message || 'Something went wrong!!'),
      );
    }

    return response.data.data;
  },
  error => {
    // TODO: observar respuesta si hay error y devolver datos
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default client;
