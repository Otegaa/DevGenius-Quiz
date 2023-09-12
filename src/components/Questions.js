import { useParams, useNavigate } from 'react-router-dom';
import { languagesQuestions } from 'data/questions';
import LanguageQuestions from './LanguageQuestion';
import Header from './Header';

const Questions = () => {
  const { questionsName } = useParams();
  const questions = languagesQuestions[questionsName];
  console.log(questionsName);

  if (!questions) {
    return <div>Language not found</div>;
  }

  return (
    <div>
      <Header />
      <LanguageQuestions language={questionsName} questions={questions} />
    </div>
  );
};

export default Questions;
