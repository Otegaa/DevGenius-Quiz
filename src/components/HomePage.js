import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="intro-page">
      <h1>Welcome to the DevGenius Quiz!😇</h1>
      <p>
        Do you want to test your coding knowledge with fun and challenging
        quizzes?
      </p>
      <h3>You're in the right place!</h3>
      <NavLink to="/questions">Go to questions</NavLink>
    </div>
  );
};
export default HomePage;
