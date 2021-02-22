import client from './client';

const usersBaseUrl = '/apiv1';

export const resetPasswd = (passwd, hash) => {
  const url = `${usersBaseUrl}/users/forgotPass/confirmation`;
  console.log(hash);
  console.log(passwd);
  const params = JSON.stringify({
    passwd,
    hash,
  });
  return client.post(url, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const forgotPasswd = email => {
  const url = `${usersBaseUrl}/users/forgotPass`;
  const params = JSON.stringify({
    email,
  });
  return client.put(url, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const signup = async data => {
  const url = `${usersBaseUrl}/users`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  const response = await client.post(url, data, headers);
  console.log(response);
  return response;
};

export const signupConfirm = async data => {
  const url = `${usersBaseUrl}/users/confirm/${data}`;
  const response = await client.get(url);
  console.log(response);
  return response;
};
