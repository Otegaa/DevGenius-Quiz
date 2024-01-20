import { useEffect, useRef, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState('');
  const [passwordResetError, setPasswordResetError] = useState('');

  const navigate = useNavigate();
  const { checkUserExists, resetPassword } = useAuth();

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userExists = await checkUserExists(email);

      if (!userExists) {
        setPasswordResetError(
          'No user found with this email address. Please check and try again.'
        );
        setPasswordResetSuccess('');
        return;
      }

      await resetPassword(email);
      setPasswordResetSuccess(
        'Password reset email sent. Please check your inbox.'
      );
      setPasswordResetError('');
      setEmail('');
    } catch (error) {
      console.error('Authentication error:', error);

      if (error.code === 'auth/too-many-requests') {
        setPasswordResetError(
          'Too many unsuccessful sign-in attempts. Please try again later.'
        );
      } else {
        setPasswordResetError('Error signing in. Please try again.');
      }
      setPasswordResetSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = () => {
    setPasswordResetSuccess('');
    setPasswordResetError('');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Forgot Your Password?</h2>
      <p>
        Enter your email, and we will send you a link to reset your password
      </p>
      {passwordResetSuccess && (
        <div style={{ color: 'green' }}>{passwordResetSuccess}</div>
      )}
      {passwordResetError && (
        <div style={{ color: 'red' }}>{passwordResetError}</div>
      )}
      <form onSubmit={handleResetPassword}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          ref={userRef}
          onChange={(e) => {
            setEmail(e.target.value);
            handleEmailChange();
          }}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Reset'}
        </button>
      </form>
      <button onClick={goToLogin}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
