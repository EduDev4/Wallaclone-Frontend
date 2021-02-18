// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import {
  ADD_USER,
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

export const authLoginSuccess = isLogged => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: isLogged,
  };
};

export const login = (credentials) => {
  return function (dispatch, getState, { api }) {
    dispatch(authLoginRequest());
    api.auth
      .login(credentials)
      .then(() => {
        dispatch(authLoginSuccess(true));
        history.replace(from);
      })
      .catch(error => {
        dispatch(authLoginFailure(error));
      });
  };
};

/** AUTH LOGOUT ACTIONS */
export const authLogoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const authLogoutFailure = error => ({
  type: AUTH_LOGOUT_FAILURE,
  error: true,
  payload: error,
});

export const authLogoutSuccess = () => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload: false,
  };
};

export const logout = () => {
  return function (dispatch, getState, { api }) {
    dispatch(authLogoutRequest());
    api.auth
      .logout()
      .then(() => {
        dispatch(authLogoutSuccess());
      })
      .catch(error => dispatch(authLogoutFailure(error)));
  };
};

/** ADVERT ACTIONS */
// TODO: crear acciones de anuncios
export default addUser;
