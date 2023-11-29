import { useQuiz } from 'context/QuizContext';
import useLanguageParam from '../hooks/useLanguageParams';
import { useNavigate } from 'react-router-dom';

const NextButton = () => {
  const { dispatch, answer, index, questions } = useQuiz();
  const language = useLanguageParam();
  const navigate = useNavigate();

  const questionsOfLanguage = questions[language];

  const numOfQuestions = questionsOfLanguage.length;

  if (answer === null) return null;
  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (index === numOfQuestions - 1)
    return (
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: 'finish' });
          navigate(`/score/${language}`);
        }}
      >
        Finish
      </button>
    );
};
export default NextButton;
