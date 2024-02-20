import { useAuth } from "contexts/AuthContext";
import IntroPictures from "../components/IntroPictures";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const QuestionsHomePage = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-2xl">
        Welcome <span className="font-bold">{username}!...</span>
      </h2>
      <p className="text-sm italic">Pick a subject to continue</p>
      <button onClick={handleClick}>Logout</button>
      <IntroPictures />
    </div>
  );
};
export default QuestionsHomePage;
