import { useQuiz } from 'contexts/QuizContext';
import useLanguageParam from '../hooks/useLanguageParams';

const Progress = () => {
  const { index, points, questions, answer } = useQuiz();
  const language = useLanguageParam();

  const questionsOfLanguage = questions[language];

  const numOfQuestions = questionsOfLanguage.length;

  const maxPoints = questionsOfLanguage.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
};
export default Progress;
