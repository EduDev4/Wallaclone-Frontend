import * as types from '../constants/action-types';

export const initialState = {
  auth: {
    isLogged: false,
    currentUsername: '',
    currentEmail: '',
  },
  adverts: null,
  ui: {
    loading: false,
    error: null,
  },
};

// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_USER) {
//     return {
//       user: state.user.concat(action.payload),
//     };
//   }
//   return state;
// }

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return action.payload;
    case types.AUTH_LOGOUT_SUCCESS:
      return initialState.auth;
    case types.USERS_SIGNUP_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => state;

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }

  if (/REQUEST/.test(action.type)) {
    return { ...state, loading: true };
  }

  if (/SUCCESS/.test(action.type)) {
    return { ...state, error: null, loading: false };
  }
  return state;
};

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.AUTH_LOGIN:
//       return { ...state, auth: action.payload };
//     case types.AUTH_LOGOUT:
//       return { ...state, auth: null };
//     default:
//       return state;
//   }
// };

// export default reducer;

// export default rootReducer;
