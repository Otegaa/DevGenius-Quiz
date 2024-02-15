import Question from './Question';
import Header from './Header';
import Footer from './Footer';
import Progress from './Progress';
import ToggleSound from './ToggleSound';
import HighScore from './HighScore';

const Questions = () => {
  return (
    <div>
      <ToggleSound />
      <HighScore />
      <Header />
      <Progress />
      <Question />
      <Footer />
    </div>
  );
};

export default Questions;
