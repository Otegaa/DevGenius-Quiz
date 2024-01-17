import { useQuiz } from 'contexts/QuizContext';

const ToggleSound = () => {
  const { isSoundEnabled, dispatch } = useQuiz();

  const handleToggle = () => {
    dispatch({ type: 'toggleSound' });
  };

  return <button onClick={handleToggle}>{isSoundEnabled ? '🔈' : '🔇'}</button>;
};
export default ToggleSound;
