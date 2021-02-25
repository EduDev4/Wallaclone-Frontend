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

export const updateUser = (currentUsername, updateData) => {
  console.log('updateData:', updateData);
  client
    .patch(`/apiv1/users/editUser/${currentUsername}`, updateData)
    .then(user => {
      const { username, userEmail } = user;

      return { username, userEmail };
    });
};
