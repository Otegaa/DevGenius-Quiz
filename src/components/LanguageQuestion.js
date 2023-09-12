const LanguageQuestions = ({ language, questions }) => {
  return (
    <div>
      <h2>{language} Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageQuestions;
