import { useAuth } from 'contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';

import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [email, setIsEmail] = useState('');
  const [password, setIsPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [emailFocus, SetEmailFocus] = useState(false);
  const [passwordFocus, SetPasswordFocus] = useState(false);

  const [successfulReg, setSuccessfulReg] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();

  const userRef = useRef();

  const navigate = useNavigate();

  // for setting focus onComponentMount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for validation
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PWD_REGEX.test(password));
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      setSuccessfulReg(true);
      setIsEmail('');
      setIsPassword('');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((s) => !s);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <section>
      {successfulReg && (
        <div>
          <p>Registration successful! You can now log in.</p>
          <button onClick={goToLogin}>Go to Login</button>
        </div>
      )}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          ref={userRef}
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
        <button type="submit" disabled={!validEmail || !validPassword}>
          Register
        </button>
      </form>
    </section>
  );
};
export default Register;
