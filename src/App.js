import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import TweetsPage from './components/tweets/TweetsPage';
import NewTweetPage from './components/tweets/NewTweetPage';
import TweetPage from './components/tweets/TweetPage';
import RequireAuth from './components/auth/RequireAuth';

import './App.css';

const LoginPage = lazy(() => import('./components/auth/LoginPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tweets" element={<TweetsPage />} />
          <Route path="/tweets/:tweetId" element={<TweetPage />} />
          <Route
            path="/tweets/new"
            element={
              <RequireAuth>
                <NewTweetPage />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/tweets" />} />
          <Route path="/404" element={<div>404 | Not found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
