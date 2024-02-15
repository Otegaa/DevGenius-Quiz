import { useAuth } from 'contexts/AuthContext';
import { useQuiz } from 'contexts/QuizContext';

const HighScore = () => {
  const { highscore } = useQuiz();

  return <div>Your score: {highscore}</div>;
};
export default HighScore;
