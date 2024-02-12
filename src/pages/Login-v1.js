import { useAuth } from 'contexts/AuthContext-v1';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setIsUsername] = useState('');
  const [email, setIsEmail] = useState('');
  const [password, setIsPassword] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((username, email, password)) login(username, email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/languages', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Please login to continue</h3>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="username"
        id="username"
        value={username}
        onChange={(e) => setIsUsername(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email"
        id="email"
        value={email}
        onChange={(e) => setIsEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        id="password"
        value={password}
        onChange={(e) => setIsPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};
export default Login;
