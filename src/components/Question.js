import { useQuiz } from 'contexts/QuizContext';
import Options from './Options';
import useLanguageParam from '../hooks/useLanguageParams';

const Question = () => {
  const language = useLanguageParam();
  const { questions, index } = useQuiz();

  const questionsObj = questions[language];
  const question = questionsObj[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
};

export default Question;
