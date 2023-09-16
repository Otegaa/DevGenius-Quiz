import { Link } from 'react-router-dom';
import { data } from 'data/data';
import { useQuiz } from 'context/QuizContext';

const IntroPictures = () => {
  const { dispatch, handleCancel } = useQuiz();

  return (
    <div className="container">
      <div className="intropic-container">
        {data.map((lang) => {
          const { img, name } = lang;

          // Move to frameworks page
          if (name === 'Javascript') {
            return (
              <Link to="/javascript/frameworks" key={name}>
                <div className="picture-box">
                  <img src={img} alt={name} className="intropage-img" />
                </div>
              </Link>
            );
          }

          // category -medium, easy, hard, all
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
