import axios from 'axios';
import i18n from 'i18next';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const client = axios.create({
  baseURL,
});

export const setLocaleLanguageHeader = lang => {
  client.defaults.headers.common['Accept-Language'] =
    lang === 'es' ? 'es-ES,es;q=0.9' : 'en-EN,en;q=0.9';
};

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
    if (response.data.status !== 'success') {
      return Promise.reject(
        new Error(response.data.error.message || 'Something went wrong!!'),
      );
    }

    return response.data.data;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default client;
