import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { getTweet } from './service';

const TweetPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    getTweet(params.tweetId)
      .then(tweet => setTweet(tweet))
      .catch(error => {
        if (error.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  }, [params.tweetId, navigate]);

  // if (error?.status === 404) {
  //   return <Navigate to="/404" />;
  // }

  return (
    <Layout title="Tweet detail">{tweet && <div>{tweet.content}</div>}</Layout>
  );
};

export default TweetPage;
