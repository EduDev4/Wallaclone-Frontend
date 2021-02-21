import client, {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from './client';
import storage from '../utils/storage';

const login = credentials =>
  client.post('/apiv1/users/auth', credentials).then(auth => {
    const { remember } = credentials;
    if (remember) {
      storage.set('auth', auth.data);
    }
    const { tokenJWT } = auth.data;
    setAuthorizationHeader(tokenJWT);
    return auth;
  });

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove('auth');
};

export default login;
