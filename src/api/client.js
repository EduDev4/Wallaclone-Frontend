import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL,
});

export const setAuthorizationHeader = token => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

// TODO: client.login

// TODO: client.logout

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
