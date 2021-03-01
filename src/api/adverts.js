import client from './client';

const adverstUrl = 'apiv1/adverts';

export const createAdvert = data => {
  const url = `${adverstUrl}`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  return client.post(url, data, headers);
};

export const updateAdvert = (advertId, data) => {
  const url = `${adverstUrl}/${advertId}`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  return client.put(url, data, headers);
};

export const deleteAdvert = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.delete(url);
};

export const getAdvertDetail = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.get(url);
};

export const getAdverts = filterObject => {
  if (filterObject) {
    return client.get(`${adverstUrl}?${filterObject}`);
  }
  return client.get(adverstUrl);
};