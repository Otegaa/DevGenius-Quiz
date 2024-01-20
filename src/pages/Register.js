import { useAuth } from 'contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';

import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setIsEmail] = useState('');
  const [password, setIsPassword] = useState('');

  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [userFocus, SetUserFocus] = useState(false);
  const [emailFocus, SetEmailFocus] = useState(false);
  const [passwordFocus, SetPasswordFocus] = useState(false);

  const [successfulReg, setSuccessfulReg] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errMsgReg, setErrMsgReg] = useState('');

  const { register, sendVerificationEmail, showPassword, handleShowPassword } =
    useAuth();

  const userRef = useRef();

  const navigate = useNavigate();

  // for setting focus onComponentMount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for validation
  useEffect(() => {
    setValidUserName(USER_REGEX.test(username));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PWD_REGEX.test(password));
  }, [username, email, password]);

  useEffect(() => {
    setErrMsgReg('');
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validUserName || !validEmail || !validPassword) {
      setErrMsgReg('Please fill in all required fields correctly.');
      return;
    }

    setLoading(true);
    try {
      const response = await register(email, password, username);

      if (response && response.user) {
        await sendVerificationEmail(response.user);
        setSuccessfulReg(true);
        setUsername('');
        setIsEmail('');
        setIsPassword('');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrMsgReg(
          'Email address is already in use. Please use a different email.'
        );
      } else {
        setErrMsgReg('Registration error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <section>
      {errMsgReg && <div style={{ color: 'red' }}>{errMsgReg}</div>}
      {successfulReg && (
        <div style={{ color: 'green' }}>
          <p>
            Registration successful! Please check your email inbox for a
            verification link
          </p>
        </div>
      )}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => SetUserFocus(true)}
          onBlur={() => SetUserFocus(false)}
        />
        <p className={username && userFocus && !validUserName ? 'red' : 'hide'}>
          <FaInfoCircle />
          4 to 24 characters allowed <br />
          Must begin with a letter <br />
          Letters, numbers, hyphens, underscores allowed
        </p>

        <label htmlFor="email">
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
        </p>
        <button
          type="submit"
          disabled={!validUserName || !validEmail || !validPassword || loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already registered? <button onClick={goToLogin}>Back to Login</button>
        </p>
      </form>
    </section>
  );
};
export default Register;
