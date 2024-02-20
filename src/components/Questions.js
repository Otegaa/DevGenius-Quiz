import Question from "./Question";
import Header from "./Header";
import Footer from "./Footer";
import Progress from "./Progress";
import ToggleSound from "./ToggleSound";
import HighScore from "./HighScore";

const Questions = () => {
  return (
    <div className="flex flex-col gap-2 px-8 py-6">
      <Header />
      <ToggleSound />
      <Progress />
      <Question />
      <Footer />
    </div>
  );
};

export default Questions;
