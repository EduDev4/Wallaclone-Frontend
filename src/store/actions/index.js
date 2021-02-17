// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import { ADD_USER } from '../constants/action-types';

export const addUser = payload => ({
  type: ADD_USER,
  payload,
});

export default addUser;
