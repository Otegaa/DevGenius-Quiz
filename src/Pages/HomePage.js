import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="intro-page">
      <h1 className="text-center text-xl text-yellow-500">
        Welcome to the DevGenius Quiz!😇
      </h1>
      <p>
        Do you want to test your coding knowledge with fun and challenging
        quizzes?
      </p>
      <h3>You're in the right place!</h3>
      <NavLink to="/login">Let's start!</NavLink>
    </div>
  );
};
export default HomePage;
