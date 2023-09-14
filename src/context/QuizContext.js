import { createContext, useContext, useReducer, useState } from 'react';
import { languagesQuestions } from 'data/questions';
import correctAnswerSound from 'assets/Audio/correct-answer.mp3';
import wrongAnswerSound from 'assets/Audio/Wrong-answer.mp3';

const QuizContext = createContext();

const playCorrectSound = new Audio(correctAnswerSound);
const playWrongSound = new Audio(wrongAnswerSound);

const initialState = {
  questions: languagesQuestions,
  index: 0,
  answer: null,
  points: 0,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'newAnswer':
      const { language, index, answer } = payload;
      const currentQuestions = state.questions[language];
      const question = currentQuestions[index];
      const isCorrect = answer === question.correctOption;
      if (isCorrect) playCorrectSound.play();
      if (!isCorrect) playWrongSound.play();

      const updatedPoints = isCorrect
        ? state.points + question.points
        : state.points;

      return {
        ...state,
        answer,
        points: updatedPoints,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'resetState':
      return {
        ...initialState,
        questions: state.questions,
      };

    default:
      throw new Error('Action unknown');
  }
};

const QuizProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ index, questions, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleQuitClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <QuizContext.Provider
      value={{
        index,
        questions,
        dispatch,
        answer,
        handleQuitClick,
        handleCancel,
        handleConfirm,
        isModalOpen,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider');
  return context;
};
export { QuizProvider, useQuiz };
