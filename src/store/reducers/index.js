import { ADD_USER } from '../constants/action-types';

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

export default rootReducer;
