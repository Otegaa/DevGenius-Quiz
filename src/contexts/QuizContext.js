import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { languagesQuestions } from 'data/questions';
import correctAnswerSound from 'assets/Audio/correct-answer.mp3';
import wrongAnswerSound from 'assets/Audio/Wrong-answer.mp3';

const QuizContext = createContext();

const playCorrectSound = new Audio(correctAnswerSound);
playCorrectSound.volume = 0.1;
const playWrongSound = new Audio(wrongAnswerSound);
playWrongSound.volume = 0.1;

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
    case 'start': {
      const selectedLanguage = payload;
      const secsRemaining = state.questions[selectedLanguage].length * 15;

      return {
        ...state,
        secsRemaining: secsRemaining,
      };
    }

    case 'newAnswer': {
      const { language, index, answer } = payload;
      const currentQuestions = state.questions[language];
      const question = currentQuestions[index];
      const isCorrect = answer === question.correctOption;

      if (isCorrect) {
        playCorrectSound.currentTime = 0;
        playCorrectSound.play();
      }
      if (!isCorrect) {
        playWrongSound.currentTime = 0;
        playWrongSound.play();
      }

      const updatedPoints = isCorrect
        ? state.points + question.points
        : state.points;

      return {
        ...state,
        answer,
        points: updatedPoints,
      };
    }

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

  return useMemo(
    () => (
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
        }}
      >
        {children}
      </QuizContext.Provider>
    ),
    [
      answer,
      children,
      highscore,
      index,
      isModalOpen,
      points,
      questions,
      secsRemaining,
    ]
  );
};
const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider');
  return context;
};
export { QuizProvider, useQuiz };
