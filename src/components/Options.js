import { useQuiz } from 'context/QuizContext';
import useLanguageParam from '../hooks/useLanguageParams';
import correctAnswerImg from 'assets/images/correct1.svg';
import wrongAnswerImg from 'assets/images/wrong-answer.svg';

const Options = () => {
  const language = useLanguageParam();
  const { questions, index, dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  const questionsObj = questions[language] || [];
  const question = questionsObj[index];

  const handleOptionClick = (optionIndex) => {
    if (hasAnswered) {
      return; // Do nothing if the user has already answered
    }

    const payload = {
      language,
      index,
      answer: optionIndex,
    };

    dispatch({ type: 'newAnswer', payload });
  };

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          onClick={() => handleOptionClick(index)}
          className={`btn btn-option ${index === answer ? 'answer' : ''} 
          }`}
          disabled={hasAnswered}
        >
          <div className="option">
            <span>{option}</span>

            {hasAnswered && index === question.correctOption && (
              <img
                src={correctAnswerImg}
                alt="correctAnswerImage"
                className="option-img"
              />
            )}
            {hasAnswered && index !== question.correctOption && (
              <img
                src={wrongAnswerImg}
                alt="wrongAnswerImage"
                className="option-img"
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
export default Options;
