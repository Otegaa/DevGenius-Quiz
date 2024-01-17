import { useAuth } from 'contexts/AuthContext';
import IntroPictures from '../components/IntroPictures';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const QuestionsHomePage = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="languages-box">
      <h2>
        Welcome {username}!... There are 10 questions for each
        language/framework
      </h2>
      <h4>Please select your favorite!</h4>
      <button onClick={handleClick}>Logout</button>
      <IntroPictures />
    </div>
  );
};
export default QuestionsHomePage;
