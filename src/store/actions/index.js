// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_LOGOUT,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from '../constants/action-types';

/** UI ACTIONS */
// TODO: crear acciones relacionadas con la interfaz de usuario

/** USER ACTIONS */

/** SIGNUP ACTIONS */
// TODO: crear acciones de usuario
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  error: true,
  payload: error,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signup = data =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(signupRequest());
    try {
      const response = await api.users.signup(data);
      const { success, user } = response;
      dispatch(authLoginSuccess(!!success, user));
      //TODO generar página estática solicitando que revise correo para verificar email
      history.push('/confirm-email');
    } catch (error) {
      console.log(error.message);
      dispatch(signupFailure(error));
    }
  };

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

export const login = credentials =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const authD = await api.auth.login(credentials);
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

export const authLogoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const authLogoutFailure = error => ({
  type: AUTH_LOGOUT_FAILURE,
  error: true,
  payload: error,
});

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
  payload: {
    isLogged: false,
    currentUsername: null,
    currentEmail: null,
  },
});

export const logout = () =>
  function (dispatch, getState, { history, api }) {
    dispatch(authLogoutRequest());
    api.auth
      .logout()
      .then(() => {
        dispatch(authLogoutSuccess());
        history.push('/');
      })
      .catch(error => dispatch(authLogoutFailure(error)));
  };

/** ADVERT ACTIONS */
// TODO: crear acciones de anuncios
