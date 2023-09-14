import { useQuiz } from 'context/QuizContext';
import Modal from './Modal';

const Quit = () => {
  const { handleQuitClick } = useQuiz();

  return (
    <>
      <button className="btn" onClick={handleQuitClick}>
        Quit
      </button>
      <Modal />
    </>
  );
};
export default Quit;
