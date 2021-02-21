// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import storage from './utils/storage';
import { configureClient } from './api/client';

import App, { Root } from './components/App';
import './index.css';
import configureStore from './store';

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
};

configureClient(auth.tokenJWT);
console.log('auth en index:', auth);

const logueado = auth.tokenJWT ? !!auth.tokenJWT : false;
console.log('logueado:', logueado);
const store = configureStore({
  auth: {
    isLogged: !!auth.tokenJWT,
    currentUsername: auth.username,
    currentEmail: auth.userEmail,
  },
});
console.log('getState:', store.getState());

const render = () => {
  ReactDOM.render(
    <Root store={store}>
      <App />
    </Root>,
    document.getElementById('root'),
  );
};

render();
