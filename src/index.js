// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import configureStore from './store';

import App, { Root } from './components/App';

import './index.css';

const render = () => {
  const history = createBrowserHistory();
  const store = configureStore({ history });

  ReactDOM.render(
    <Root store={store} history={history}>
      <App />
    </Root>,
    document.getElementById('root'),
  );
};

render();
