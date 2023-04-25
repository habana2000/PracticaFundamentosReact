import client from '../../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestTweets = () => {
  const url = `${advertsUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  return client.get(url);
};

export const getTweet = tweetId => {
  // const url = tweetsUrl + '/' + tweetId
  const url = `${advertsUrl}/${tweetId}`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = advertsUrl;
  console.log(advert);
  return client.post(url, advert, {});
};
