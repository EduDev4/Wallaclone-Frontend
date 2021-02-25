// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import {
  ADD_USER,
  AUTH_LOGOUT,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
} from '../constants/action-types';

// import * as auth from '../../api/auth';

/** UI ACTIONS */
// TODO: crear acciones relacionadas con la interfaz de usuario

/** USER ACTIONS */
// TODO: crear acciones de usuario
export const addUser = payload => ({
  type: ADD_USER,
  payload,
});

/** EDIT USER */

// export const userEditRequest = () =>({
//   type: USER_EDIT_REQUEST
// })
//
// export const userEditFailire = error => ({
//   type: USER_EDIT_FAILURE,
//   error: true,
//   payload: error,
// })
//
// export const userEditSuccess = (dataForUpdate) => ({
//   type: USER_EDIT_SUCCESS,
//   payload: {
//
//   }
// })
// export const editUser = dataForUpdate => async function (dispatch, getstate, { history, api }){
//   dispatch(userEditRequest());
//   try {
//     const userUpdate = await api.user.
//   } catch (error) {
//     dispatch(authLoginFailure(error));
//
//   }
// }

/** AUTH LOGIN ACTIONS */
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
      const authData = await api.auth.login(credentials);
      const { tokenJWT, username, userEmail } = authData;
      dispatch(authLoginSuccess(!!tokenJWT, username, userEmail));
      history.push('/adverts');
    } catch (error) {
      // console.log(error.message);
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
export default addUser;
