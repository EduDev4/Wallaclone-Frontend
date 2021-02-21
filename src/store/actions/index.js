// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import {
  ADD_USER,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from '../constants/action-types';

import * as auth from '../../api/auth';

/** UI ACTIONS */
// TODO: crear acciones relacionadas con la interfaz de usuario

/** USER ACTIONS */
// TODO: crear acciones de usuario
export const addUser = payload => ({
  type: ADD_USER,
  payload,
});

/** AUTH LOGIN ACTIONS */
// TODO: crear acciones de login y logout
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = (isLogged, currentUsername, currentEmail) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: {
    isLogged,
    currentUsername,
    currentEmail,
  },
});

export const login = (credentials, history) =>
  async function (dispatch) {
    dispatch(authLoginRequest());
    try {
      const authD = await auth.login(credentials);
      const { tokenJWT, username, userEmail } = authD.data;
      dispatch(authLoginSuccess(!!tokenJWT, username, userEmail));
      history.push('/adverts');
    } catch (error) {
      console.log(error.message);
      dispatch(authLoginFailure(error));
    }
  };

/** AUTH LOGOUT ACTIONS */
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

/** ADVERT ACTIONS */
// TODO: crear acciones de anuncios
export default addUser;
