import { useEffect, useRef, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState('');
  const [passwordResetError, setPasswordResetError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { checkUserExists, resetPassword } = useAuth();

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for setting error messages to false when we start adjusting one input
  useEffect(() => {
    setPasswordResetError('');
    setPasswordResetSuccess('');
  }, [email]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userExists = await checkUserExists(email);
      console.log(userExists);

      if (!userExists) {
        setPasswordResetError(
          'No user found with this email address. Please check and try again.'
        );
        return;
      }

      await resetPassword(email);
      setPasswordResetSuccess(
        'Password reset email sent. Please check your inbox.'
      );
      setEmail('');
    } catch (error) {
      setPasswordResetError(
        'Error sending password reset email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Forgot Your Password?</h2>
      <p>Enter your email and we will send you a link to reset your password</p>
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
          onChange={(e) => setEmail(e.target.value)}
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
