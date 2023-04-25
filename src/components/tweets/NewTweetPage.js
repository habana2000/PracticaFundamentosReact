import { memo, useCallback, useMemo, useState } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import Photo from '../shared/Photo';
import Textarea from '../shared/Textarea';

import './NewTweetPage.css';
import { createTweet } from './service';
import { useNavigate } from 'react-router-dom';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

const fib = function (n) {
  if (n <= 1) return n;

  return fib(n - 1) + fib(n - 2);
};

const HeavyComponent = ({ value }) => {
  const result = fib(value);

  return (
    <div>
      Fibonacci({value}) = {result}
    </div>
  );
};

const MemoizedHeavyComponent = memo(HeavyComponent);

const NewTweetPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const tweet = await createTweet({ content });
      setIsLoading(false);
      navigate(`/tweets/${tweet.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = isLoading || content.length < MIN_CHARACTERS;
  const characters = `${content.length} / ${MAX_CHARACTERS} characters`;

  const objProperty = useMemo(() => {
    return { isLoading };
  }, [isLoading]);

  const funcProperty = useCallback(() => {
    console.log('isLoading', isLoading);
  }, [isLoading]);

  return (
    <Layout title="What are you thinking?">
      <div className="newTweetPage bordered">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <Textarea
              name="content"
              className="newTweetPage-textarea"
              placeholder="Hey! What's up!"
              onChange={handleChange}
              value={content}
              maxLength={MAX_CHARACTERS}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                variant="primary"
                disabled={isDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
          <MemoizedHeavyComponent
            value={37}
            objProperty={objProperty}
            funcProperty={funcProperty}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewTweetPage;
