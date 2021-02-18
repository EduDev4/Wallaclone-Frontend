import { ADD_USER } from '../constants/action-types';
import * as types from '../constants/action-types';

const initialState = {
  auth: {
    isLogged: false,
    currentUsername: '',
    currentEmail: '',
  },
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_USER) {
    return {
      user: state.user.concat(action.payload),
    };
  }
  return state;
}


export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return action.payload;
    case types.AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
};

export default rootReducer;
