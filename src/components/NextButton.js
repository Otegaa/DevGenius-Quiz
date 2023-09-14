import { useQuiz } from 'context/QuizContext';

const NextButton = () => {
  const { dispatch, answer } = useQuiz();
  if (answer === null) return null;
  return (
    <button className="btn" onClick={() => dispatch({ type: 'nextQuestion' })}>
      Next
    </button>
  );
};
export default NextButton;
