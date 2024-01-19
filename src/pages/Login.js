import { useAuth } from 'contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { showPassword, handleShowPassword, login } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for setting error messages to false when we start adjusting one input
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/languages');
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/invalid-credential') {
        setErrMsg('Invalid email or password. Please try again.');
      } else if (error.message.includes('Email not verified')) {
        setErrMsg(
          'Email not verified. Please verify your email before logging in.'
        );
      } else {
        setErrMsg('Login failed. Please try again.');
      }
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToResetPassword = () => {
    navigate('/reset');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="email"
          required
          id="email"
          ref={userRef}
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type={!showPassword ? 'password' : 'text'}
          placeholder="password"
          id="password"
          required
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div onClick={handleShowPassword}>
          {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
        </div>
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        <button type="submit">Login</button>
        <p>
          Not registered yet? <button onClick={goToRegister}>Register</button>
        </p>
        <button onClick={goToResetPassword}>Forgot password?</button>
      </form>
    </div>
  );
};
export default Login;
