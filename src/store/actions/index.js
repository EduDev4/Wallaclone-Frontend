// TODO: Creado un action como modelo, reemplazar por los nuevos actions

import { ADD_USER } from '../constants/action-types';

/** UI ACTIONS */
// TODO: crear acciones relacionadas con la interfaz de usuario

/** USER ACTIONS */
// TODO: crear acciones de usuario
export const addUser = payload => ({
  type: ADD_USER,
  payload,
});

/** AUTH ACTIONS */
// TODO: crear acciones de login y logout

/** ADVERT ACTIONS */
// TODO: crear acciones de anuncios
export default addUser;
