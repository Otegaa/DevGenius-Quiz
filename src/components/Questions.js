import Question from './Question';
import Header from './Header';
import Footer from './Footer';
import Progress from './Progress';
import MuteSound from './MuteSound';

const Questions = () => {
  return (
    <div>
      <MuteSound />
      <Header />
      <Progress />
      <Question />
      <Footer />
    </div>
  );
};

export default Questions;
