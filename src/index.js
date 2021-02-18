// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import storage from './utils/storage';
import { configureClient } from './api/client';

import App, { Root } from './components/App';
import './index.css';

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
};

configureClient(auth.tokenJWT);

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App initiallyLoggedUser={!!auth.username} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

render();
