import { useQuiz } from 'contexts/QuizContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLanguageParam from '../hooks/useLanguageParams';

const Timer = () => {
  const { dispatch, secsRemaining } = useQuiz();
  const navigate = useNavigate();
  const language = useLanguageParam();
  const mins = Math.floor(secsRemaining / 60);
  const secs = secsRemaining % 60;

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch({ type: 'timer' });
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [dispatch]);

  useEffect(() => {
    if (secsRemaining === 0) {
      navigate(`/score/${language}`);
      dispatch({ type: 'finish' });
    }
  }, [language, navigate, secsRemaining, dispatch]);

  return (
    <div className={`timer ${secsRemaining < 31 ? 'pulsate' : ''}`}>
      {mins < 10 && '0'}
      {mins}:{secs < 10 && '0'}
      {secs}
    </div>
  );
};
export default Timer;
