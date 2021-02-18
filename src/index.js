// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import storage from './utils/storage';
import { configureClient } from './api/client';

import configureStore from './store';

import App, { Root } from './components/App';
import './index.css';

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
};

configureClient(auth.tokenJWT);

const render = () => {
  const history = createBrowserHistory();
  const store = configureStore({ history });

  ReactDOM.render(
    <Root store={store} history={history}>
      <App initiallyLoggedUser={!!auth.username} />
    </Root>,
    document.getElementById('root'),
  );
};

render();
