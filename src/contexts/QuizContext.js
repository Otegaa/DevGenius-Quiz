import { createContext, useContext, useReducer, useState } from 'react';
import { languagesQuestions } from 'data/questions';
import correctAnswerSound from 'assets/Audio/correct-answer.mp3';
import wrongAnswerSound from 'assets/Audio/Wrong-answer.mp3';
import warningSound from 'assets/Audio/warning-sound.wav';

const QuizContext = createContext();

const playCorrectSound = new Audio(correctAnswerSound);
const playWrongSound = new Audio(wrongAnswerSound);
const warningTimeSound = new Audio(warningSound);

const initialState = {
  questions: languagesQuestions,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secsRemaining: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'start':
      const selectedLanguage = payload;
      const secsRemaining = state.questions[selectedLanguage].length * 30;

      return {
        ...state,
        secsRemaining: secsRemaining,
      };

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

    case 'finish':
      return {
        ...state,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'timer':
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
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

  const [
    { index, questions, answer, points, highscore, secsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleQuitClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    dispatch({ type: 'resetState' });
  };

  return (
    <QuizContext.Provider
      value={{
        index,
        questions,
        dispatch,
        answer,
        points,
        highscore,
        secsRemaining,
        handleQuitClick,
        handleCancel,
        handleConfirm,
        isModalOpen,
        warningTimeSound,
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
