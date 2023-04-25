import { useState } from 'react';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { login } from './service';

import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context';

function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [rememberPassword, setRememberPassword] = useState(true);

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    resetError();
    setIsLoading(true);

    try {
      await login(credentials,rememberPassword);
      setIsLoading(false);
      // Logged in
      onLogin();
      // Redirect to pathname
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = event => {
    setRememberPassword(event.target.value);
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Adverts</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="eMail"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.email}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <label>
        <input
          type="checkbox"
          name="rememberPassword"
          value= {rememberPassword}
          checked={rememberPassword === "true"}
          onChange={handleCheckboxChange}
          />
          Remember password
        </label>
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
