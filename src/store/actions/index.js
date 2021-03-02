// COMPLETE: Creado un action como modelo, reemplazar por los nuevos actions

import {
  USERS_SIGNUP_REQUEST,
  USERS_SIGNUP_SUCCESS,
  USERS_SIGNUP_FAILURE,
  USERS_SIGNUP_CONFIRM_REQUEST,
  USERS_SIGNUP_CONFIRM_SUCCESS,
  USERS_SIGNUP_CONFIRM_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  ADVERTS_LOAD_REQUEST,
  ADVERTS_LOAD_SUCCESS,
  ADVERTS_LOAD_FAILURE,
  ADVERTS_CREATE_REQUEST,
  ADVERTS_CREATE_SUCCESS,
  ADVERTS_CREATE_FAILURE,
  ADVERTS_UPDATE_REQUEST,
  ADVERTS_UPDATE_SUCCESS,
  ADVERTS_UPDATE_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
} from '../constants/action-types';

import { getIsLoggedUser } from '../selectors';

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
  // eslint-disable-next-line func-names
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
/** EDIT USER */

export const userEditRequest = () => ({
  type: USER_EDIT_REQUEST,
});
export const userEditFailure = error => ({
  type: USER_EDIT_FAILURE,
  error: true,
  payload: error,
});
export const userEditSuccess = (isLogged, currentUsername, currentEmail) => ({
  type: USER_EDIT_SUCCESS,
  payload: {
    isLogged,
    currentUsername,
    currentEmail,
  },
});

export const editUser = (currentUsername, dataForUpdate) =>
  async function (dispatch, getstate, { history, api }) {
    const state = getstate();
    const isLogged = getIsLoggedUser(state);
    dispatch(userEditRequest());
    try {
      const { username, userEmail } = await api.users.updateUser(
        currentUsername,
        dataForUpdate,
      );
      dispatch(userEditSuccess(isLogged, username, userEmail));

      history.push(`/user/${username}`);
    } catch (error) {
      dispatch(userEditFailure(error));
    }
  };

/** AUTH LOGIN ACTIONS */
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = (
  isLogged,
  currentUsername,
  currentEmail,
  currentUserId,
) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: {
    isLogged,
    currentUsername,
    currentEmail,
    currentUserId,
  },
});

export const login = credentials =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const authData = await api.auth.login(credentials);
      const { tokenJWT, username, userEmail, _id } = authData;
      dispatch(authLoginSuccess(!!tokenJWT, username, userEmail, _id));
      history.push('/adverts');
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
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
export const advertsLoadRequest = () => ({
  type: ADVERTS_LOAD_REQUEST,
});
export const advertsCreateRequest = () => ({
  type: ADVERTS_CREATE_REQUEST,
});
export const advertsUpdateRequest = () => ({
  type: ADVERTS_UPDATE_REQUEST,
});

export const advertsLoadFailure = error => ({
  type: ADVERTS_LOAD_FAILURE,
  error: true,
  payload: error,
});
export const advertsCreateFailure = error => ({
  type: ADVERTS_CREATE_FAILURE,
  error: true,
  payload: error,
});
export const advertsUpdateFailure = error => ({
  type: ADVERTS_UPDATE_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoadSuccess = ads => ({
  type: ADVERTS_LOAD_SUCCESS,
  payload: ads,
});
export const advertsCreateSuccess = ad => ({
  type: ADVERTS_CREATE_SUCCESS,
  payload: ad,
});
export const advertsUpdateSuccess = ad => ({
  type: ADVERTS_UPDATE_SUCCESS,
  payload: ad,
});

export const loadAdverts = formFilter =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    dispatch(advertsLoadRequest());
    try {
      const { adverts } = await api.adverts.getAdverts(formFilter);
      dispatch(advertsLoadSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadFailure(error));
    }
  };

export const createAdvert = advertData =>
  async function (dispatch, getState, { history, api }) {
    dispatch(advertsCreateRequest());
    try {
      const { advert } = await api.adverts.createAdvert(advertData);
      await dispatch(advertsCreateSuccess(advert));
      // TODO: Redirigir a detalle
      // history.push(`/advert/${advert._id}`);
    } catch (error) {
      await dispatch(advertsCreateFailure(error));
    }
  };

export const updateAdvert = (adId, advertData) =>
  async function (dispatch, getState, { history, api }) {
    dispatch(advertsUpdateRequest());
    try {
      const { advert } = await api.adverts.updateAdvert(adId, advertData);
      await dispatch(advertsUpdateSuccess(advert));
      // TODO: Redirigir a detalle
      // history.push(`/advert/${advert._id}`);
    } catch (error) {
      console.log(error);
      await dispatch(advertsUpdateFailure(error));
    }
  };
