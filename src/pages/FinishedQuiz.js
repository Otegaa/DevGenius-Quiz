import { useQuiz } from 'context/QuizContext';
import useLanguageParam from '../components/useLanguageParams';

const FinishedQuiz = () => {
  const { points, questions } = useQuiz();
  const language = useLanguageParam();

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
    <p className="result">
      <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
      {maxPoints} ({Math.round(percentage)}%)
    </p>
  );
};
export default FinishedQuiz;
