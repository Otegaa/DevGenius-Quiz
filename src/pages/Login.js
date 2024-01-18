import { useAuth } from 'contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/languages');
    } catch (error) {
      console.error('Login error:', error.message);
      setErrMsg('Invalid email or password. Please try again.');
    }
  };

  // for setting error messages to false when we start adjusting one input
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        <button type="submit">Login</button>
        <p>
          Not registered yet? <button onClick={goToRegister}>Register</button>
        </p>
      </form>
    </div>
  );
};
export default Login;
