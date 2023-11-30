import { useQuiz } from 'contexts/QuizContext';
import useLanguageParam from '../hooks/useLanguageParams';
import { useNavigate } from 'react-router-dom';

const FinishedQuiz = () => {
  const { points, questions, highscore, dispatch } = useQuiz();
  const language = useLanguageParam();
  const navigate = useNavigate();

  const questionsOfLanguage = questions[language];

  const maxPoints = questionsOfLanguage.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🥳';
  if (percentage >= 50 && percentage < 80) emoji = '😌';
  if (percentage > 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '😰';
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({Math.round(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: 'resetState' });
          navigate('/languages');
        }}
      >
        Try again
      </button>
    </>
  );
};
export default FinishedQuiz;
