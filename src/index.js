// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './config/i18n';
import storage from './utils/storage';
import { configureClient, setLocaleLanguageHeader } from './api/client';

import App, { Root } from './components/App';
import './index.css';
import configureStore from './store';

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
};

configureClient(auth.tokenJWT);
setLocaleLanguageHeader('es');
// console.log('auth en index:', auth);
//
// const logueado = auth.tokenJWT ? !!auth.tokenJWT : false;
// console.log('logueado:', logueado);
const preloadedState = {
  auth: {
    isLogged: !!auth.tokenJWT,
    currentUsername: auth.username,
    currentEmail: auth.userEmail,
  },
};
const history = createBrowserHistory();
//
// console.log('history:', history);
// console.log('preloadedState:', preloadedState);

const store = configureStore(preloadedState, { history });

// console.log('getState:', store.getState());

const render = () => {
  ReactDOM.render(
    <Suspense fallback="Cargando...">
      <Root store={store} history={history}>
        <App />
      </Root>
    </Suspense>,
    document.getElementById('root'),
  );
};

render();
