import client from '../../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  // const url = `${advertsUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  const url = `${advertsUrl}`;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};


export const createAdvert = advert => {
  console.log('createAdvert: ', advert)
  const url = advertsUrl;
  return client.post(url, advert, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


