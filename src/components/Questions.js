import Question from './Question';
import Header from './Header';
import Footer from './Footer';
import Progress from './Progress';
import ToggleSound from './ToggleSound';

const Questions = () => {
  return (
    <div>
      <ToggleSound />
      <Header />
      <Progress />
      <Question />
      <Footer />
    </div>
  );
};

export default Questions;
