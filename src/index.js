// TODO: Crear logo del proyecto, favicon y sustituir por el de CRA

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App, { Root } from './components/App';

import './index.css';

const render = () => {
  const history = createBrowserHistory();

  // TODO: Crear store, importar configure store de redux
  // const store = {};

  // TODO: Sustituir BrowserRouter por Root cuando esté listo redux

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

render();
