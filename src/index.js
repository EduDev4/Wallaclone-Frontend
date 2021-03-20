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

const PUBLIC_VAPID_KEY =
  'BIXZvADhnUQv4aDfYFTLmuaPjzTuoV5tvS5V-Qe7T3kuyvFXNgRXYdfXemnK8QArgG3N4QGKaVWwD4hd35pzwpA';
// const { PUBLIC_VAPID_KEY } = process.env;
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const subscription = async () => {
  // Service Worker
  console.log('Registering a Service worker');
  const register = await navigator.serviceWorker.register(
    './serviceworker.js',
    {
      scope: '/',
    },
  );
  console.log('New Service Worker');
  console.log(PUBLIC_VAPID_KEY);
  const convertedvapidkey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
  // Listen Push Notifications
  console.log('Listening Push Notifications');
  const subscripcion = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedvapidkey,
  });

  console.log(subscripcion);

  // Send Subscription
  await fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/subscription`, {
    method: 'POST',
    body: JSON.stringify(subscripcion),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Suscrito!');
};

/* UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({ message: message.value }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  form.reset();
}); */

// Service Worker Support
if ('serviceWorker' in navigator) {
  subscription().catch(err => console.log(err));
}

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
  _id: null,
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
    currentUserId: auth._id,
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
