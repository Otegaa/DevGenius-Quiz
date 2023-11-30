import { Link } from 'react-router-dom';
import { data } from 'data/data';
import { useQuiz } from 'contexts/QuizContext';

const IntroPictures = () => {
  const { dispatch, handleCancel } = useQuiz();

  return (
    <div className="container">
      <div className="intropic-container">
        {data.map((lang) => {
          const { img, name } = lang;
          return (
            <Link
              to={`/questions/${name}`}
              key={name}
              onClick={() => {
                handleCancel();
                dispatch({ type: 'start', payload: name });
              }}
            >
              <div className="picture-box">
                <img
                  src={img}
                  alt={name}
                  className="intropage-img"
                  onClick={() => {
                    dispatch({ type: 'resetState' });
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default IntroPictures;
