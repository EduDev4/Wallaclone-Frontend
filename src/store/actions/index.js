// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import {
  USERS_SIGNUP_REQUEST,
  USERS_SIGNUP_SUCCESS,
  USERS_SIGNUP_FAILURE,
  USERS_SIGNUP_CONFIRM_REQUEST,
  USERS_SIGNUP_CONFIRM_SUCCESS,
  USERS_SIGNUP_CONFIRM_FAILURE,
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
export const usersSignupRequest = () => ({
  type: USERS_SIGNUP_REQUEST,
});

export const usersSignupFailure = error => ({
  type: USERS_SIGNUP_FAILURE,
  error: true,
  payload: error,
});

export const usersSignupSuccess = (currentUsername, currentEmail) => ({
  type: USERS_SIGNUP_SUCCESS,
  payload: {
    isLogged: false,
    currentUsername,
    currentEmail,
  },
});

export const signup = data =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(usersSignupRequest());
    try {
      const response = await api.users.signup(data);
      console.log(response);
      const { user } = response;
      dispatch(usersSignupSuccess(user.username, user.email));
      // TODO generar página estática solicitando que revise correo para verificar email
      history.push('/signup');
    } catch (error) {
      console.log(error.message);
      dispatch(usersSignupFailure(error));
    }
  };

/** CONFIRM SIGNUP ACTIONS */
export const usersSignupConfirmRequest = () => ({
  type: USERS_SIGNUP_CONFIRM_REQUEST,
});

export const usersSignupConfirmFailure = error => ({
  type: USERS_SIGNUP_CONFIRM_FAILURE,
  error: true,
  payload: error,
});

export const usersSignupConfirmSuccess = () => ({
  type: USERS_SIGNUP_CONFIRM_SUCCESS,
});

export const signupConfirm = data =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(usersSignupConfirmRequest());
    try {
      const response = await api.users.signupConfirm(data);
      console.log(response);
      dispatch(usersSignupConfirmSuccess());
      // TODO decidir a donde enviar tras confirmar
      // history.push('/login');
      // TODO se recarga la aplicación tras esto ?¿?
    } catch (error) {
      console.log(error.message);
      dispatch(usersSignupConfirmFailure(error));
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
      const { tokenJWT, username, userEmail } = authD;
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
