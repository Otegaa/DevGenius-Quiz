import { useAuth } from 'contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const [username, setIsUsername] = useState('');
  const [email, setIsEmail] = useState('');
  const [password, setIsPassword] = useState('');

  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [userFocus, SetUserFocus] = useState(false);
  const [emailFocus, SetEmailFocus] = useState(false);
  const [passwordFocus, SetPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  // for setting focus onComponentMount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for validation
  useEffect(() => {
    setValidUserName(USER_REGEX.test(username));
    // setValidEmail(EMAIL_REGEX.test(email));
    // setValidPassword(PWD_REGEX.test(password));
  }, [username, email, password]);

  // for setting error messages to false when we start adjusting one input
  useEffect(() => {
    setErrMsg('');
  }, [username, email, password]);

  // for navigation programmatically if validation is true
  useEffect(() => {
    if (isAuthenticated) navigate('/languages', { replace: true });
  }, [isAuthenticated, navigate]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if ((username, email, password)) login(username, email, password);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) login(username);
  };

  const handleShowPassword = () => {
    setShowPassword((s) => !s);
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? 'errRed' : 'hide'}>
        {errMsg}
      </p>
      <h1>Please login to continue</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <span className={validUserName ? 'success' : 'hide'}>
            <FaCheck />
          </span>
          <span className={validUserName || !username ? 'hide' : 'errRed'}>
            <FaTimes />
          </span>
        </label>
        <input
          type="text"
          placeholder="username"
          ref={userRef}
          required
          id="username"
          value={username}
          autoComplete="off"
          onChange={(e) => setIsUsername(e.target.value)}
          onFocus={() => SetUserFocus(true)}
          onBlur={() => SetUserFocus(false)}
        />
        <p className={username && userFocus && !validUserName ? 'red' : 'hide'}>
          <FaInfoCircle />
          4 to 24 characters allowed <br />
          Must begin with a letter <br />
          Letters, numbers, hyphens, underscores allowed
        </p>

        {/* <label htmlFor="email">
          Email
          <span className={validEmail ? 'success' : 'hide'}>
            <FaCheck />
          </span>
          <span className={validEmail || !email ? 'hide' : 'errRed'}>
            <FaTimes />
          </span>
        </label>
        <input
          type="email"
          placeholder="email"
          required
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setIsEmail(e.target.value)}
          onFocus={() => SetEmailFocus(true)}
          onBlur={() => SetEmailFocus(false)}
        />
        <p className={emailFocus && !validEmail ? 'red' : 'hide'}>
          <FaInfoCircle />
          Enter a valid email address
        </p>

        <label htmlFor="password">
          Password
          <span className={validPassword ? 'success' : 'hide'}>
            <FaCheck />
          </span>
          <span className={validPassword || !password ? 'hide' : 'errRed'}>
            <FaTimes />
          </span>
        </label>
        <input
          type={!showPassword ? 'password' : 'text'}
          placeholder="password"
          id="password"
          required
          value={password}
          autoComplete="off"
          onChange={(e) => setIsPassword(e.target.value)}
          onFocus={() => SetPasswordFocus(true)}
          onBlur={() => SetPasswordFocus(false)}
        />
        <div onClick={handleShowPassword}>
          {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
        </div>
        <p className={passwordFocus && !validPassword ? 'red' : 'hide'}>
          <FaInfoCircle />
          Must be 8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Special characters allowed: <span>!</span> <span>@</span>{' '}
          <span>#</span> <span>$</span> <span>%</span>
        </p> */}
        {/* <button type="submit" disabled={!validEmail || !validUserName || !validPassword}>
          Login
        </button> */}
        <button>Login</button>
      </form>
    </section>
  );
};
export default Login;
